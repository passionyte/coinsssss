// Written by Passionyte

// Elements

const bigbutton = g("bigbutton")
const clicks = g("clicks")
const prod = g("clicksps")
const itemlist = g("items")
const itemdummy = g("itemdummy")
const structb = g("structures")
const upgb = g("upgrades")
const effs = g("effects")
const pmenu = g("choice")

// Variables

let stats = {
    Coins: 0,
    CoinsPs: 0,
    CoinsPc: 1,
    CoinsMPc: 0, // Ps bonus given to Pc from the fractal below
    CoinsPcPs: 0,
    CoinsPsMult: 1,
    TotalCoins: 0,
    Clicks: 0,
    PrestigeCoins: 0,
    PrestigeLevel: 0,
    PrestigeBalance: 0,
    Prestiges: 0,
    NextContinue: 0,
    Continues: 0,
    Purchased: {},
    Structures: {},
    Achievements: {},
    Settings: {}
}
let loaded = false
let savecd = false
let bulkbuy = 1
let menuopen
let shopopen
let menurf
let coinmpos

import { changelog, version } from "./changelog.js"
import { items } from "./items.js"
import { abbrs, fps, debug, settings, blank, fancynames } from "./globals.js"

// Functions

function g(id) {
    return document.getElementById(id)
}

function numacvs(owned) {
    let num = 0

    if (owned) {
        for (const i in stats.Achievements) {
            num++
        }
    }
    else {
        for (const acv of items.achievements) {
            if (!acv.shadow) {
                num++
            }
        }
    }

    return num
}

function bool(a) {
    return ((a) && "ON") || "OFF"
}

function abbreviate(x) {
    if (!stats.Settings["Short numbers"]) {
        return x
    }

    let largest

    for (const i in abbrs) {
        if (x >= i && (!largest || i > largest)) {
            largest = i
        }
    }

    return largest && `${smartround((x / largest))} ${abbrs[largest]}` || x
}

function smartround(x) { // For when you don't want a billion decimals in a number
    let d = stats.Settings.Decimals

    if (d) {
        if (d > 0) {
            d = Number(`1e${d}`)
        }
        else {
            return Math.round(x)
        }
    }
    else {
        d = 100
    }

    return (Math.round(x * d) / d)
}

function randInt(min, max) {
    return ((max - min) * Math.random() + min)
}

function refresh() {
    const coins = abbreviate(Math.floor(stats.Coins))

    clicks.innerText = `${coins} coins`
    prod.innerText = `${abbreviate(smartround(stats.CoinsPs * (stats.CoinsPsMult + (stats.PrestigeLevel / 100))))} coins/s`

    if (stats.Settings["Dynamic site title"]) {
        document.title = `${coins} coins - Passionyte's Coinsssss!`
    }
    else {
        document.title = "Passionyte's Coinsssss!"
    }

    g("prestigecontainer").style.display = ((stats.PrestigeCoins >= 1 && stats.NextContinue == 0) && "inline-block") || "none"        
    g("prestigebar").style.width = `${((1 - Math.abs((stats.PrestigeCoins - (Math.round((stats.PrestigeCoins + 0.5)))))) * 100)}%`
}

function award(acv) {
    stats.Achievements[acv] = true
    effect("Text", { lifetime: 4, position: { x: 40, y: 75, pc: true }, text: `Unlocked: ${acv}!` })
}

function effect(type, args) {
    if (!stats.Settings[`${type} effects`]) return

    if (type == "Text") {
        const text = g("textdummy").cloneNode()

        const st = text.style
        let y
        let pc = false
        if (args.click) {
            text.innerText = `+${abbreviate(smartround((stats.CoinsPc + stats.CoinsMPc)))}`
            y = (coinmpos.y + randInt(-48, 48))
            st.left = ((coinmpos.x - 24) + randInt(-32, 32)) + 'px'
            st.top = y + 'px'
        }
        else {
            text.innerText = args.text
            if (args.bounds) {
                const bds = args.bounds

                st.left = ((bds.right - bds.left) * Math.random() + bds.left)
                st.top = ((bds.bottom - bds.top) * Math.random() + bds.top)

                y = Number(st.top)
            }
            else {
                const pos = args.position
                pc = (pos.pc)

                st.left = pos.x + ((pc) && "%") || "px"
                st.top = pos.y + ((pc) && "%") || "px"

                y = pos.y
            }
        }

        st.display = "block"
        st.opacity = 1

        effs.appendChild(text)

        const insecs = (args.lifetime * 1000)

        const anim = setInterval(_ => {
            st.opacity -= 0.01
            if (!pc) {
                st.top = `${(y - ((1 - st.opacity) * 100))}px`
            }
            else {
                st.top = `${(y - ((1 - st.opacity) * 10))}%`
            }

        }, (insecs / 100))
        setTimeout(_ => {
            clearInterval(anim)
            effs.removeChild(text)
            text.remove()
        }, insecs)
    }
}

function load() {
    // Data
    const data = localStorage.getItem("Data")

    if (data) {
        const savedata = JSON.parse(data)

        for (const thing in savedata) {
            if (stats[thing] != null) {
                stats[thing] = savedata[thing]
            }
        }
    }

    for (const data of items.structures) {
        if (!stats.Structures[data.name]) {
            stats.Structures[data.name] = {
                Amount: 0,
                Ps: data.ps,
                Mult: 1
            }
        }
        else {
            const amt = stats.Structures[data.name].Amount
            if (amt > 0) {
                for (let i = 0; (i < amt); i++) {
                    data.cost = Math.floor((data.cost * 1.1))
                }
            }
        }
    }

    for (const nm in settings) {
        const def = settings[nm]

        if (typeof (def) != "function" && (stats.Settings[nm] == null)) {
            stats.Settings[nm] = def
        }
    }

    // Interface
    g("loading").hidden = true
    g("main").style.display = "inline"
    g("main2").style.display = "inline"
    g("main3").style.display = "inline"

    loaded = true

    if (stats.Settings["Auto saving"]) {
        setInterval(_ => {
            save()
        }, 30000)
    }

    setInterval(_ => {
        for (const acv of items.achievements) {
            if (!stats.Achievements[acv.name]) {
                if (acv.type == "Stat") {
                    for (const req in acv.reqs) {
                        if (stats[req] >= acv.reqs[req]) {
                            award(acv.name)
                        }
                    }
                }
                else if (acv.type == "Structures") {
                    for (const req in acv.reqs) {
                        if (stats.Structures[req].Amount >= acv.reqs[req]) {
                            award(acv.name)
                        }
                    }
                }
                else if (acv.type == "SumStructs") {
                    let sum = 0

                    for (const struct in stats.Structures) {
                        sum += stats.Structures[struct].Amount
                    }

                    if (sum >= acv.reqs) {
                        award(acv.name)
                    }
                }
                else if (acv.type == "SumUpgrades") {
                    let len = 0

                    for (_ in stats.Upgrades) {
                        len++
                    }

                    if (len >= acv.reqs) {
                        award(acv.name)
                    }
                }
            }
        }
    }, 2000)
}

function save(force) {
    if ((stats.Coins > 0 && loaded && !savecd) || (force)) {
        localStorage.setItem("Data", JSON.stringify(stats))
        savecd = true
        setTimeout(_ => {
            savecd = false
        }, 15000)
        effect("Text", { lifetime: 3, position: { x: 40, y: 75, pc: true }, text: "Saved game" })
    }
}

function find(array, string) {
    let result = false

    for (const i in array) {
        if (i == string) {
            result = true
            break
        }
    }

    return (result)
}

function findfromiv(array, i, v) {
    let result

    for (let x in array) {
        x = array[x]

        if (x[i] == v) {
            result = x
            break
        }
    }

    return result
}

function available(reqs) {
    for (const type in reqs) {
        if (type == "Structures") {
            for (const struct in reqs[type]) {
                if (stats.Structures[struct]) {
                    if (stats.Structures[struct].Amount < reqs[type][struct]) {
                        return false
                    }
                }
            }
        }
        else {
            for (const stat in reqs[type]) {
                if (stats[stat] < reqs[type][stat]) {
                    return false
                }
            }
        }
    }

    return true
}

function purchase(data, type) {
    if (stats.Coins >= data.cost) {
        stats.Coins -= data.cost

        if (type != "upgrades") {
            data.cost = Math.floor(data.cost * 1.1)

            const s = stats.Structures[data.name]

            stats.CoinsPs += (s.Ps * s.Mult)
            s.Amount++
        }
        else {
            stats.Purchased[data.name] = true
        }

        if (data.stats) {
            for (const i in data.stats) {
                const v = data.stats[i] 

                const sdata = stats.Structures[i]

                if (sdata) {
                    const prod = ((sdata.Ps * sdata.Mult) * sdata.Amount)
                    
                    stats.CoinsPs += ((prod * v) - prod)
                    sdata.Mult += v
                }

                if (find(stats, i)) {
                    if ((data.mult && ((data.mult == true) || (data.mult[i])))) {
                        stats[i] *= v
                    }
                    else {
                        if (type == "structures" && i == "CoinsPs") {
                            stats[i] += stats.Structures[data.name].Ps
                        }
                        else {
                            stats[i] += v
                        }
                    }
                }
            }
        }

        stats.CoinsMPc = ((stats.CoinsPs * (stats.CoinsPsMult + (stats.PrestigeLevel / 100))) * stats.CoinsPcPs)
    }
}

function shop(type, force) {
    if (type) {
        const list = items[type]

        if (list) {
            itemlist.innerHTML = null
            if (type == shopopen && !force) {
                shopopen = null
            }
            else {
                shopopen = type

                for (const data of list) {
                    if ((data.hidden == null) && (type == "structures" || !find(stats.Purchased, data.name)) && (data.cost != null) && (available(data.reqs))) {
                        const clone = itemdummy.cloneNode(true)
                        const c = clone.children

                        c[0].src = data.icon || ""

                        const sdata = stats.Structures[data.name]
                        if (sdata) {
                            c[1].innerText = `${data.name} - ${stats.Structures[data.name].Amount}` || "???"
                        }
                        else {
                            c[1].innerText = data.name || "???"
                        }
                        c[2].innerText = data.desc || "???"

                        const button = c[3]
                        button.innerText = `Purchase for ${abbreviate(data.cost)} coins`
                        button.addEventListener("click", _ => {
                            let v = ((type == "structures") && bulkbuy) || 1
                            for (let i = 0; (i < v); i++) {
                                purchase(data, type)
                            }

                            refresh()
                            shop(type, true)
                        })

                        clone.hidden = false
                        itemlist.appendChild(clone)
                    }
                }
            }
            g("bulks").hidden = (!shopopen || type != "structures")
        }
    }
}

function doStats() {
    const sui = g("stats")
    sui.innerHTML = null

    const aui = g("achievements")
    aui.innerHTML = null

    g("acvtitle").innerText = `ACHIEVEMENTS - (${numacvs(true)} / ${numacvs()})` 

    for (const stat in stats) {
        const me = stats[stat]

        if (typeof (me) == "number") {
            const entry = g("statdummy").cloneNode(true)
            const c = entry.children
            c[0].innerText = `${fancynames[stat] || stat} : `
            c[1].innerText = abbreviate(smartround(me))
            entry.style.display = "block"
            sui.appendChild(entry)
        }
    }

    for (const acv in stats.Achievements) {
        const entry = g("acvdummy").cloneNode(true)
        const c = entry.children

        c[0].innerText = acv

        const data = findfromiv(items.achievements, "name", acv)
        c[0].style.color = data.shadow && "rgb(120, 25, 170)" || "rgb(0, 0, 0)"
        c[2].innerText = data.desc

        entry.style.display = "block"
        aui.appendChild(entry)
    }
}

function doChangelog() {
    const ui = g("changelog")
    ui.innerHTML = null

    for (const vers in changelog) {
        const log = changelog[vers]

        const entry = g("logdummy").cloneNode(true)

        const c = entry.children

        c[0].innerText = vers

        if (vers == version) c[0].style.color = "rgb(0, 100, 0)"

        c[2].innerText = log

        entry.style.display = "block"

        ui.appendChild(entry)
    }
}

function doSettings() {
    const ui = g("settings")
    ui.innerHTML = null

    for (const nm in settings) {
        const set = settings[nm]

        if (typeof (set) == "function") {
            const entry = g("buttondummy").cloneNode(true)

            const b = entry.children[0]
            b.innerText = nm
            entry.style.display = "block"
            ui.appendChild(entry)

            b.addEventListener("click", set)
        }
        else if (typeof (set) == "boolean") {
            const entry = g("booldummy").cloneNode(true)

            const b = entry.children[0]
            b.innerText = `${nm} : ${bool(stats.Settings[nm])}`
            entry.style.display = "block"
            ui.appendChild(entry)

            b.addEventListener("click", _ => {
                stats.Settings[nm] = (!stats.Settings[nm])
                doSettings()
                if (shopopen) {
                    shop(shopopen, true)
                }
            })
        }
        else {
            const mytype = typeof (set)
            const entry = g("inputdummy").cloneNode(true)

            const c = entry.children
            c[0].innerText = `${nm} : `
            entry.style.display = "block"
            ui.appendChild(entry)
            c[2].addEventListener("click", _ => {
                let input = c[1].value

                if (mytype == "number") {
                    input = Number(input)

                    if (!isNaN(input)) {
                        stats.Settings[nm] = input
                        doSettings()
                        if (shopopen) {
                            shop(shopopen, true)
                        }
                    }
                }
            })
        }
    }
}

function openPrestige() {
    if (stats.PrestigeCoins >= 1 && stats.NextContinue == 0) {
        const c = pmenu.children

        c[2].children[1].innerText = `You will gain ${abbreviate(Math.round(stats.PrestigeCoins))} prestige levels and coin balance, however you have to forfeit everything.`
        pmenu.hidden = false
    }
}

function menu(type) {
    const ui = g(type)

    if (menuopen && menuopen != type) {
        g(menuopen).hidden = true
        if (menurf) {
            clearInterval(menurf)
            menurf = null
        }
    }

    const aui = g("achievements")
    const at = g("acvtitle")
    if (ui && ui.hidden) {
        g("menulabel").innerText = type.toUpperCase()

        menuopen = type
        ui.hidden = false

        const hideacvs = (type != "stats")
        aui.hidden = hideacvs
        at.hidden = hideacvs

        if (type == "stats") {
            doStats()
            menurf = setInterval(doStats, 2000)
        }
        else if (type == "settings") {
            doSettings()
        }
        else if (type == "changelog") {
            doChangelog()
        }
    }
    else {
        aui.hidden = true
        at.hidden = true
        g("menulabel").innerText = ""
        ui.hidden = true

        if (menurf) {
            clearInterval(menurf)
            menurf = null
        }
    }
}

// Listeners

bigbutton.addEventListener("click", _ => {
    const x = (stats.CoinsPc + stats.CoinsMPc)
    stats.Coins += x
    stats.TotalCoins += x
    stats.PrestigeCoins += (x / 1e12)
    stats.Clicks++
    refresh()
    effect("Text", { click: true, lifetime: 1 })
})

bigbutton.addEventListener("mousemove", ev => {
    coinmpos = { x: ev.clientX, y: ev.clientY }
})

bigbutton.addEventListener("mousedown", _ => {
    bigbutton.style.width = 48 + "%"
    bigbutton.style.left = 1 + "%"
    bigbutton.style.top = 1 + "%"
})

bigbutton.addEventListener("mouseup", _ => {
    bigbutton.style.width = 50 + "%"
    bigbutton.style.left = 0
    bigbutton.style.top = 0
})

bigbutton.addEventListener("mouseleave", _ => {
    bigbutton.style.width = 50 + "%"
    bigbutton.style.left = 0
    bigbutton.style.top = 0
})

// Bulk buyers

g("buy1").addEventListener("click", e => {
    g(`buy${bulkbuy}`).style["font-weight"] = null
    e.target.style["font-weight"] = "bold"
    bulkbuy = 1
})

g("buy10").addEventListener("click", e => {
    g(`buy${bulkbuy}`).style["font-weight"] = null
    e.target.style["font-weight"] = "bold"
    bulkbuy = 10
})

g("buy25").addEventListener("click", e => {
    g(`buy${bulkbuy}`).style["font-weight"] = null
    e.target.style["font-weight"] = "bold"
    bulkbuy = 25
})

// Prestige menu

const prestiged = false
g("bprestige").addEventListener("click", _ => {
    if (!prestiged) {
        stats.Prestiges++

        const pcoins = Math.round(stats.PrestigeCoins)
        stats.PrestigeLevel += pcoins
        stats.PrestigeBalance += pcoins
    
        for (const def in blank) {
            if (stats[def]) {
                stats[def] = blank[def]
            }
        }
    
        save(true)
        setTimeout(_ => {
            location.reload()
        }, 1000)
    }
})

g("bcontinue").addEventListener("click", _ => {
    stats.PrestigeCoins = 0
    stats.NextContinue = 1800 // 30 minutes
    stats.Continues++

    pmenu.hidden = true
})

g("bnevermind").addEventListener("click", _ => {
    pmenu.hidden = true
})

// Buttons

structb.addEventListener("click", _ => {
    shop("structures")
})

upgb.addEventListener("click", _ => {
    shop("upgrades")
})

g("statsbutton").addEventListener("click", _ => {
    menu("stats")
})

g("changelogbutton").addEventListener("click", _ => {
    menu("changelog")
})

g("settingsbutton").addEventListener("click", _ => {
    menu("settings")
})

g("prestigebutton").addEventListener("click", _ => {
    openPrestige()
})

// Hard coded crap

document.addEventListener("contextmenu", mouse => {
    mouse.preventDefault()
    return false
})

g("version").innerText = `v${version}`

for (const nm in settings) {
    const def = settings[nm]

    if (typeof (def) != "function") {
        stats.Settings[nm] = def
    }
}

setInterval(_ => {
    const x = ((stats.CoinsPs * (stats.CoinsPsMult + (stats.PrestigeLevel / 100))) / fps)
    stats.Coins += x
    stats.TotalCoins += x
    stats.PrestigeCoins += (x / 1e12)

    if (stats.NextContinue > 0) stats.NextContinue -= (1 / fps)

    refresh()

    if (debug) {
        globalThis.stats = stats
    }
}, fps)

setTimeout(load, 1000)
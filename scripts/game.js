// Written by Passionyte

// Elements

const bigbutton = document.getElementById("bigbutton")
const clicks = document.getElementById("clicks")
const prod = document.getElementById("clicksps")
const itemlist = document.getElementById("items")
const itemdummy = document.getElementById("itemdummy")
const structb = document.getElementById("structures")
const upgb = document.getElementById("upgrades")
const effs = document.getElementById("effects")
const pmenu = document.getElementById("choice")

// Variables

var stats = {
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
var blank = {
    Coins: 0,
    CoinsPs: 0,
    CoinsPc: 1,
    CoinsPcPs: 0,
    CoinsMPc: 0,
    CoinsPsMult: 1,
    PrestigeCoins: 0,
    Purchased: {},
    Structures: {}
}
var loaded = false
var savecd = false
var menuopen
var shopopen
var menurf
var coinmpos

const fps = 30

import { changelog, version } from "./changelog.js"
import { items } from "./items.js"

const fancynames = { // Any string you want to look fancy
    CoinsPs: "Coins per sec.",
    CoinsPsMult: "Coins per sec. multiplier",
    CoinsPc: "Coins per click",
    CoinsPcPs: "Coins per click (% of PS)",
    CoinsMPc: "Coins per click PS bonus",
    TotalCoins: "Total coins",
    PrestigeCoins: "Current prestige coins",
    PrestigeLevel: "Prestige level (+1% of PS)",
    PrestigeBalance: "Prestige coin balance",
    NextContinue: "Seconds until next continue"
}
const settings = {
    // Function button types
    ["Reset game"]: function () {
        if (confirm("Are you sure you want to reset your game?")) {
            localStorage.clear()
            location.reload()
        }
    },
    ["Save game"]: function () {
        save()
    },
    ["Go to Wii U"]: function () {
        window.location.replace("https://passionyte.github.io/coinssssswiiu");
    },

    // Boolean types
    ["Auto saving"]: true,
    ["Short numbers"]: true,
    ["Dynamic site title"]: true,
    ["Text effects"]: true,

    // Input types
    ["Decimals"]: 2
}
const abbrs = { // Number abbreviations
    [1e33]: "decillion",
    [1e30]: "nonillion",
    [1e27]: "octillion",
    [1e24]: "septillion",
    [1e21]: "sextillion",
    [1e18]: "quintillion",
    [1e15]: "quadrillion",
    [1e12]: "trillion",
    [1e9]: "billion",
    [1e6]: "million",
}

// Functions

function numacvs(owned) {
    var num = 0

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

    var largest

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

    document.getElementById("prestigecontainer").style.display = ((stats.PrestigeCoins >= 1 && stats.NextContinue == 0) && "inline-block") || "none"        
    document.getElementById("prestigebar").style.width = `${((1 - Math.abs((stats.PrestigeCoins - (Math.round((stats.PrestigeCoins + 0.5)))))) * 100)}%`
}

function award(acv) {
    stats.Achievements[acv] = true
    effect("Text", { lifetime: 4, position: { x: 40, y: 75, pc: true }, text: `Unlocked: ${acv}!` })
}

function effect(type, args) {
    if (!stats.Settings[`${type} effects`]) {
        return
    }

    if (type == "Text") {
        const text = document.getElementById("textdummy").cloneNode()

        const st = text.style
        var y
        var pc = false
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
            }
        }
        else {
            const amt = stats.Structures[data.name].Amount
            if (amt > 0) {
                for (var i = 0; (i < amt); i++) {
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
    document.getElementById("loading").hidden = true
    document.getElementById("main").style.display = "inline"
    document.getElementById("main2").style.display = "inline"
    document.getElementById("main3").style.display = "inline"

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
                else if (acv.Type == "Structures") {
                    for (const req in acv.reqs) {
                        if (stats.Structures[req].Amount >= acv.reqs[req]) {
                            award(acv.name)
                        }
                    }
                }
                else if (acv.Type == "SumStructs") {
                    var sum = 0

                    for (const struct in stats.Structures) {
                        sum += stats.Structures[struct].Amount
                    }

                    if (sum >= acv.reqs) {
                        award(acv.name)
                    }
                }
                else if (acv.Type == "SumUpgrades") {
                    var len = 0

                    for (const i in stats.Upgrades) {
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
    var result = false

    for (const i in array) {
        if (i == string) {
            result = true
            break
        }
    }

    return (result)
}

function findfromiv(array, i, v) {
    var result

    for (var x in array) {
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
                            if (stats.Coins >= data.cost) {
                                stats.Coins -= data.cost

                                if (type != "upgrades") {
                                    data.cost = Math.floor(data.cost * 1.1)
                                    stats.CoinsPs += stats.Structures[data.name].Ps
                                    stats.Structures[data.name].Amount++
                                }
                                else {
                                    stats.Purchased[data.name] = true
                                }

                                if (data.stats && (data.stats.length > 0)) {
                                    for (const i in data.stats) {
                                        const v = data.stats[i]

                                        const sdata = stats.Structures[i]

                                        if (sdata) {
                                            const prod = (sdata.Ps * sdata.Amount)
                                            
                                            stats.CoinsPs += ((prod * v) - prod)
                                            sdata.Ps *= v
                                        }

                                        console.log(stats[i])
                                        if (find(stats, i)) {
                                            if (data.mults[i]) {
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

                                refresh()
                                shop(type, true)
                            }
                        })

                        clone.hidden = false
                        itemlist.appendChild(clone)
                    }
                }
            }
        }
    }
}

function doStats() {
    const sui = document.getElementById("stats")
    sui.innerHTML = null

    const aui = document.getElementById("achievements")
    aui.innerHTML = null

    document.getElementById("acvtitle").innerText = `ACHIEVEMENTS - (${numacvs(true)} / ${numacvs()})` 

    for (const stat in stats) {
        const me = stats[stat]

        if (typeof (me) == "number") {
            const entry = document.getElementById("statdummy").cloneNode(true)
            const c = entry.children
            c[0].innerText = `${fancynames[stat] || stat} : `
            c[1].innerText = abbreviate(smartround(me))
            entry.style.display = "block"
            sui.appendChild(entry)
        }
    }

    for (const acv in stats.Achievements) {
        const entry = document.getElementById("acvdummy").cloneNode(true)
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
    const ui = document.getElementById("changelog")
    ui.innerHTML = null

    for (const vers in changelog) {
        const log = changelog[vers]

        const entry = document.getElementById("logdummy").cloneNode(true)

        const c = entry.children

        c[0].innerText = vers

        if (vers == version) {
            c[0].style.color = "rgb(0, 100, 0)"
        }

        c[2].innerText = log

        entry.style.display = "block"

        ui.appendChild(entry)
    }
}

function doSettings() {
    const ui = document.getElementById("settings")
    ui.innerHTML = null

    for (const nm in settings) {
        const set = settings[nm]

        if (typeof (set) == "function") {
            const entry = document.getElementById("buttondummy").cloneNode(true)

            const b = entry.children[0]
            b.innerText = nm
            entry.style.display = "block"
            ui.appendChild(entry)

            b.addEventListener("click", set)
        }
        else if (typeof (set) == "boolean") {
            const entry = document.getElementById("booldummy").cloneNode(true)

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
            const entry = document.getElementById("inputdummy").cloneNode(true)

            const c = entry.children
            c[0].innerText = `${nm} : `
            entry.style.display = "block"
            ui.appendChild(entry)
            c[2].addEventListener("click", _ => {
                var input = c[1].value

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

        c[2].children[1].innerText = `You will gain ${Math.round(stats.PrestigeCoins)} prestige levels and coin balance, however you have to forfeit everything.`
        pmenu.hidden = false
    }
}

function menu(type) {
    const ui = document.getElementById(type)

    if (menuopen && menuopen != type) {
        document.getElementById(menuopen).hidden = true
        if (menurf) {
            clearInterval(menurf)
            menurf = null
        }
    }

    const aui = document.getElementById("achievements")
    const at = document.getElementById("acvtitle")
    if (ui && ui.hidden) {
        document.getElementById("menulabel").innerText = type.toUpperCase()

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
        document.getElementById("menulabel").innerText = ""
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

// Prestige menu

const prestiged = false
document.getElementById("bprestige").addEventListener("click", _ => {
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

document.getElementById("bcontinue").addEventListener("click", _ => {
    stats.PrestigeCoins = 0
    stats.NextContinue = 1800 // 30 minutes
    stats.Continues++

    pmenu.hidden = true
})

document.getElementById("bnevermind").addEventListener("click", _ => {
    pmenu.hidden = true
})

// Buttons

structb.addEventListener("click", _ => {
    shop("structures")
})

upgb.addEventListener("click", _ => {
    shop("upgrades")
})

document.getElementById("statsbutton").addEventListener("click", _ => {
    menu("stats")
})

document.getElementById("changelogbutton").addEventListener("click", _ => {
    menu("changelog")
})

document.getElementById("settingsbutton").addEventListener("click", _ => {
    menu("settings")
})

document.getElementById("prestigebutton").addEventListener("click", _ => {
    openPrestige()
})

// Hard coded crap

document.getElementById("version").innerText = `v${version}`

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

    if (stats.NextContinue > 0) {
        stats.NextContinue -= (1 / fps)
    }

    refresh()
}, fps)

setTimeout(load, 1000)
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

const version = "0.063_2 Alpha"
const fps = 30

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
const changelog = {
    [version]: "- More number abbreviations \n - More balancing to prestiging will come soon",
    ["0.063_1 Alpha"]: "- Adjusted delay between continues from 1 hour to 30 minutes for less pain to the player",
    ["0.063 Alpha"]: "- Prestige coins can now be kept as a currency (currently nothing to buy though) \n - Prestige count is now tracked \n - Added more achievements and upgrades \n - Fixed it so you can actually prestige (lol)",
    ["0.06 Alpha"]: "- Added prestige system, you can prestige and forfeit everything for a CPS boost or continue with new structures and upgrades \n - No additional content for it... yet \n - UI improvements",
    ["0.056 Alpha"]: "- More upgrades",
    ["0.055 Alpha"]: "- Added more upgrades and achievements \n - Added achievement counter to title on stats page \n - Added shadow achivements which don't count towards your total",
    ["0.052_1 Alpha"]: "The save file won't exist on Wii U consoles so forget that last note",
    ["0.052 Alpha"]: "- Added Wii U achievement for people who actually play this on a Wii U. It is also given to your primary save file if it exists.",
    ["0.05 Alpha"]: "- 2 new CPC upgrades to help bridge the progression gap... need more...",
    ["0.049 Alpha"]: "- Added redirect button between versions",
    ["0.048 Alpha"]: "- More upgrades and achievements",
    ["0.046 Alpha"]: "- Added changelog \n - Minor fixes to scaling issues until I become the opposite of a newbie at CSS",
    ["0.045_2 Alpha"]: "- Experimental Wii U port now exists at coinssssswiiu extension! \n - Minor bug fix."
}

// Functions

function numacvs(owned) {
    var num = 0

    if (owned) {
        for (_ in stats.Achievements) {
            num++
        }
    }
    else {
        for (const acv of items.achievements) {
            if (!acv.Shadow) {
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
    d = stats.Settings.Decimals

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
        if (!stats.Structures[data.Name]) {
            stats.Structures[data.Name] = {
                Amount: 0,
                Ps: data.CoinsPs,
                Mult: 1
            }
        }
        else {
            const amt = stats.Structures[data.Name].Amount
            if (amt > 0) {
                for (var i = 0; (i < amt); i++) {
                    data.Cost = Math.floor((data.Cost * 1.1))
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
            if (!stats.Achievements[acv.Name]) {
                if (acv.Type == "Stat") {
                    for (const req in acv.Requirements) {
                        if (stats[req] >= acv.Requirements[req]) {
                            award(acv.Name)
                        }
                    }
                }
                else if (acv.Type == "Structures") {
                    for (const req in acv.Requirements) {
                        if (stats.Structures[req].Amount >= acv.Requirements[req]) {
                            award(acv.Name)
                        }
                    }
                }
                else if (acv.Type == "SumStructs") {
                    var sum = 0

                    for (const struct in stats.Structures) {
                        sum += stats.Structures[struct].Amount
                    }

                    if (sum >= acv.Requirement) {
                        award(acv.Name)
                    }
                }
                else if (acv.Type == "SumUpgrades") {
                    var len = 0

                    for (const i in stats.Upgrades) {
                        len++
                    }

                    if (len >= acv.Requirement) {
                        award(acv.Name)
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

                for (const item in list) {
                    const data = list[item]

                    if ((data.Hidden == null) && (type == "structures" || !find(stats.Purchased, data.Name)) && (data.Cost != null) && (available(data.Requirements))) {
                        const clone = itemdummy.cloneNode(true)
                        const c = clone.children

                        c[0].src = data.Icon || ""

                        const sdata = stats.Structures[data.Name]
                        if (sdata) {
                            c[1].innerText = `${data.Name} - ${stats.Structures[data.Name].Amount}` || "???"
                        }
                        else {
                            c[1].innerText = data.Name || "???"
                        }
                        c[2].innerText = data.Description || "???"

                        const button = c[3]
                        button.innerText = `Purchase for ${abbreviate(data.Cost)} coins`
                        button.addEventListener("click", _ => {
                            if (stats.Coins >= data.Cost) {
                                stats.Coins -= data.Cost

                                if (type != "upgrades") {
                                    data.Cost = Math.floor(data.Cost * 1.1)
                                    stats.Structures[data.Name].Amount++
                                }
                                else {
                                    stats.Purchased[data.Name] = true
                                }

                                if (data.StructName) {
                                    const sdata = stats.Structures[data.StructName]
                                    const prod = (sdata.Ps * sdata.Amount)
                                    const mult = data.StructMult || 2

                                    stats.CoinsPs += ((prod * mult) - prod)
                                    sdata.Ps *= mult
                                }
                                else {
                                    for (const buff in data) {
                                        if (find(stats, buff)) {
                                            if (data.Multiply) {
                                                stats[buff] *= data[buff]
                                            }
                                            else {
                                                if (type == "structures" && buff == "CoinsPs") {
                                                    stats[buff] += stats.Structures[data.Name].Ps
                                                }
                                                else if (buff == "CoinsPcPs") {
                                                    stats.CoinsPcPs += data[buff]
                                                }
                                                else {
                                                    stats[buff] += data[buff]
                                                }
                                            }
                                        }
                                    }
                                }

                                const otherboosts = data.OtherBoosts
                                if (otherboosts) {
                                    for (const name in otherboosts) {
                                        const boost = otherboosts[name]

                                        const sdata = stats.Structures[name]

                                        sdata.Mult += boost

                                        const prod = sdata.Ps
                                        sdata.Ps = ((prod * sdata.Mult) - prod)
                                        stats.CoinsPs += (sdata.Ps - prod)
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

        const data = findfromiv(items.achievements, "Name", acv)
        c[0].style.color = data.Shadow && "rgb(120, 25, 170)" || "rgb(0, 0, 0)"
        c[2].innerText = data.Description

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
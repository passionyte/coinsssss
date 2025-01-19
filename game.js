// Written by Passionyte

// Elements

const bigbutton = document.getElementById("bigbutton")
const clicks = document.getElementById("clicks")
const prod = document.getElementById("clicksps")
const itemlist = document.getElementById("items")
const itemdummy = document.getElementById("itemdummy")
const structb = document.getElementById("structures")
const upgb = document.getElementById("upgrades")

// Variables

let stats = {
    Coins: 0,
    CoinsPs: 0,
    CoinsPc: 1,
    CoinsMPc: 0, // Ps bonus given to Pc from the fractal below
    CoinsPcPs: 0, // Fraction of Ps given to Pc
    Purchased: {},
    Structures: {}
}
let loaded = false

const items = {
    structures: [
        Clicker = {Name: "Clicker", Cost: 15, CoinsPs: 0.1, Description: "Click click click..."},
        Miner = {Name: "Miner", Cost: 100, CoinsPs: 1, Description: "Hire a miner to mine more coins."},
        Trader = {Name: "Trader", Cost: 800, CoinsPs: 4, Description: "Hire a 'Professional' coin trader to make more coins."},
        Business = {Name: "Business", Cost: 2000, CoinsPs: 20, Description: "Start a business to exchange goods and services for more coins."},
        Factory = {Name: "Factory", Cost: 16000, CoinsPs: 128, Description: "Why not build a Factory that produces coins?"}
    ],
    upgrades: [
        DoubleClick = {Name: "Double Click", Cost: 100, CoinsPc: 1, Description: "Doubles your coins per click!"},
        WoodMouse = {Name: "Wood Mouse", Cost: 200, StructName: "Clicker", StructMult: 2, CoinsPs: 0, Description: "Clank clank clank... Clickers are twice as efficient!", Requirements: {Structures: {Clicker: 1}}},
        TripleClick = {Name: "Triple Click", Cost: 500, CoinsPc: 1, Description: "Increases your coins per click to 3!", Requirements: {Stats: {CoinsPc: 2}}},
        IronPickaxe = {Name: "Iron Pickaxe", Cost: 2000, StructName: "Miner", StructMult: 2, CoinsPs: 0, Description: "Upgrade pickaxes from Stone to Iron. Miners are twice as efficient!", Requirements: {Structures: {Miner: 1}}},
        QuadClick = {Name: "Quad Click", Cost: 1337, CoinsPc: 1, Description: "Increases your coins per click to 4!", Requirements: {Stats: {CoinsPc: 3}}},
        Scamming = {Name: "Scamming", Cost: 7777, StructName: "Trader", StructMult: 2, CoinsPs: 0, Description: "Scam rich people! Traders are twice as efficient!", Requirements: {Structures: {Trader: 1}}},
        EightBallClick = {Name: "8-Ball Click", Cost: 8888, CoinsPc: 2, Multiply: true, Description: "Magic 8 Ball... Give me more coins... Doubles your coins per click!", Requirements: {Stats: {CoinsPc: 4}}},
        Enterprise = {Name: "Enterprise", Cost: 30000, StructName: "Business", StructMult: 2, CoinsPs: 0, Description: "Surely giving your businesses a fancy name will attract more customers... Businesses are twice as efficient!", Requirements: {Structures: {Business: 1}}},
        OilMachine = {Name: "Well-Oiled Machines", Cost: 80000, StructName: "Factory", StructMult: 2, CoinsPs: 0, Description: "Upgrade the machines in your factory to industry standard. Factories are twice as efficient!", Requirements: {Structures: {Factory: 1}}},
        StoneMouse = {Name: "Stone Mouse", Cost: 1000, StructName: "Clicker", StructMult: 2, CoinsPs: 0, Description: "Clonk clonk clonk... Clickers are twice as efficient!", Requirements: {Structures: {Clicker: 10}}},
        GoldPickaxe = {Name: "Gold Pickaxe", Cost: 5000, StructName: "Miner", StructMult: 2, CoinsPs: 0, Description: "Upgrade pickaxes from Iron to Gold. Must be better... right? Miners are twice as efficient!", Requirements: {Structures: {Miner: 10}}},
        ShowerThoughts = {Name: "Shower Thoughts", Cost: 16661, StructName: "Trader", StructMult: 2, CoinsPs: 0, Description: "So... how *else* can we scam people...? Darn! Dropped the soap again! Traders are twice as efficient!", Requirements: {Structures: {Trader: 10}}},
        DreamersClick = {Name: "Dreamer's Click", Cost: 20000, CoinsPcPs: 0.1, Description: "Zzzzzz.... coins.... Clicking earns 10% of your coins per second!", Requirements: {Stats: {CoinsPc: 8}}},
    ]
}

// Functions

function smartround(x) { // For when you don't want a billion decimals in a number and instead 'n' decimals
    return (Math.round(x * 10) / 10)
}

function refresh() {
    clicks.innerText = `${Math.floor(stats.Coins)} coins`
    prod.innerText = `${smartround(stats.CoinsPs + stats.CoinsMPc)} coins/s`
}

function get(table, x) {
    let count = 0
    let result

    for (const thing in table) {
        if (count == x) {
            result = thing
            break
        }
        count++
    }

    return result
}

function load() {
    // Data
    const data = localStorage.getItem("Data")

    if (data) {
        const savedata = JSON.parse(data)

        for (let thing in savedata) {
            if (stats[thing] != null) {
                stats[thing] = savedata[thing]
            }
        }
    }

    for (const structure in items.structures) {
        const data = items.structures[structure]

        if (!stats.Structures[data.Name]) {
            stats.Structures[data.Name] = {
                Amount: 0,
                Ps: data.CoinsPs
            }
        }
    }

    // Interface
    document.getElementById("loading").hidden = true
    document.getElementById("main").hidden = false
    document.getElementById("main2").hidden = false

    loaded = true
}

function save() {
    if (stats.Coins > 0 && loaded) {
        localStorage.setItem("Data", JSON.stringify(stats))
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

function available(reqs) {
    for (const type in reqs) {
        if (type == "Structures") {
            for (const struct in reqs[type]) {
                if (stats.Structures[struct].Amount < reqs[type][struct]) {
                    return false
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

function shop(type) {
    if (type) {
        const list = items[type]

        if (list) {
            itemlist.innerHTML = null
    
            for (const item in list) {
                const data = list[item]

                if (!data.Hidden && (type == "structures" || !find(stats.Purchased, data.Name)) && data.Cost && available(data.Requirements)) {
                    const clone = itemdummy.cloneNode(true)
                    const c = clone.children
    
                    c[0].src = data.Icon || ""
                    c[1].innerText = data.Name || "No name"
                    c[2].innerText = data.Description || "No description"
    
                    const button = c[3]
                    button.innerText = `Purchase for ${data.Cost} coins`
                    button.addEventListener("click", _=> {
                        if (stats.Coins >= data.Cost) {
                            stats.Coins -= data.Cost
                            
                            if (type != "upgrades") {
                                data.Cost = Math.floor(data.Cost * 1.1)
                                stats.Structures[data.Name].Amount++
                            }
                            else {
                                stats.Purchased[data.Name] = true
                            }
                            
                            for (const buff in data) {
                                if (find(stats, buff)) {
                                    if (data.Multiply) {
                                        stats[buff] *= data[buff]
                                    }
                                    else if (data.StructMult) {
                                        const sdata = stats.Structures[data.StructName]
                                        const prod = (sdata.Ps * sdata.Amount)

                                        stats.CoinsPs += ((prod * data.StructMult) - prod)
                                        stats.CoinsMPc = (stats.CoinsPs * stats.CoinsPcPs)
                                        sdata.Ps *= data.StructMult
                                    }
                                    else {
                                        if (type == "structures" && buff == "CoinsPs") {
                                            stats[buff] += stats.Structures[data.Name].Ps
                                            stats.CoinsMPc = (stats.CoinsPs * stats.CoinsPcPs)
                                        }
                                        else if (buff == "CoinsPcPs") {
                                            stats.CoinsPcPs += data[buff]
                                            stats.CoinsMPc = (stats.CoinsPs * stats.CoinsPcPs)
                                        }
                                        else {
                                            stats[buff] += data[buff]
                                        }
                                    }
                                }
                            }
                            refresh()
                            shop(type)
                        }
                    })
    
                    clone.hidden = false
                    itemlist.appendChild(clone)
                }
            }
        }
    }
}

// Listeners

bigbutton.addEventListener("click", _ => {
    stats.Coins += stats.CoinsPc
    refresh()
})

structb.addEventListener("click", _ => {
    shop("structures")
})

upgb.addEventListener("click", _ => {
    shop("upgrades")
})

// Hard coded shit

setInterval(_ => {
    stats.Coins += ((stats.CoinsPs + stats.CoinsMPc) / 100)
    refresh()
}, 10)
setInterval(_=> {
    save()
}, 30000)

setTimeout(load, 1000)
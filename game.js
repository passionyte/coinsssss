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
    CoinsPsMult: 1, // Actual multiplier
    Purchased: {},
    Structures: {}
}
let loaded = false
const fps = 30

const items = {
    structures: [
        Clicker = {Name: "Clicker", Cost: 15, CoinsPs: 0.1, Description: "Click click click..."},
        Miner = {Name: "Miner", Cost: 100, CoinsPs: 1, Description: "Hire a miner to mine more coins."},
        Trader = {Name: "Trader", Cost: 800, CoinsPs: 4, Description: "Hire a 'Professional' coin trader to make more coins."},
        Business = {Name: "Business", Cost: 2000, CoinsPs: 20, Description: "Start a business to exchange goods and services for more coins."},
        Factory = {Name: "Factory", Cost: 14000, CoinsPs: 128, Description: "Why not build a Factory that produces coins?"},
        EightBall = {Name: "8-Ball", Cost: 88000, CoinsPs: 512, Description: "What's the point of being conventional? Start bulk buying 8-Balls for more coin wishes."},
        Currency = {Name: "Currency", Cost: 500000, CoinsPs: 2800, Description: "Now you must mean serious business. Convince people to start paying solely in coins."},
        Alchemy = {Name: "Alchemy Lab", Cost: 3200000, CoinsPs: 9999, Description: "Turns cookies into gold coins. Seems worth it, right?"},
    ],
    upgrades: [
        DoubleClick = {Name: "Double Click", Cost: 100, CoinsPc: 1, Description: "Doubles your coins per click!"},
        WoodMouse = {Name: "Wood Mouse", Cost: 200, StructName: "Clicker", StructMult: 2, Description: "Clank clank clank... Clickers are twice as efficient!", Requirements: {Structures: {Clicker: 1}}},
        TripleClick = {Name: "Triple Click", Cost: 500, CoinsPc: 1, Description: "Increases your coins per click to 3!", Requirements: {Stats: {CoinsPc: 2}}},
        IronPickaxe = {Name: "Iron Pickaxe", Cost: 2000, StructName: "Miner", StructMult: 2, Description: "Upgrade pickaxes from Stone to Iron. Miners are twice as efficient!", Requirements: {Structures: {Miner: 1}}},
        QuadClick = {Name: "Quad Click", Cost: 1337, CoinsPc: 1, Description: "Increases your coins per click to 4!", Requirements: {Stats: {CoinsPc: 3}}},
        Scamming = {Name: "Scamming", Cost: 7777, StructName: "Trader", StructMult: 2, Description: "Scam rich people! Traders are twice as efficient!", Requirements: {Structures: {Trader: 1}}},
        EightBallClick = {Name: "8-Ball Click", Cost: 8888, CoinsPc: 2, Multiply: true, Description: "Magic 8 Ball... Give me more coins... Doubles your coins per click!", Requirements: {Stats: {CoinsPc: 4}}},
        Enterprise = {Name: "Enterprise", Cost: 25000, StructName: "Business", StructMult: 2, Description: "Surely giving your businesses a fancy name will attract more customers... Businesses are twice as efficient!", Requirements: {Structures: {Business: 1}}},
        OilMachine = {Name: "Well-Oiled Machines", Cost: 70000, StructName: "Factory", StructMult: 2, Description: "Upgrade the machines in your factory to industry standard. Factories are twice as efficient!", Requirements: {Structures: {Factory: 1}}},
        StoneMouse = {Name: "Stone Mouse", Cost: 1000, StructName: "Clicker", StructMult: 2, Description: "Clonk clonk clonk... Clickers are twice as efficient!", Requirements: {Structures: {Clicker: 10}}},
        GoldPickaxe = {Name: "Gold Pickaxe", Cost: 5000, StructName: "Miner", StructMult: 2, Description: "Upgrade pickaxes from Iron to Gold. Must be better... right? Miners are twice as efficient!", Requirements: {Structures: {Miner: 10}}},
        ShowerThoughts = {Name: "Shower Thoughts", Cost: 10000, StructName: "Trader", StructMult: 2, Description: "So... how *else* can we scam people...? Darn! Dropped the soap again! Traders are twice as efficient!", Requirements: {Structures: {Trader: 10}}},
        DreamersClick = {Name: "Dreamer's Click", Cost: 20000, CoinsPcPs: 0.05, Description: "Zzzzzz.... coins.... Clicking earns 5% of your coins per second!", Requirements: {Stats: {CoinsPc: 8}}},
        PayRaise = {Name: "Pay Raises", Cost: 120000, StructName: "Business", StructMult: 2, Description: "Increase worker morale by incorporating pay raises. Businesses are twice as efficient!", Requirements: {Structures: {Business: 10}}},
        Quantum = {Name: "Quantum Mechanics", Cost: 400000, StructName: "Factory", StructMult: 2, Description: "627% more efficient than conventional electricity... Factories are twice as efficient!", Requirements: {Structures: {Factory: 10}}},
        EightBallClick2 = {Name: "8-Ball Click Mk2", Cost: 88888, CoinsPcPs: 0.08, Description: "Yeah, that's right; ask your personal 8-Ball for another coin related wish. This is your last... Clicking earns 8% of your coins per second!", Requirements: {Stats: {CoinsPcPs: 0.05}}},
        BronzeFortune = {Name: "Bronze Fortune", Cost: 25000, CoinsPsMult: 0.1, Description: "Not the best, but better than nothing. Gives 10% production multiplier."},
        DiamondPickaxe = {Name: "Diamond Pickaxe", Cost: 15000, StructName: "Miner", StructMult: 2, Description: "Upgrade pickaxes from Gold to Diamond. Miners are twice as efficient!", Requirements: {Structures: {Miner: 25}}},
        SteelMouse = {Name: "Steel Mouse", Cost: 9001, StructName: "Clicker", StructMult: 2, Description: "Clink clink clink... Clickers are twice as efficient!", Requirements: {Structures: {Clicker: 25}}},
        Crypt = {Name: "Crypto", Cost: 33000, StructName: "Trader", StructMult: 2, Description: "Yeah. Now these deals make even more sense. Totally. Traders are twice as efficient!", Requirements: {Structures: {Trader: 25}}},
        CoinApprovedClick = {Name: "Coin-Approved Click", Cost: 150000, CoinsPc: 12, Multiply: true, Description: "The name speaks for itself. Base coins per click is multiplied by 12.", Requirements: {Stats: {CoinsPc: 8}}},
        SuperFullTime = {Name: "Super Full-Time", Cost: 400000, StructName: "Business", StructMult: 2, Description: "So workers thought full-time was a lot? You say: Nah. Businesses are twice as efficient!", Requirements: {Structures: {Business: 25}}},
        Nuclear = {Name: "Nuclear Mechanics", Cost: 1000000, StructName: "Factory", StructMult: 2, Description: "Radioactive. Factories are twice as efficient!", Requirements: {Structures: {Factory: 25}}},
    ]
}

// Functions

function smartround(x) { // For when you don't want a billion decimals in a number
    return (Math.round(x * 10) / 10)
}

function refresh() {
    clicks.innerText = `${Math.floor(stats.Coins)} coins`
    prod.innerText = `${smartround(stats.CoinsPs * stats.CoinsPsMult)} coins/s`
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

    for (const structure in items.structures) {
        const data = items.structures[structure]

        if (!stats.Structures[data.Name]) {
            stats.Structures[data.Name] = {
                Amount: 0,
                Ps: data.CoinsPs
            }
        }
        else {
            const amt = stats.Structures[data.Name].Amount
            if (amt > 0) {
                data.Cost = Math.floor((data.Cost * (1.1 * amt)))
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

                if ((data.Hidden == null) && (type == "structures" || !find(stats.Purchased, data.Name)) && (data.Cost != null) && (available(data.Requirements))) {
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
                            
                            if (data.StructMult) {
                                const sdata = stats.Structures[data.StructName]
                                const prod = (sdata.Ps * sdata.Amount)

                                stats.CoinsPs += ((prod * data.StructMult) - prod)
                                sdata.Ps *= data.StructMult
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
                            stats.CoinsMPc = (stats.CoinsPs * stats.CoinsPcPs)
                            
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
    stats.Coins += smartround((stats.CoinsPc + stats.CoinsMPc))
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
    stats.Coins += smartround(((stats.CoinsPs * stats.CoinsPsMult) / fps))
    refresh()
}, fps)
setInterval(_=> {
    save()
}, 30000)

setTimeout(load, 1000)
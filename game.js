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
        Research = {Name: "Research Facility", Cost: 3200000, CoinsPs: 12000, Description: "Research facilities which prioritize finding new ways to make coins."},
        MatterRefiner = {Name: "Matter Refiner", Cost: 48000000, CoinsPs: 50000, Description: "Developed by your research facilities, you can now refine matter to the point where it turns into coins."},
        Matrix = {Name: "The Matrix", Cost: 600000000, CoinsPs: 400000, Description: "Didn't see this coming, did you? Now choose a coin... red or blue..."}
    ],
    upgrades: [
        DoubleClick = {Name: "Double Click", Cost: 100, CoinsPc: 1, Description: "Doubles your coins per click!"},
        WoodMouse = {Name: "Wood Mouse", Cost: 200, StructName: "Clicker", Description: "Clank clank clank... Clickers are twice as efficient!", Requirements: {Structures: {Clicker: 1}}},
        TripleClick = {Name: "Triple Click", Cost: 500, CoinsPc: 1, Description: "Increases your coins per click to 3!", Requirements: {Stats: {CoinsPc: 2}}},
        IronPickaxe = {Name: "Iron Pickaxe", Cost: 2000, StructName: "Miner", Description: "Upgrade pickaxes from Stone to Iron. Miners are twice as efficient!", Requirements: {Structures: {Miner: 1}}},
        QuadClick = {Name: "Quad Click", Cost: 1337, CoinsPc: 1, Description: "Increases your coins per click to 4!", Requirements: {Stats: {CoinsPc: 3}}},
        Scamming = {Name: "Scamming", Cost: 7777, StructName: "Trader", Description: "Scam rich people! Traders are twice as efficient!", Requirements: {Structures: {Trader: 1}}},
        EightBallClick = {Name: "8-Ball Click", Cost: 8888, CoinsPc: 2, Multiply: true, Description: "Magic 8 Ball... Give me more coins... Doubles your coins per click!", Requirements: {Stats: {CoinsPc: 4}}},
        Enterprise = {Name: "Enterprise", Cost: 25000, StructName: "Business", Description: "Surely giving your businesses a fancy name will attract more customers... Businesses are twice as efficient!", Requirements: {Structures: {Business: 1}}},
        OilMachine = {Name: "Well-Oiled Machines", Cost: 70000, StructName: "Factory", Description: "Upgrade the machines in your factories to industry standard. Factories are twice as efficient!", Requirements: {Structures: {Factory: 1}}},
        StoneMouse = {Name: "Stone Mouse", Cost: 1000, StructName: "Clicker", Description: "Clonk clonk clonk... Clickers are twice as efficient!", Requirements: {Structures: {Clicker: 10}}},
        GoldPickaxe = {Name: "Gold Pickaxe", Cost: 5000, StructName: "Miner", Description: "Upgrade pickaxes from Iron to Gold. Must be better... right? Miners are twice as efficient!", Requirements: {Structures: {Miner: 10}}},
        ShowerThoughts = {Name: "Shower Thoughts", Cost: 10000, StructName: "Trader", Description: "So... how *else* can we scam people...? Darn! Dropped the soap again! Traders are twice as efficient!", Requirements: {Structures: {Trader: 10}}},
        DreamersClick = {Name: "Dreamer's Click", Cost: 20000, CoinsPcPs: 0.02, Description: "Zzzzzz.... coins.... Clicking earns 2% of your coins per second!", Requirements: {Stats: {CoinsPc: 8}}},
        PayRaise = {Name: "Pay Raises", Cost: 120000, StructName: "Business", Description: "Increase worker morale by incorporating pay raises. Businesses are twice as efficient!", Requirements: {Structures: {Business: 10}}},
        Quantum = {Name: "Quantum Mechanics", Cost: 400000, StructName: "Factory", Description: "627% more efficient than conventional electricity... Factories are twice as efficient!", Requirements: {Structures: {Factory: 10}}},
        EightBallClick2 = {Name: "8-Ball Click Mk2", Cost: 88888, CoinsPcPs: 0.03, Description: "Yeah, that's right; ask your personal 8-Ball for another coin related wish. This is your last... Clicking earns 3% of your coins per second!", Requirements: {Stats: {CoinsPcPs: 0.02}}},
        BronzeFortune = {Name: "Bronze Fortune", Cost: 25000, CoinsPsMult: 0.1, Description: "Not the best, but better than nothing. Gives 10% production multiplier."},
        PlatinumPickaxe = {Name: "Platinum Pickaxe", Cost: 15000, StructName: "Miner", Description: "Upgrade pickaxes from Gold to Platinum. (Please tell me how this is efficient...) Miners are twice as efficient!", Requirements: {Structures: {Miner: 25}}},
        SteelMouse = {Name: "Steel Mouse", Cost: 9001, StructName: "Clicker", Description: "Clink clink clink... Clickers are twice as efficient!", Requirements: {Structures: {Clicker: 25}}},
        Crypt = {Name: "Crypto", Cost: 33000, StructName: "Trader", Description: "Yeah. Now these deals make even more sense. Totally. Traders are twice as efficient!", Requirements: {Structures: {Trader: 25}}},
        CoinApprovedClick = {Name: "Coin-Approved Click", Cost: 150000, CoinsPc: 12, Multiply: true, Description: "The name speaks for itself. Base coins per click is multiplied by 12.", Requirements: {Stats: {CoinsPc: 8}}},
        SuperFullTime = {Name: "Super Full-Time", Cost: 400000, StructName: "Business", Description: "So workers thought full-time was a lot? You say: Nah. Businesses are twice as efficient!", Requirements: {Structures: {Business: 25}}},
        Nuclear = {Name: "Nuclear Mechanics", Cost: 1000000, StructName: "Factory", Description: "Radioactive. Factories are twice as efficient!", Requirements: {Structures: {Factory: 25}}},
        SilverFortune = {Name: "Silver Fortune", Cost: 1000000, CoinsPsMult: 0.15, Description: "'Second is the best' Gives 15% production multiplier.", Requirements: {Stats: {CoinsPsMult: 1.1}}},
        EightSquared = {Name: "8^2", Cost: 900000, StructName: "8-Ball", Description: "8 squared is 64! 8-Balls are twice as efficient!", Requirements: {Structures: {["8-Ball"]: 1}}},
        EightCubed = {Name: "8^3", Cost: 4000000, StructName: "8-Ball", Description: "8 cubed is 512! 8-Balls are twice as efficient!", Requirements: {Structures: {["8-Ball"]: 10}}},
        Investors = {Name: "Investors", Cost: 2000000, StructName: "Currency", Description: "Get top of the line investors to well.. endorse coins! Currencies are twice as efficient!", Requirements: {Structures: {Currency: 1}}},
        Supercharged = {Name: "Supercharged", Cost: 6000000, StructName: "Research Facility", Description: "Supercharged SCIENCE! Research Facilities are twice as efficient!", Requirements: {Structures: {["Research Facility"]: 1}}},
        GoldFortune = {Name: "Gold Fortune", Cost: 24000000, CoinsPsMult: 0.25, Description: "Well we all SHIIIIIINE onnnnn! Gives 25% production multiplier.", Requirements: {Stats: {CoinsPsMult: 1.25}}},
        PlatinumFortune = {Name: "Platinum Fortune", Cost: 400000000, CoinsPsMult: 0.5, Description: "Technically white gold... Actually, probably not. Gives 50% production multiplier.", Requirements: {Stats: {CoinsPsMult: 1.5}}},
        DiamondFortune = {Name: "Diamond Fortune", Cost: 9000000001, CoinsPsMult: 1, Description: "Didn't think you'd get this far, so here, take this! Gives 100% production multiplier.", Requirements: {Stats: {CoinsPsMult: 2}}},
        BrandEndorse = {Name: "Brand Endorsements", Cost: 16000000, StructName: "Currency", Description: "Why have investors endorse your coins when you can have brands do the same? Currencies are twice as efficient!", Requirements: {Structures: {Currency: 10}}},
        DiamondPickaxe = {Name: "Diamond Pickaxe", Cost: 400000, StructName: "Miner", Description: "Upgrade pickaxes from Platinum to Diamond. MINING AWAY... Miners are twice as efficient!", Requirements: {Structures: {Miner: 50}}},
        ObsidianMouse = {Name: "Obsidian Mouse", Cost: 54000, StructName: "Clicker", Description: "Clonck clonck clonck... Patience is all you need... Clickers are twice as efficient!", Requirements: {Structures: {Clicker: 50}}},
        Collaboration = {Name: "Collaboration", Cost: 12000000, StructName: "Trader", OtherBoosts: {Currency: 2}, Description: "Well, judging by the amount of Traders you've acquired and the price of this upgrade... We'd just assume that you have a currency going. Why not collaborate! Traders and Currencies are twice as efficient!", Requirements: {Structures: {Trader: 50, Currency: 1}}},
        SuperUnion = {Name: "Super Union", Cost: 9900000, StructName: "Business", Description: "A union that is pro-working Super Full-Time hours! Businesses are twice as efficient!", Requirements: {Structures: {Business: 50}}},
        Atomic = {Name: "Atomic Mechanics", Cost: 26000000, StructName: "Factory", Description: "ATOMIC. Factories are twice as efficient!", Requirements: {Structures: {Factory: 50}}},
        YeahScience = {Name: "YEAH SCIENCE!", Cost: 52000000, StructName: "Research Facility", Description: "Just go berzerk with your science. Research Facilities are twice as efficient!", Requirements: {Structures: {["Research Facility"]: 10}}},
        Optimization = {Name: "Optimization", Cost: 168000000, StructName: "Matter Refiner", Description: "Make some absurdly expensive optimizations to your Matter Refiners for 'maximum' coin output. Matter Refiners are twice as efficient!", Requirements: {Structures: {["Matter Refiner"]: 1}}},
        AdvancedPrograms = {Name: "Advanced Programs", Cost: 2140000000, StructName: "The Matrix", Description: "Get your tech gurus from the Research Facilities and in the Matrix to design better programs for COINS... And Only COINS... The Matrixes are twice as efficient!", Requirements: {Structures: {["The Matrix"]: 1}}},
        UniversalDevotion = {Name: "Universal Devotion", Cost: 192000000, StructName: "Currency", Description: "Ensure your coin currencies have become universally adopted. Currencies are twice as efficient!", Requirements: {Structures: {Currency: 25}}},
        WhatComesAfterEightCubed = {Name: "What comes after 8^3", Cost: 44000000, StructName: "8-Ball", Description: "8^4 is 4096! 8-Balls are twice as efficient!", Requirements: {Structures: {["8-Ball"]: 25}}},
        CoolerNumber = {Name: "Cooler Number", Cost: 204800000, StructName: "8-Ball", Description: "8^5 is 32768! Cool, right? I don't know what this has to do with 8-Balls. Just don't sink my cue. 8-Balls are twice as efficient!", Requirements: {Structures: {["8-Ball"]: 50}}},
        MiningCompany = {Name: "Mining Company", Cost: 240000, StructName: "Business", OtherBoosts: {Miner: 4}, Description: "Starting a mining company kills two birds with one stone. Businesses are twice as efficient, Miners are 4 times as efficient!", Requirements: {Structures: {Miner: 25, Business: 10}}},
        Condensers = {Name: "Condensers", Cost: 1048000000, StructName: "Matter Refiner", Description: "Condense management of refinement for more streamlined coin production. Matter Refiners are twice as efficient.", Requirements: {Structures: {["Matter Refiner"]: 10}}},
        TitaniumMouse = {Name: "Titanium Mouse", Cost: 480000, StructName: "Clicker", Description: "A material perfect for endless rapid clicking. Clickers are twice as efficient.", Requirements: {Structures: {Clicker: 100}}},
        BloodstonePickaxe = {Name: "Bloodstone Pickaxe", Cost: 2100000, StructName: "Miner", Description: "Upgrade pickaxes from Diamond to Bloodstone, a very very hard material harvested from the depths of the underworld beating out the power of even diamonds. Miners are twice as efficient.", Requirements: {Structures: {Miner: 100}}},
        TheTruth = {Name: "The Truth", Cost: 10200000000, StructName: "The Matrix", Description: "All I can offer is the truth about coins. Nothing more. The Matrixes are twice as efficient!", Requirements: {Structures: {["The Matrix"]: 10}}},
        HandsOnHeadsOn = {Name: "Hands on, Heads on.", Cost: 240000000, StructName: "Research Facility", Description: "Name explains it completely. Research Facilities are twice as efficient!", Requirements: {Structures: {["Research Facility"]: 25}}},
        Superscience = {Name: "Superscience", Cost: 1600000000, StructName: "Research Facility", Description: "Extremely fast science. No need to distract others with YEAH SCIENCE!", Requirements: {Structures: {["Research Facility"]: 50}}},
        LearningProgress = {Name: "Learning Progress", Cost: 1200000000, StructName: "Matter Refiner", OtherBoosts: {["Research Facility"]: 2}, Description: "You know what they say, practice makes perfect. Research Facilities and Matter Refiners are twice as efficient.", Requirements: {Structures: {["Matter Refiner"]: 5, ["Research Facility"]: 10}}},
        Industrialization = {Name: "Industrialization", Cost: 2900000000, StructName: "Matter Refiner", OtherBoosts: {["Factory"] : 8}, Description: "Incorporate Matter Refiners into Factories. Matter Refiners are twice as efficient, Factories are 8 times as efficient!", Requirements: {Structures: {["Matter Refiner"]: 10, Factory: 50}}},
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
                Ps: data.CoinsPs,
                Mult: 1
            }
        }
        else {
            const amt = stats.Structures[data.Name].Amount
            if (amt > 0) {
                for (let i = 0; (i < amt); i++) {
                    data.Cost = Math.floor((data.Cost * 1.1))
                }
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
    stats.Coins += (stats.CoinsPc + stats.CoinsMPc)
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
    stats.Coins += ((stats.CoinsPs * stats.CoinsPsMult) / fps)
    refresh()
}, fps)
setInterval(_=> {
    save()
}, 30000)

setTimeout(load, 1000)
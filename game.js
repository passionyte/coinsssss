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
    Purchased: {},
    Structures: {}
}

const items = {
    structures: [
        Clicker = {Name: "Clicker", Cost: 15, CoinsPs: 0.1, Description: "Click click click"},
        Miner = {Name: "Miner", Cost: 100, CoinsPs: 1, Description: "Hire a miner to mine more coins"},
        Trader = {Name: "Trader", Cost: 500, CoinsPs: 3, Description: "Hire a 'Professional' coin trader to make more coins"}
    ],
    upgrades: [
        DoubleClick = {Name: "Double Click", Cost: 100, CoinsPc: 1, Description: "Doubles your coins per click"},
        WoodMouse = {Name: "Wood Mouse", Cost: 200, StructName: "Clicker", StructMult: 2, CoinsPs: 0, Description: "Clank clank clank... Clickers are twice as efficient"},
        TripleClick = {Name: "Triple Click", Cost: 500, CoinsPc: 1, Description: "Increases your coins per click to 3"},
        IronPickaxe = {Name: "Iron Pickaxe", Cost: 2000, StructName: "Miner", StructMult: 2, CoinsPs: 0, Description: "Upgrade the pickaxe from Stone to Iron. Miners are twice as efficient"}
    ]
}

// Functions

function refresh() {
    clicks.innerText = `${Math.round(stats.Coins)} coins`
    prod.innerText = `${stats.CoinsPs} coins/s`
}

function load() {
    document.getElementById("loading").hidden = true
    document.getElementById("main").hidden = false
    document.getElementById("main2").hidden = false

    // Data

    for (const structure in items.structures) {
        const data = items.structures[structure]

        if (!stats.Structures[data.Name]) {
            stats.Structures[data.Name] = {
                Amount: 0,
                Ps: data.CoinsPs
            }
        }
    }
}

function save() {
    
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

function shop(type) {
    if (type) {
        const list = items[type]

        if (list) {
            itemlist.innerHTML = null
    
            for (const item in list) {
                const data = list[item]

                if (!data.Hidden && (type == "structures" || !find(stats.Purchased, data.Name)) && data.Cost) {
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
                                        sdata.Ps *= data.StructMult
                                    }
                                    else {
                                        if (type == "structures" && buff == "CoinsPs") {
                                            stats[buff] += stats.Structures[data.Name].Ps
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
    stats.Coins += stats.CoinsPs
    refresh()
}, 1000)

load()
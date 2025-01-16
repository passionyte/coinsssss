// Written by Passionyte

// Elements

const bigbutton = document.getElementById("bigbutton")
const clicks = document.getElementById("clicks")
const itemlist = document.getElementById("items")
const itemdummy = document.getElementById("itemdummy")
const structb = document.getElementById("structures")
const upgb = document.getElementById("upgrades")

// Variables

let stats = {
    Coins: 0,
    CoinsPs: 0,
    CoinsPc: 1,
    Purchased: []
}

const items = {
    structures: [
        Clicker = {Name: "Clicker", Cost: 15, CoinsPs: 0.1, Description: "Click click click"}
    ],
    upgrades: [
        DoubleClick = {Name: "Double Click", Cost: 100, CoinsPc: 1, Description: "Doubles your coins per click"}
    ]
}

// Functions

function load() {
    console.log("Hello!")
    document.getElementById("loading").hidden = true
    document.getElementById("main").hidden = false
    document.getElementById("main2").hidden = false
}
// setTimeout(1, load)
load()

function save() {
    
}

function shop(type) {
    const list = items[type]

    if (list) {
        itemlist.innerHTML = null

        for (const item in list) {
            const data = list[item]

            if (!data.Hidden && !stats.Purchased[item] && data.Cost) {
                let clone = itemdummy.cloneNode(true)
                const c = clone.children

                c[0].src = data.Icon || ""
                c[1].innerText = data.Name || "No name"
                c[2].innerText = data.Description || "No description"

                const button = c[3]
                button.innerText = `Purchase for ${data.Cost} coins`
                button.addEventListener("click", _=> {
                    if (stats.Coins >= data.Cost) {
                        stats.Coins -= data.Cost
                        stats.Purchased.push(item)

                        for (const buff in data) {
                            let stat = stats[buff]

                            if (stat) {
                                if (data.Multiply) {
                                    stat *= data[buff]
                                }
                                else {
                                    stat += data[buff]
                                }
                            }
                        }
                    }
                })

                clone.hidden = false
                itemlist.appendChild(clone)
            }
        }
    }
}

// Listeners

bigbutton.addEventListener("click", _ => {
    stats.Coins += stats.CoinsPc
    clicks.innerText = `${stats.Coins} coins`
})

structb.addEventListener("click", _ => {
    shop("structures")
})

upgb.addEventListener("click", _ => {
    shop("upgrades")
})
export const debug = false // Is game in debug mode
export const fps = 30 // 'Frame rate' for ticks

export const blank = { // Blank save file (for rebirths, etc.)
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

export const fancynames = { // Any string you want to look fancy
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

export const settings = {
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

export const abbrs = { // Number abbreviations
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

export default { blank }
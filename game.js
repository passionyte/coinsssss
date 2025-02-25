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
   Purchased: {},
   Structures: {},
   Achievements: {},
   Settings: {}
}
let loaded = false
let savecd = false
let menuopen
let shopopen
let menurf
let coinmpos

const version = "0.04_2 Alpha"
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
       Planet = {Name: "Planet", Cost: 256000000, CoinsPs: 200000, Description: "Why rely on mere objects when you can just create new planets filled to the brim with coins?"},
       Matrix = {Name: "The Matrix", Cost: 6000000000, CoinsPs: 1999000, Description: "Didn't see this coming, did you? Now choose a coin... red or blue..."},
       Atomizer = {Name: "Atomizer", Cost: 300000000000, CoinsPs: 44000000, Description: "A massive advancement over the Matter Refiners, Atomizers can bend literally anything, Matrix or not, into millions of coins."}
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
       DreamersClick = {Name: "Dreamer's Click", Cost: 150000, CoinsPcPs: 0.02, Description: "Zzzzzz.... coins.... Clicking earns 2% of your coins per second!", Requirements: {Stats: {CoinsPc: 8}}},
       PayRaise = {Name: "Pay Raises", Cost: 120000, StructName: "Business", Description: "Increase worker morale by incorporating pay raises. Businesses are twice as efficient!", Requirements: {Structures: {Business: 10}}},
       Quantum = {Name: "Quantum Mechanics", Cost: 400000, StructName: "Factory", Description: "627% more efficient than conventional electricity... Factories are twice as efficient!", Requirements: {Structures: {Factory: 10}}},
       EightBallClick2 = {Name: "8-Ball Click Mk2", Cost: 888888, CoinsPcPs: 0.03, Description: "Yeah, that's right; ask your personal 8-Ball for another coin related wish. This is your last... Clicking earns 3% of your coins per second!", Requirements: {Stats: {CoinsPcPs: 0.02}}},
       BronzeFortune = {Name: "Bronze Fortune", Cost: 25000, CoinsPsMult: 0.1, Description: "Not the best, but better than nothing. Gives 10% production multiplier."},
       PlatinumPickaxe = {Name: "Platinum Pickaxe", Cost: 15000, StructName: "Miner", Description: "Upgrade pickaxes from Gold to Platinum. (Please tell me how this is efficient...) Miners are twice as efficient!", Requirements: {Structures: {Miner: 25}}},
       SteelMouse = {Name: "Steel Mouse", Cost: 9001, StructName: "Clicker", Description: "Clink clink clink... Clickers are twice as efficient!", Requirements: {Structures: {Clicker: 25}}},
       Crypt = {Name: "Crypto", Cost: 33000, StructName: "Trader", Description: "Yeah. Now these deals make even more sense. Totally. Traders are twice as efficient!", Requirements: {Structures: {Trader: 25}}},
       CoinApprovedClick = {Name: "Coin-Approved Click", Cost: 20000, CoinsPc: 12, Multiply: true, Description: "The name speaks for itself. Base coins per click is multiplied by 12.", Requirements: {Stats: {CoinsPc: 8}}},
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
       ObsidianMouse = {Name: "Obsidian Mouse", Cost: 104000, StructName: "Clicker", Description: "Clonck clonck clonck... Patience is all you need... Clickers are twice as efficient!", Requirements: {Structures: {Clicker: 50}}},
       Collaboration = {Name: "Collaboration", Cost: 12000000, StructName: "Trader", OtherBoosts: {Currency: 2}, Description: "Well, judging by the amount of Traders you've acquired and the price of this upgrade... We'd just assume that you have a currency going. Why not collaborate! Traders and Currencies are twice as efficient!", Requirements: {Structures: {Trader: 50, Currency: 1}}},
       SuperUnion = {Name: "Super Union", Cost: 9900000, StructName: "Business", Description: "A union that is pro-working Super Full-Time hours! Businesses are twice as efficient!", Requirements: {Structures: {Business: 50}}},
       Atomic = {Name: "Atomic Mechanics", Cost: 26000000, StructName: "Factory", Description: "ATOMIC. Factories are twice as efficient!", Requirements: {Structures: {Factory: 50}}},
       YeahScience = {Name: "YEAH SCIENCE!", Cost: 52000000, StructName: "Research Facility", Description: "Just go berzerk with your science. Research Facilities are twice as efficient!", Requirements: {Structures: {["Research Facility"]: 10}}},
       Optimization = {Name: "Optimization", Cost: 168000000, StructName: "Matter Refiner", Description: "Make some absurdly expensive optimizations to your Matter Refiners for 'maximum' coin output. Matter Refiners are twice as efficient!", Requirements: {Structures: {["Matter Refiner"]: 1}}},
       AdvancedPrograms = {Name: "Advanced Programs", Cost: 21400000000, StructName: "The Matrix", Description: "Get your tech gurus from the Research Facilities and in the Matrix to design better programs for COINS... And Only COINS... The Matrixes are twice as efficient!", Requirements: {Structures: {["The Matrix"]: 1}}},
       UniversalDevotion = {Name: "Universal Devotion", Cost: 192000000, StructName: "Currency", Description: "Ensure your coin currencies have become universally adopted. Currencies are twice as efficient!", Requirements: {Structures: {Currency: 25}}},
       WhatComesAfterEightCubed = {Name: "What comes after 8^3", Cost: 44000000, StructName: "8-Ball", Description: "8^4 is 4096! 8-Balls are twice as efficient!", Requirements: {Structures: {["8-Ball"]: 25}}},
       CoolerNumber = {Name: "Cooler Number", Cost: 204800000, StructName: "8-Ball", Description: "8^5 is 32768! Cool, right? I don't know what this has to do with 8-Balls. Just don't sink my cue. 8-Balls are twice as efficient!", Requirements: {Structures: {["8-Ball"]: 50}}},
       MiningCompany = {Name: "Mining Company", Cost: 240000, StructName: "Business", OtherBoosts: {Miner: 4}, Description: "Starting a mining company kills two birds with one stone. Businesses are twice as efficient, Miners are 4 times as efficient!", Requirements: {Structures: {Miner: 25, Business: 10}}},
       Condensers = {Name: "Condensers", Cost: 1048000000, StructName: "Matter Refiner", Description: "Condense management of refinement for more streamlined coin production. Matter Refiners are twice as efficient.", Requirements: {Structures: {["Matter Refiner"]: 10}}},
       TitaniumMouse = {Name: "Titanium Mouse", Cost: 4800000, StructName: "Clicker", Description: "A material perfect for endless rapid clicking. Clickers are twice as efficient.", Requirements: {Structures: {Clicker: 100}}},
       BloodstonePickaxe = {Name: "Bloodstone Pickaxe", Cost: 2100000, StructName: "Miner", Description: "Upgrade pickaxes from Diamond to Bloodstone, a very very hard material harvested from the depths of the underworld beating out the power of even diamonds. Miners are twice as efficient.", Requirements: {Structures: {Miner: 100}}},
       TheTruth = {Name: "The Truth", Cost: 92000000000, StructName: "The Matrix", Description: "All I can offer is the truth about coins. Nothing more. The Matrixes are twice as efficient!", Requirements: {Structures: {["The Matrix"]: 10}}},
       HandsOnHeadsOn = {Name: "Hands on, Heads on.", Cost: 240000000, StructName: "Research Facility", Description: "Name explains it completely. Research Facilities are twice as efficient!", Requirements: {Structures: {["Research Facility"]: 25}}},
       Superscience = {Name: "Superscience", Cost: 1600000000, StructName: "Research Facility", Description: "Extremely fast science. No need to distract others with YEAH SCIENCE! Research Facilities are twice as efficient!", Requirements: {Structures: {["Research Facility"]: 50}}},
       LearningProgress = {Name: "Learning Progress", Cost: 1200000000, StructName: "Matter Refiner", OtherBoosts: {["Research Facility"]: 2}, Description: "You know what they say, practice makes perfect. Research Facilities and Matter Refiners are twice as efficient.", Requirements: {Structures: {["Matter Refiner"]: 5, ["Research Facility"]: 10}}},
       Industrialization = {Name: "Industrialization", Cost: 2900000000, StructName: "Matter Refiner", OtherBoosts: {Factory : 8}, Description: "Incorporate Matter Refiners into Factories. Matter Refiners are twice as efficient, Factories are 8 times as efficient!", Requirements: {Structures: {["Matter Refiner"]: 10, Factory: 50}}},
       DevilsClick = {Name: "Devil's Click", Cost: 6666666, CoinsPc: 666, Multiply: true, Description: "The pure opposite of God's click. Base coins per click is multiplied by 666.", Requirements: {Stats: {CoinsPc: 96}}},
       GodsClick = {Name: "God's Click", Cost: 21000000, CoinsPcPs: 0.05, Description: "Now this, this is holy. And also expensive. Clicking earns 5% of your coins per second!", Requirements: {Stats: {CoinsPcPs: 0.05}}},
       PureGenius = {Name: "Pure Genius", Cost: 8000000000, StructName: "Research Facility", Description: "Extremely smart science. Research Facilities are twice as efficient!", Requirements: {Structures: {["Research Facility"]: 100}}},
       KeepingBusy = {Name: "Keeping Busy", Cost: 81000000, StructName: "Business", Description: "Just always be busy... Must be robot workers. Businesses are twice as efficient!", Requirements: {Structures: {Business: 100}}},
       Uber = {Name: "Uber Mechanics", Cost: 200000000, StructName: "Factory", Description: "UBER. Factories are twice as efficient!", Requirements: {Structures: {Factory: 100}}},
       BigBang = {Name: "The Big Bang", Cost: 10000000000, StructName: "Matter Refiner", Description: "Recreating the big bang to produce and refine universes for coins is GENIUS! Matter Refiners are twice as efficient.", Requirements: {Structures: {["Matter Refiner"]: 25}}},
       Blackholes = {Name: "Blackholes", Cost: 39600000000, StructName: "Matter Refiner", Description: "Pure bliss. File not found. Matter Refiners are twice as efficient.", Requirements: {Structures: {["Matter Refiner"]: 50}}},
       Superball = {Name: "Superball", Cost: 8888888888, StructName: "8-Ball", StructMult: 8, Description: "EIGHT! BOING! BOING! BOING! BOING! BOING! BOING! BOING! BOING! 8-Balls are 8 times as efficient!", Requirements: {Structures: {["8-Ball"]: 100}}},
       BloodstoneFortune = {Name: "Bloodstone Fortune", Cost: 96666666666, CoinsPsMult: 2, Description: "Well, wouldn't ruby be better? Whatever. Gives 200% production multiplier.", Requirements: {Stats: {CoinsPsMult: 3}}},
       LackOfIdeas = {Name: "Lack of Ideas", Cost: 781000000, StructName: "Currency", OtherBoosts: {Trader: 2}, Description: "Yeah, you heard me. But you can turn a lack of ideas into an idea! Profit!!! Traders and Currencies are twice as efficient!", Requirements: {Structures: {Currency: 50}}},
       BrainAge = {Name: "Brain Age", Cost: 95000000, StructName: "Trader", Description: "Training your brain every day will give you better scamming skills. Traders are twice as efficient!", Requirements: {Structures: {Trader: 100}}},
       Executives = {Name: "Executives", Cost: 2640000000, StructName: "Currency", OtherBoosts: {Trader: 4}, Description: "Turn the most senior of your Traders whom you are collaborating with into Executives for maximum corporative efficiency. Traders are 4 times as efficient, Currencies are twice as efficient!", Requirements: {Structures: {Currency: 100}}},
       Ultrascience = {Name: "Ultrascience", Cost: 7500000000, StructName: "Research Facility", Description: "Ultrascience > Superscience. Research Facilities are twice as efficient!", Requirements: {Structures: {["Research Facility"]: 200}}},
       AdvancedAdapter = {Name: "Advanced Adapter", Cost: 133700000, StructName: "Research Facility", OtherBoosts: {Clicker: 1337}, Description: "This extremely advanced adapter makes Clickers competent! Research Facilities are twice as efficient, Clickers are 1337 times as efficient!", Requirements: {Structures: {["Research Facility"]: 5, Clicker: 100}}},
       MoonstoneMouse = {Name: "Moonstone Mouse", Cost: 55000000, StructName: "Clicker", Description: "I'm gonna steal the MOOOOOON...stone. Clickers are twice as efficient!", Requirements: {Structures: {Clicker: 200}}},
       AntimatterSupport = {Name: "Antimatter Support", Cost: 100000000000, StructName: "Matter Refiner", Description: "Your Research Facilities can truly accomplish anything huh? Matter Refiners are twice as efficient.", Requirements: {Structures: {["Matter Refiner"]: 100}}},
       PalladiumPickaxe = {Name: "Palladium Pickaxe", Cost: 190000000, StructName: "Miner", Description: "Upgrade pickaxes from Bloodstone to Palladium, an extremely rare and absurdly expensive mineral forged from fragments of meteors and the Earth's core. Miners are twice as efficient.", Requirements: {Structures: {Miner: 200}}},
       ArtificialIntelligence = {Name: "A.I.", Cost: 820000000, StructName: "Trader", Description: "What's the point of relying on stupid human brains for scamming? Traders are twice as efficient!", Requirements: {Structures: {Trader: 200}}},
       CoinLanding = {Name: "Coin Landing", Cost: 600000000, StructName: "Planet", Description: "Fake landing on your own planet! Planets are twice as efficient!", Requirements: {Structures: {Planet: 1}}},
       TotalExcavation = {Name: "Total Excavation", Cost: 3650000000, StructName: "Planet", Description: "'We care about nature', they say as they rip apart planets... Planets are twice as efficient!", Requirements: {Structures: {Planet: 10}}},
       CoolDiscoveries = {Name: "Cool Discoveries", Cost: 9400000000, StructName: "Planet", Description: "COOOOOL!!!!! Planets are twice as efficient!", Requirements: {Structures: {Planet: 25}}},
       PlanetaryMutations = {Name: "Planetary Mutations", Cost: 20000000000, StructName: "Planet", Description: "Two planets mutated into one?! Well this is weird! Planets are twice as efficient!", Requirements: {Structures: {Planet: 50}}},
       RefiningTheUnknown = {Name: "Refining The Unknown", Cost: 25000000000, StructName: "Planet", OtherBoosts: {["Matter Refiner"]: 2}, Description: "Great idea to refine things you haven't even fully evaluated yet... Planets and Matter Refiners are twice as efficient!", Requirements: {Structures: {Planet: 10, ["Research Facility"]: 25}}},
       MEGAPlanets = {Name: "MEGA Planets", Cost: 64000000000, StructName: "Planet", Description: "MEGA Planets for a MEGA price! Planets are twice as efficient!", Requirements: {Structures: {Planet: 100}}},
       PalladiumFortune = {Name: "Palladium Fortune", Cost: 562000000000, CoinsPsMult: 2.5, Description: "Can we get much higher, higher... Gives 250% production multiplier.", Requirements: {Stats: {CoinsPsMult: 5}}},
       UnstableEconomy = {Name: "Unstable Economy", Cost: 500000000, StructName: "Business", OtherBoosts: {Currency: 2, Trader: 2}, Description: "Name explains it in whole... Businesses, Traders and Currencies are twice as efficient!", Requirements: {Structures: {Business: 200, Trader: 1, Currency: 1}}},
       GalacticDuplication = {Name: "Galactic Duplication", Cost: 200000000000, StructName: "The Matrix", OtherBoosts: {Planet: 2}, Description: "You know, a lot of the upgrade names in this game are pretty straight forward so I don't usually need to make a large description but I do anyway because... I don't know. The Matrixes and Planets are twice as efficient!", Requirements: {Structures: {["The Matrix"]: 25, Planet: 50}}},
       JoiningTeams = {Name: "Joining Teams", Cost: 330000000, StructName: "Business", StructMult: 16, OtherBoosts: {["Research Facility"]: 2}, Description: "Joining your Research Facilities and Businesses under the same umbrella will likely help massively for collaboration! Businesses are 16 times as efficient, Research Facilities are twice as efficient!", Requirements: {Structures: {Business: 100, ["Research Facility"]: 25}}},
       MillionDollarClick = {Name: "Million Dollar Click", Cost: 250000000, CoinsPc: 16, Multiply: true, Description: "You're a millionaire! You already were. Base coins per click is multiplied by 16.", Requirements: {Stats: {CoinsPc: 63936}}},
       Ultraclick = {Name: "Ultraclick", Cost: 35143748521, CoinsPcPs: 0.07, Description: "It's like the mouse variant of the Ultrascience upgrade. Clicking earns 7% of your coins per second!", Requirements: {Stats: {CoinsPcPs: 0.1}}},
       ImaginationIsReality = {Name: "Imagination Is Reality", Cost: 1000000000000, StructName: "The Matrix", Description: "The Matrix makes anything seem like reality. Even an absurd amount of coins. Anything you wish. The Matrixes are twice as efficient!", Requirements: {Structures: {["The Matrix"]: 50}}},
       EternalCoins = {Name: "Eternal Coins", Cost: 21300000000000, StructName: "The Matrix", Description: "The Matrix makes anything eternal. Even your prized coins, just for an ungodly cost. The Matrixes are twice as efficient!", Requirements: {Structures: {["The Matrix"]: 100}}},
       MaxedOutCoins = {Name: "Maxed Out Coins", Cost: 2147483648, CoinsPc: 32, Multiply: true, Description: "The cost is as much as the 32 bit limit! Base coins per click is multiplied by 32.", Requirements: {Stats: {CoinsPc: 1022976}}},
       AtomicImplementation = {Name: "Atomic Implementation", Cost: 1600000000000, StructName: "Atomizer", Description: "You're telling me you have found the solution to turning atoms into coins but you are still using Nuclear mechanics??? Come on now... Atomizers are twice as efficient!", Requirements: {Structures: {Atomizer: 1}}},
       PureDuplication = {Name: "Pure Duplication", Cost: 14000000000000, StructName: "Atomizer", Description: "Pure optimization allows for pure duplication. Atomizers are twice as efficient!", Requirements: {Structures: {Atomizer: 10}}},
    ],
   achievements: [
        FirstCoin = {Name: "First Coin", Description: "Your first coin of hundreds, thousands, millions... hopefully.", Type: "Stat", Requirements: {TotalCoins: 1}},
        StackOCoins = {Name: "Stack o' Coins", Description: "You know, 100 is a lot!!!... not.", Type: "Stat", Requirements: {TotalCoins: 100}},
        FirstThousand = {Name: "First Thousand", Description: "Did you know, 1000 is also 1e3?", Type: "Stat", Requirements: {TotalCoins: 100}},
        Millionaire = {Name: "Millionaire", Description: "If I had a million coins, I'd be rich.", Type: "Stat", Requirements: {TotalCoins: 1000000}},
        Billionaire = {Name: "Billionaire", Description: "Now that is kinda crazy! You've really made it!", Type: "Stat", Requirements: {TotalCoins: 1000000000}},
        Trillionaire = {Name: "Trillionaire", Description: "You should stop playing now...", Type: "Stat", Requirements: {TotalCoins: 1000000000000}},
        AMintASecond = {Name: "A Mint A Second", Description: "Every second: [Insert coin sound effect here] [1 cps]", Type: "Stat", Requirements: {CoinsPs: 1}},
        CoinFlow = {Name: "Coin Flow", Description: "Sweet!!! [10 cps]", Type: "Stat", Requirements: {CoinsPs: 10}},
        ADollarASecond = {Name: "A Dollar A Second", Description: "1 coin = 1 cent, 100 coins = 100 cents = 1 dollar [100 cps]", Type: "Stat", Requirements: {CoinsPs: 100}},
        IndustryStandard = {Name: "Industry Standard", Description: "Pretty much a legitimate production line of coins! [1K cps]", Type: "Stat", Requirements: {CoinsPs: 1000}},
        Insanity = {Name: "Insanity", Description: "You're insane. You should stop playing... [1M cps]", Type: "Stat", Requirements: {CoinsPs: 1000000}},
        GalacticProduction = {Name: "Galactic Production", Description: "Endless amounts of coins... You have truly realized they are infinite now. [1B cps]", Type: "Stat", Requirements: {CoinsPs: 1000000000}}
   ]
}
const fancynames = { // Any string you want to look fancy
   CoinsPs: "Coins per sec.",
   CoinsPsMult: "Coins per sec. multiplier",
   CoinsPc: "Coins per click",
   CoinsPcPs: "Coins per click (% of PS)",
   CoinsMPc: "Coins per click PS bonus",
   TotalCoins: "Total coins"
}
const settings = {
   // Function button types
   ["Reset game"]: function() {
       if (confirm("Are you sure you want to reset your game?")) {
           localStorage.clear()
           location.reload()
       }
   },
   ["Save game"]: function() {
       save()
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
   [1e15]: "quadrillion",
   [1e12]: "trillion",
   [1e9]: "billion",
   [1e6]: "million",
}

// Functions

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

   return largest && `${smartround((x / largest))} ${abbrs[largest]}`|| x
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
   prod.innerText = `${abbreviate(smartround(stats.CoinsPs * stats.CoinsPsMult))} coins/s`

   if (stats.Settings["Dynamic site title"]) {
       document.title = `${coins} coins - Passionyte's Coinsssss!`
   }
   else {
       document.title = "Passionyte's Coinsssss!"
   }
}

function effect(type, args) {
   if (!stats.Settings[`${type} effects`]) {
        return
   }

   if (type == "Text") {
       const text = document.getElementById("textdummy").cloneNode()

       const st = text.style
       let y
       let pc = false
       if (args.click) {
            text.innerText = `+${abbreviate(smartround((stats.CoinsPc + stats.CoinsMPc)))}`
            y = (coinmpos.y + randInt(-48, 48))
            st.left = ((coinmpos.x - 24) + randInt(-32, 32))+'px'
            st.top = y+'px'
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
               for (let i = 0; (i < amt); i++) {
                   data.Cost = Math.floor((data.Cost * 1.1))
               }
           }
       }
   }

   for (const nm in settings) {
       const def = settings[nm]

       if (typeof(def) != "function" && (stats.Settings[nm] == null)) {
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
       setInterval(_=> {
           save()
       }, 30000)
   }
}

function save() {
   if (stats.Coins > 0 && loaded && !savecd) {
       localStorage.setItem("Data", JSON.stringify(stats))
       savecd = true
       setTimeout(_ => {
           savecd = false
       }, 15000)
       effect("Text", {lifetime: 3, position: {x: 40, y: 75, pc: true}, text: "Saved game"})
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
                           c[1].innerText = `${data.Name} - ${stats.Structures[data.Name].Amount}`|| "???"
                       }
                       else {
                           c[1].innerText = data.Name || "???"
                       }
                       c[2].innerText = data.Description || "???"
      
                       const button = c[3]
                       button.innerText = `Purchase for ${abbreviate(data.Cost)} coins`
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

   for (const stat in stats) {
       const me = stats[stat]

       if (typeof(me) == "number") {
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
        c[2].innerText = findfromiv(items.achievements, "Name", acv).Description

        entry.style.display = "block"
        aui.appendChild(entry)
    }
}

function doSettings() {
   const ui = document.getElementById("settings")
   ui.innerHTML = null

   for (const nm in settings) {
       const set = settings[nm]

       if (typeof(set) == "function") {
           const entry = document.getElementById("buttondummy").cloneNode(true)

           const b = entry.children[0]
           b.innerText = nm
           entry.style.display = "block"
           ui.appendChild(entry)

           b.addEventListener("click", set)
       }
       else if (typeof(set) == "boolean") {
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
           const mytype = typeof(set)
           const entry = document.getElementById("inputdummy").cloneNode(true)
          
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

       if (type == "stats") {
           aui.hidden = false
           at.hidden = false
           doStats()
           menurf = setInterval(doStats, 2000)
       }
       else if (type == "settings") {
           aui.hidden = true
           at.hidden = true
           doSettings()
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
   stats.Clicks++
   refresh()
   effect("Text", {click: true, lifetime: 1})
})

bigbutton.addEventListener("mousemove", ev => {
    coinmpos = {x: ev.clientX, y: ev.clientY}
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

structb.addEventListener("click", _ => {
   shop("structures")
})

upgb.addEventListener("click", _ => {
   shop("upgrades")
})

document.getElementById("statsbutton").addEventListener("click", _ => {
   menu("stats")
})

document.getElementById("settingsbutton").addEventListener("click", _ => {
   menu("settings")
})

// Hard coded crap

document.getElementById("version").innerText = `v${version}`

for (const nm in settings) {
   const def = settings[nm]

   if (typeof(def) != "function") {
       stats.Settings[nm] = def
   }
}

setInterval(_ => {
   const x = ((stats.CoinsPs * stats.CoinsPsMult) / fps)
   stats.Coins += x
   stats.TotalCoins += x
   refresh()
}, fps)

setInterval(_ => {
    for (const acv of items.achievements) {
        if (!stats.Achievements[acv.Name]) {
            if (acv.Type == "Stat") {
                for (const req in acv.Requirements) {
                    if (stats[req] >= acv.Requirements[req]) {
                        stats.Achievements[acv.Name] = true
                        effect("Text", {lifetime: 4, position: {x: 40, y: 75, pc: true}, text: `Unlocked: ${acv.Name}!`})
                    }
                }
            }
        }
    }
}, 2000)

setTimeout(load, 1000)
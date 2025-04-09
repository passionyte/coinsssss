class Generic {
    name
    desc

    constructor(n, d) {
        this.name = n
        this.desc = d
    }
}

class Structure extends Generic {
    cost = 0
    ps = 0
    icon
    hidden

    constructor(n, d, c, p) {
        super(n, d)
        this.cost = c
        this.ps = p
    }
}

class Upgrade extends Generic {
    cost = 0
    mult = false
    icon
    hidden
    stats
    others
    reqs

    constructor(n, d, c, r, s, m, o) {
        super(n, d)
        this.cost = c
        this.reqs = r
        this.stats = s
        this.mult = m
        this.others = o
    }
}

class Achievement extends Generic {
    type
    reqs
    shadow = false

    constructor(n, d, t, r, s) {
        super(n, d)
        this.type = t
        this.reqs = r
        this.shadow = s
    }
}

export const items = {
    structures: [
        new Structure("Clicker", "Click click click...", 15, 0.1),
        new Structure("Miner", "Hire a miner to mine more coins.", 100, 1),
        new Structure("Trader", "Hire a 'Professional' coin trader to make more coins.", 800, 4),
        new Structure("Business", "Start a business to exchange goods and services for more coins.", 2000, 20),
        new Structure("Factory", "Why not build a Factory that produces coins?", 14000, 128),
        new Structure("8-Ball", "What's the point of being conventional? Start bulk buying 8-Balls for more coin wishes.", 88000, 512),
        new Structure("Currency", "Now you must mean serious business. Convince people to start paying solely in coins.", 5e5, 2800),
        new Structure("Research Facility", "Research facilities which prioritize finding new ways to make coins.", 3.2e6, 12000),
        new Structure("Matter Refiner", "Developed by your research facilities, you can now refine matter to the point where it turns into coins.", 48e6, 50000),
        new Structure("Planet", "Why rely on mere objects when you can just create new planets filled to the brim with coins?", 256000000, 2e5),
        new Structure("The Matrix", "Didn't see this coming, did you? Now choose a coin... red or blue...", 6e9, 1.999e6),
        new Structure("Atomizer", "A massive advancement over the Matter Refiners, Atomizers can bend literally anything, Matrix or not, into millions of coins.", 3e11, 4.4e7)
    ],
    upgrades: [
        new Upgrade("Double Click", "Doubles your coins per click!", 100, null, {CoinsPc: 1}),
        new Upgrade("Wood Mouse", "Clank clank clank... Clickers are twice as efficient!", 200, {Structures: {Clicker: 1}}, {Clicker: 2}, true),
        new Upgrade("Triple Click", "Increases your coins per click to 3!", 500, {Stats: {CoinsPc: 2}}, {CoinsPc: 1}),
        new Upgrade("Iron Pickaxe", "Upgrade pickaxes from Stone to Iron. Miners are twice as efficient!", 2000, {Structures: {Miner: 1}}, {Miner: 2}, true),
        new Upgrade("Quad Click", "Increases your coins per click to 4!", 1337, {Stats: {CoinsPc: 3}}, {CoinsPc: 1}),
        new Upgrade("Scamming", "Scam rich people! Traders are twice as efficient!", 7777, {Structures: {Trader: 1}}, {Trader: 2}, true),
        new Upgrade("8-Ball Click", "Magic 8 Ball... Give me more coins... Doubles your coins per click!", 8888, {Stats: {CoinsPc: 4}}, {CoinsPc: 2}, true),
        new Upgrade("Enterprise", "Surely giving your businesses a fancy name will attract more customers... Businesses are twice as efficient!", 25000, {Structures: {Business: 1}}, {Business: 2}, true),
        new Upgrade("Well-Oiled Machines", "Upgrade the machines in your factories to industry standard. Factories are twice as efficient!", 70000, {Structures: {Factory: 1}}, {Factory: 2}, true),
        new Upgrade("Stone Mouse", "Clonk clonk clonk... Clickers are twice as efficient!", 1000, {Structures: {Clicker: 10}}, {Clicker: 2}, true),
        new Upgrade("Gold Pickaxe", "Upgrade pickaxes from Iron to Gold. Must be better... right? Miners are twice as efficient!", 5000, {Structures: {Miner: 10}}, {Miner: 2}, true),
        new Upgrade("Shower Thoughts", "So... how *else* can we scam people...? Darn! Dropped the soap again! Traders are twice as efficient!", 10000, {Structures: {Trader: 10}}, {Trader: 2}, true),
        new Upgrade("Dreamer's Click", "Zzzzzz.... coins.... Clicking earns 2% of your coins per second!", 150e3, {Stats: {CoinsPc: 8}}, {CoinsPcPs: 0.02}),
        new Upgrade("Pay Raises", "Increase worker morale by incorporating pay raises. Businesses are twice as efficient!", 120e3, {Structures: {Business: 10}}, {Business: 2}, true),
        new Upgrade("Quantum Mechanics", "627% more efficient than conventional electricity... Factories are twice as efficient!", 400e3, {Structures: {Factory: 10}}, {Factory: 2}, true),
        new Upgrade("8-Ball Click Mk2", "Yeah, that's right; ask your personal 8-Ball for another coin related wish. This is your last... Clicking earns 3% of your coins per second!", 888888, {Stats: {CoinsPcPs: 0.02}}, {CoinsPcPs: 0.03}),
        new Upgrade("Bronze Fortune", "Not the best, but better than nothing. Gives 10% production multiplier.", 25000, null, {CoinsPsMult: 0.1}),
        new Upgrade("Platinum Pickaxe", "Upgrade pickaxes from Gold to Platinum. (Please tell me how this is efficient...) Miners are twice as efficient!", 1.5e4, {Structures: {Miner: 25}}, {Miner: 2}, true),
        new Upgrade("Steel Mouse", "Clink clink clink... Clickers are twice as efficient!", 9.001e3, {Structures: {Clicker: 25}}, {Clicker: 2}, true),
        new Upgrade("Crypto", "Yeah. Now these deals make even more sense. Totally. Traders are twice as efficient!", 3.3e4, {Structures: {Trader: 25}}, {Trader: 2}, true),
        new Upgrade("Coin-Approved Click", "The name speaks for itself. Base coins per click is multiplied by 12.", 2e4, {Stats: {CoinsPc: 8}}, {CoinsPc: 12}, true),
        new Upgrade("Super Full-Time", "So workers thought full-time was a lot? You say: Nah. Businesses are twice as efficient!", 4e5, {Structures: {Business: 25}}, {Business: 2}, true),
        new Upgrade("Nuclear Mechanics", "Radioactive. Factories are twice as efficient!", 1e6, {Structures: {Factory: 25}}, {Factory: 2}, true),
        new Upgrade("Silver Fortune", "'Second is the best' Gives 15% production multiplier.", 1e6, {Stats: {CoinsPsMult: 1.1}}, {CoinsPsMult: 0.15}),
        new Upgrade("8^2", "8 squared is 64! 8-Balls are twice as efficient!", 9e5, {Structures: {["8-Ball"]: 1}}, {["8-Ball"]: 2}, true),
        new Upgrade("8^3", "8 cubed is 512! 8-Balls are twice as efficient!", 4e6, {Structures: {["8-Ball"]: 10}}, {["8-Ball"]: 2}, true),
        new Upgrade("Investors", "Get top of the line investors to well.. endorse coins! Currencies are twice as efficient!", 2e6, {Structures: {Currency: 1}}, {Currency: 2}, true),
        new Upgrade("Supercharged", "Supercharged SCIENCE! Research Facilities are twice as efficient!", 6e6, {Structures: {["Research Facility"]: 1}}, {["Research Facility"]: 2}, true),
        new Upgrade("Gold Fortune", "Well we all SHIIIIIINE onnnnn! Gives 25% production multiplier.", 2.4e7, {Stats: {CoinsPsMult: 1.25}}, {CoinsPsMult: 0.25}),
        new Upgrade("Platinum Fortune", "Technically white gold... Actually, probably not. Gives 50% production multiplier.", 4e8, {Stats: {CoinsPsMult: 1.5}}, {CoinsPsMult: 0.5}),
        new Upgrade("Diamond Fortune", "Didn't think you'd get this far, so here, take this! Gives 100% production multiplier.", 9.000000001e9, {Stats: {CoinsPsMult: 2}}, {CoinsPsMult: 1}),
        new Upgrade("Brand Endorsements", "Why have investors endorse your coins when you can have brands do the same? Currencies are twice as efficient!", 1.6e7, {Structures: {Currency: 10}}, {Currency: 2}, true),
        new Upgrade("Diamond Pickaxe", "Upgrade pickaxes from Platinum to Diamond. MINING AWAY... Miners are twice as efficient!", 4e5, {Structures: {Miner: 50}}, {Miner: 2}, true),
        new Upgrade("Obsidian Mouse", "Clonck clonck clonck... Patience is all you need... Clickers are twice as efficient!", 1.04e5, {Structures: {Clicker: 50}}, {Clicker: 2}, true),
        new Upgrade("Collaboration", "Why not collaborate! Traders and Currencies are twice as efficient!", 1.2e7, {Structures: {Trader: 50, Currency: 1}}, {Trader: 2, Currency: 2}, true),
        new Upgrade("Super Union", "A union that is pro-working Super Full-Time hours! Businesses are twice as efficient!", 9.9e6, {Structures: {Business: 50}}, {Business: 2}, true),
        new Upgrade("Atomic Mechanics", "ATOMIC. Factories are twice as efficient!", 2.6e7, {Structures: {Factory: 50}}, {Factory: 2}, true),
        new Upgrade("YEAH SCIENCE!", "Just go berzerk with your science. Research Facilities are twice as efficient!", 5.2e7, {Structures: {["Research Facility"]: 10}}, {["Research Facility"]: 2}, true),
        new Upgrade("Optimization", "Make some absurdly expensive optimizations for 'maximum' coin output. Matter Refiners are twice as efficient!", 1.68e8, {Structures: {["Matter Refiner"]: 1}}, {["Matter Refiner"]: 2}, true),
        new Upgrade("Advanced Programs", "Design better programs for COINS... And Only COINS... The Matrixes are twice as efficient!", 2.14e10, {Structures: {["The Matrix"]: 1}}, {["The Matrix"]: 2}, true),
        new Upgrade("Universal Devotion", "Ensure your coin currencies have become universally adopted. Currencies are twice as efficient!", 1.92e8, {Structures: {Currency: 25}}, {Currency: 2}, true),
        new Upgrade("What comes after 8^3", "8^4 is 4096! 8-Balls are twice as efficient!", 4.4e7, {Structures: {["8-Ball"]: 25}}, {["8-Ball"]: 2}, true),
        new Upgrade("Cooler Number", "8^5 is 32768! Cool, right? 8-Balls are twice as efficient!", 2.048e8, {Structures: {["8-Ball"]: 50}}, {["8-Ball"]: 2}, true),
        new Upgrade("Mining Company", "Businesses are twice as efficient, Miners are 4 times as efficient!", 2.4e5, {Structures: {Miner: 25, Business: 10}}, {Business: 2, Miner: 4}, true),
        new Upgrade("Condensers", "Condense management of refinement for more streamlined coin production. Matter Refiners are twice as efficient.", 1.048e9, {Structures: {["Matter Refiner"]: 10}}, {["Matter Refiner"]: 2}, true),
        new Upgrade("Titanium Mouse", "A material perfect for endless rapid clicking. Clickers are twice as efficient.", 4.8e6, {Structures: {Clicker: 100}}, {Clicker: 2}, true),
        new Upgrade("Bloodstone Pickaxe", "Upgrade to Bloodstone, beating even diamonds. Miners are twice as efficient.", 2.1e6, {Structures: {Miner: 100}}, {Miner: 2}, true),
        new Upgrade("The Truth", "All I can offer is the truth about coins. Nothing more. The Matrixes are twice as efficient!", 9.2e10, {Structures: {["The Matrix"]: 10}}, {["The Matrix"]: 2}, true),
        new Upgrade("Hands on, Heads on.", "Name explains it compvarely. Research Facilities are twice as efficient!", 2.4e8, {Structures: {["Research Facility"]: 25}}, {["Research Facility"]: 2}, true),
        new Upgrade("Superscience", "Extremely fast science. No need to distract others with YEAH SCIENCE! Research Facilities are twice as efficient!", 1.6e9, {Structures: {["Research Facility"]: 50}}, {["Research Facility"]: 2}, true),
        new Upgrade("Learning Progress", "You know what they say, practice makes perfect. Research Facilities and Matter Refiners are twice as efficient.", 1.2e9, {Structures: {["Matter Refiner"]: 5, ["Research Facility"]: 10}}, {["Matter Refiner"]: 2, ["Research Facility"]: 2}, true),
        new Upgrade("Industrialization", "Incorporate Matter Refiners into Factories. MatterRefiners are twice as efficient, Factories are 8 times as efficient!", 2.9e9, {Structures: {["Matter Refiner"]: 10, Factory: 50}}, {["Matter Refiner"]: 2, Factory: 8}, true),
        new Upgrade("Devil's Click", "The pure opposite of God's click. Base coins per click is multiplied by 666.", 6.666666e6, {Stats: {CoinsPc: 96}}, {CoinsPc: 666}, true),
        new Upgrade("God's Click", "Now this, this is holy. And also expensive. Clicking earns 5% of your coins per second!", 2.1e7, {Stats: {CoinsPcPs: 0.05}}, {CoinsPcPs: 0.05}),
        new Upgrade("Pure Genius", "Extremely smart science. Research Facilities are twice as efficient!", 8e8,  {Structures: {["Research Facility"]: 100}}, {["Research Facility"]: 2}, true),
        new Upgrade("Keeping Busy", "Just always be busy... Must be robot workers. Businesses are twice as efficient!", 81e6, {Structures: {Business: 100}}, {Business: 2}, true),
        new Upgrade("Uber Mechanics", "UBER. Factories are twice as efficient!", 2e8, {Structures: {Factory: 100}}, {Factory: 2}, true),
        new Upgrade("The Big Bang", "Recreating the big bang to produce and refine universes for coins is GENIUS! Matter Refiners are twice as efficient!", 1e10, {Structures: {["Matter Refiner"]: 25}}, {["Matter Refiner"]: 2}, true),
        new Upgrade("Blackholes", "Pure bliss. File not found. Matter Refiners are twice as efficient!", 396e8, {Structures: {["Matter Refiner"]: 50}}, {["Matter Refiner"]: 2}, true),
        new Upgrade("Superball", "EIGHT! BOING! BOING! BOING! BOING! BOING! BOING! BOING! BOING! 8-Balls are 8 times as efficient!", 8.888888888e9, {Structures: {["8-Ball"]: 100}}, {["8-Ball"]: 8}, true),
        new Upgrade("Bloodstone Fortune", "Well, wouldn't ruby be better? Whatever. Gives 200% production multiplier.", 9.666666666e10, {Stats: {CoinsPsMult: 3}}, {CoinsPsMult: 2}),
        new Upgrade("Lack of Ideas", "Yeah, you heard me. But you can turn a lack of ideas into an idea! Profit!!! Traders and Currencies are twice as efficient!", 7.81e8, {Structures: {Currency: 50}}, {Trader: 2, Currency: 2}, true),
        new Upgrade("Brain Age", "Training your brain every day will give you better scamming skills. Traders are twice as efficient!", 9.5e7, {Structures: {Trader: 100}}, {Trader: 2}, true),
        new Upgrade("Executives", "Turn the most senior of your Traders whom you are collaborating with into Executives for maximum corporative efficiency. Traders are 4 times as efficient, Currencies are twice as efficient!", 2.64e9, {Structures: {Currency: 100}}, {Trader: 4, Currency: 2}, true),
        new Upgrade("Ultrascience", "Ultrascience > Superscience. Research Facilities are twice as efficient!", 7.5e9, {Structures: {["Research Facility"]: 200}}, {["Research Facility"]: 2}, true),
        new Upgrade("Advanced Adapter", "This extremely advanced adapter makes Clickers competent! Research Facilities are twice as efficient, Clickers are 1337 times as efficient!", 1.337e8, {Structures: {["Research Facility"]: 5, Clicker: 100}}, {["Research Facility"]: 2, Clicker: 1337}, true),
        new Upgrade("Moonstone Mouse", "I'm gonna steal the MOOOOOON...stone. Clickers are twice as efficient!", 5.5e7, {Structures: {Clicker: 200}}, {Clicker: 2}, true),
        new Upgrade("Antimatter Support", "Your Research Facilities can truly accomplish anything huh? Matter Refiners are twice as efficient.", 1e10, {Structures: {["Matter Refiner"]: 100}}, {["Matter Refiner"]: 2}, true),
        new Upgrade("Palladium Pickaxe", "Upgrade pickaxes from Bloodstone to Palladium, an extremely rare and absurdly expensive mineral forged from fragments of meteors and the Earth's core. Miners are twice as efficient.", 1.9e8, {Structures: {Miner: 200}}, {Miner: 2}, true),
        new Upgrade("Artificial Intelligence", "What's the point of relying on stupid human brains for scamming? Traders are twice as efficient!", 8.2e8, {Structures: {Trader: 200}}, {Trader: 2}, true),
        new Upgrade("Coin Landing", "Fake landing on your own planet! Planets are twice as efficient!", 6e8, {Structures: {Planet: 1}}, {Planet: 2}, true),
        new Upgrade("Total Excavation", "'We care about nature', they say as they rip apart planets... Planets are twice as efficient!", 3.65e9, {Structures: {Planet: 10}}, {Planet: 2}, true),
        new Upgrade("Cool Discoveries", "COOOOOL!!!!! Planets are twice as efficient!", 9.4e9, {Structures: {Planet: 25}}, {Planet: 2}, true),
        new Upgrade("Planetary Mutations", "Two planets mutated into one?! Well this is weird! Planets are twice as efficient!", 2e10, {Structures: {Planet: 50}}, {Planet: 2}, true),
        new Upgrade("Refining The Unknown", "Great idea to refine things you haven't even fully evaluated yet... Planets and Matter Refiners are twice as efficient!", 2.5e10, {Structures: {Planet: 10, ["Research Facility"]: 25}}, {Planet: 2, ["Matter Refiner"]: 2}, true),
        new Upgrade("MEGA Planets", "MEGA Planets for a MEGA price! Planets are twice as efficient!", 6.4e10, {Structures: {Planet: 100}}, {Planet: 2}, true),
        new Upgrade("Palladium Fortune", "Can we get much higher, higher... Gives 250% production multiplier.", 5.62e11, {Stats: {CoinsPsMult: 5}}, {CoinsPsMult: 2.5}),
        new Upgrade("Unstable Economy", "Name explains it in whole... Businesses, Traders and Currencies are twice as efficient!", 5e8, {Structures: {Business: 200, Trader: 1, Currency: 1}}, {Business: 2, Trader: 2, Currency: 2}, true),
        new Upgrade("Galactic Duplication", "You know, a lot of the upgrade names in this game are pretty straight forward so I don't usually need to make a large description but I do anyway because... I don't know. The Matrixes and Planets are twice as efficient!", 2e11, {Structures: {["The Matrix"]: 25, Planet: 50}}, {["The Matrix"]: 2, Planet: 2}, true),
        new Upgrade("Joining Teams", "Joining your Research Facilities and Businesses under the same umbrella will likely help massively for collaboration! Businesses are 16 times as efficient, Research Facilities are twice as efficient!", 3.3e8, {Structures: {Business: 100, ["Research Facility"]: 25}}, {Business: 16, ["Research Facility"]: 2}, true),
        new Upgrade("Million Dollar Click", "You're a millionaire! You already were. Base coins per click is multiplied by 16.", 2.5e8, {Stats: {CoinsPc: 63936}}, {CoinsPc: 16}, true),
        new Upgrade("Ultraclick", "It's like the mouse variant of the Ultrascience upgrade. Clicking earns 7% of your coins per second!", 3.5143748521e10, {Stats: {CoinsPcPs: 0.1}}, {CoinsPcPs: 0.07}),
        new Upgrade("Imagination Is Reality", "The Matrix makes anything seem like reality. Even an absurd amount of coins. Anything you wish. The Matrixes are twice as efficient!", 1e12, {Structures: {["The Matrix"]: 50}}, {["The Matrix"]: 2}, true),
        new Upgrade("Eternal Coins", "The Matrix makes anything eternal. Even your prized coins, just for an ungodly cost. The Matrixes are twice as efficient!", 2.13e13, {Structures: {["The Matrix"]: 100}}, {["The Matrix"]: 2}, true),
        new Upgrade("Maxed Out Coins", "The cost is as much as the 32 bit limit! Base coins per click is multiplied by 32.", 2.147483648e9, {Stats: {CoinsPc: 1022976}}, {CoinsPc: 32}, true),
        new Upgrade("Atomic Implementation", "You're telling me you have found the solution to turning atoms into coins but you are still using Nuclear mechanics??? Come on now... Atomizers are twice as efficient!", 1.6e12, {Structures: {Atomizer: 1}}, {Atomizer: 2}, true),
        new Upgrade("Pure Duplication", "Pure optimization allows for pure duplication. Atomizers are twice as efficient!", 1.4e13, {Structures: {Atomizer: 10}}, {Atomizer: 2}, true),
        new Upgrade("Uber Implementation", "Yeah, Atomic power isn't the best. Get with the times. Atomizers are twice as efficient!", 4e13, {Structures: {Atomizer: 25}}, {Atomizer: 2}, true),
        new Upgrade("Unobtainium Fortune", "A mysterious 'unobtainable' mineral from a different period in time and space... Gives 350% production multiplier.", 6e12, {Stats: {CoinsPsMult: 7.5}}, {CoinsPsMult: 3.5}),
        new Upgrade("Meteorite Mouse", "Make the most of your Planets by making Cursors more competent! Planets are twice as efficient, Cursors are 12 times as efficient!", 1.65e10, {Structures: {Cursor: 150, Planet: 25}}, {Cursor: 12, Planet: 2}, true),
        new Upgrade("Over-Exploration", "Expanding too far with no plan! Planets are twice as efficient!", 4e10, {Structures: {Planet: 50}}, {Planet: 2}, true),       
        new Upgrade("Ruby Mouse", "Told you Ruby was better than Bloodstone. Clickers are twice as efficient!", 2e10, { Structures: { Clicker: 300 } }, { Clicker: 2 }, true),
        new Upgrade("Lunar Mechanics", "Pure lunar space power was found to be more efficient than using Uber powered mechanics. Your factories produce coins at the speed of light. Factories are twice as efficient!", 1.66e9, { Structures: { Factory: 200 } }, { Factory: 2 }),
        new Upgrade("Infinite Luck", "Well technically your luck is finite, but I like to keep things 'creative' in this game. 8-Balls are twice as efficient!", 1e10, { Structures: { ["8-Ball"]: 200 } }, { ["8-Ball"]: 2 }, true),
        new Upgrade("Globalization", "Fun fact: 102% more people hate you now. Currencies are twice as efficient!", 1.7e10, { Structures: { Currency: 200 } }, { Currency: 2 }, true),
        new Upgrade("Neopolitan", "An absurdly expensive joke. The Matrixes are twice as efficient!", 7.9e12, { Structures: { ["The Matrix"]: 200 } }, { ["The Matrix"]: 2 }, true),
        new Upgrade("Decaclick", "Finally. Clicking earns 8% of your coins per second!", 3.65e11, { Stats: { CoinsPcPs: 0.17 } }, { CoinsPcPs: 0.08 }),
        new Upgrade("Beyond The Limits", "Yeah, that's indeed beyond the limits of the 32 bit... Base coins per click is multiplied by 32.", 1.28e11, { Stats: { CoinsPc: 32735232 } }, { CoinsPc: 32 }, true),
        new Upgrade("Lunar Implementation", "Lunar power is expensive. But why should you care? You are literally using star power to manipulate the fabric of reality. Atomizers are twice as efficient!", 1e14, { Structures: { Atomizer: 50 } }, { Atomizer: 2 }, true),
        new Upgrade("8-Ball Random Factor", "This is safe! Hey 8-Ball, should I destroy the universe? Matter Refiners are 3 times as efficient, 8-Balls are 88 times as efficient!", 8.89e10, { Structures: { ["Matter Refiner"]: 8, ["8-Ball"]: 88 } }, { ["Matter Refiner"]: 3, ["8-Ball"]: 88 }, true),
        new Upgrade("Atomizer Bundle", "Bundle a Atomizer with your stock! Atomizers are twice as efficient, Currencies are 60 times as efficient!", 4.8e12, { Structures: { Atomizer: 15, Currency: 75 } }, { Atomizer: 2, Currency: 60 }, true),
        new Upgrade("Compatibility", "Make your Atomizers compatible with your old Matter Refiners. Atomizers are twice as efficient, Matter Refiners are 8 times as efficient!", 8.5e13, { Structures: { Atomizer: 50, ["Matter Refiner"]: 100 } }, { Atomizer: 2, ["Matter Refiner"]: 8 }, true),
        new Upgrade("Fabric Manipulators", "No, not as in carpets.. the fabric of reality. Atomizers are twice as efficient!", 2.1e14, { Structures: { Atomizer: 100 } }, { Atomizer: 2 }, true),
        new Upgrade("Binary Fortune", "01010100 01110101 01110010 01101110 01110011 00100000 01100001 01101110 01111001 01110100 01101000 01101001 01101110 01100111 00100000 01101001 01101110 00100000 01110100 01101000 01100101 00100000 01100111 01100001 01101101 01100101 00100000 01101001 01101110 01110100 01101111 00100000 01100011 01101111 01101001 01101110 01110011. Gives 400% production multiplier.", 1.01e13, { Stats: { Continues: 1 } }, { CoinsPsMult: 4 }),
        new Upgrade("Everything Is Binary", "Realizing everything is not as it seems grants you massively exponential boosts. All structures are marginally more efficient.", 1.01e17, { Stats: { Continues: 3, Clicks: 10101, CoinsPsMult: 15 } }, { ["Matter Refiner"]: 2, ["8-Ball"]: 101, Clicker: 11, Miner: 1010, Trader: 500, Business: 404, Factory: 333, ["Research Facility"]: 20, Planet: 11, Atomizer: 2 }, true)
    ],
    achievements: [
        // TotalCoins
        new Achievement("First Coin", "Your first coin of hundreds, thousands, millions... hopefully.", "Stat", { TotalCoins: 1 }),
        new Achievement("Stack o' Coins", "You know, 100 is a lot!!!... not.", "Stat", { TotalCoins: 100 }),
        new Achievement("First Thousand", "Did you know, 1000 is also 1e3?", "Stat", { TotalCoins: 1000 }),
        new Achievement("Millionaire", "If I had a million coins, I'd be rich.", "Stat", { TotalCoins: 1e6 }),
        new Achievement("Billionaire", "Now that is kinda crazy! You've really made it!", "Stat", { TotalCoins: 1e9 }),
        new Achievement("Trillionaire", "You should stop playing now...", "Stat", { TotalCoins: 1e12 }),
        new Achievement("Quadrillionaire", "Absolute insanity.", "Stat", { TotalCoins: 1e15 }),
        new Achievement("Quintillionaire", "When this was added it wasn't even possible to reach...", "Stat", { TotalCoins: 1e18 }),
        // Continues
        new Achievement("Back So Soon?", "Good luck out there. [1 continue]", "Stat", { Continues: 1 }),
        // Prestiges
        new Achievement("Reborn", "Hey, you're here again. [1 prestige]", "Stat", { Prestiges: 1 }),
        // CoinsPs
        new Achievement("A Mint A Second", "Every second: [Insert coin sound effect here] [1 cps]", "Stat", { CoinsPs: 1 }),
        new Achievement("Coin Flow", "Sweet!!! [10 cps]", "Stat", { CoinsPs: 10 }),
        new Achievement("A Dollar A Second", "1 coin = 1 cent, 100 coins = 100 cents = 1 dollar [100 cps]", "Stat", { CoinsPs: 100 }),
        new Achievement("Industry Standard", "Pretty much a legitimate production line of coins! [1K cps]", "Stat", { CoinsPs: 1e3 }),
        new Achievement("Insanity", "You're insane. You should stop playing... [1M cps]", "Stat", { CoinsPs: 1e6 }),
        new Achievement("Galactic Production", "Endless amounts of coins... You have truly realized they are infinite now. [1B cps]", "Stat", { CoinsPs: 1e9 }),
        new Achievement("Outrageous", "That's what you are. [1T cps]", "Stat", { CoinsPs: 1e12 }),
        new Achievement("How?!", "Absolutely insane... just... How?! [1qd cps]", "Stat", { CoinsPs: 1e15 }),
        // Structures
        new Achievement("Click Olympics", "Clclclclclclclclclcl- [100 Clickers]", "Structures", { Clicker: 100 }),
        new Achievement("Mining Universe", "So, you want to give us excavators and mining trucks yet? [100 Miners]", "Structures", { Miner: 100 }),
        new Achievement("True Economist", "Now do it with currencies ;) [100 Traders]", "Structures", { Trader: 100 }),
        new Achievement("Expert Employer", "You could rival Wal-Mart. Maybe. Regardless, you're better than K-mart. [100 Businesses]", "Structures", { Business: 100 }),
        new Achievement("Production Line Overlord", "Now do it with currencies ;) [100 Factories]", "Structures", { Factory: 100 }),
        new Achievement("Billiards Enthusiast", "That's a lot of insecurity... [100 8-Balls]", "Structures", { ["8-Ball"]: 100 }),
        new Achievement("Coinsssss > Doge", "You showed that succubus of a Dogecoin promoter who is boss. [100 Currencies]", "Structures", { Currency: 100 }),
        new Achievement("Coin Mesa", "Welcome to the Coin Mesa research facility. [100 Research Facilities]", "Structures", { ["Research Facility"]: 100 }),
        new Achievement("Is there any matter left?", "No, seriously. [100 Matter Refiners]", "Structures", { ["Matter Refiner"]: 100 }),
        new Achievement("Coin Galaxies", "You shaped this universe in your vision. [100 Planets]", "Structures", { Planet: 100 }),
        new Achievement("Agent Coin", "That's you! [100 The Matrixes]", "Structures", { ["The Matrix"]: 100 }),
        new Achievement("Extinct Atoms", "...You monster. [100 Atomizers]", "Structures", { Atomizer: 100 }),
        new Achievement("Clickageddon", "Enough clicks to end the world. [250 Clickers]", "Structures", { Clicker: 250 }),
        new Achievement("Mined Everything", "I'd hope so. [250 Miners]", "Structures", { Miner: 250 }),
        new Achievement("Scamming Connoisseur", "You know the ways of a villager. [250 Traders]", "Structures", { Trader: 250 }),
        new Achievement("Globalism", "As with the Currency upgrade. [250 Businesses]", "Structures", { Business: 250 }),
        new Achievement("Production Line Overload", "Way too much. Also, see what I did there? [250 Factories]", "Structures", { Factory: 250 }),
        new Achievement("Billiards Obsession", "What's the matter with you? [250 8-Balls]", "Structures", { ["8-Ball"]: 250 }),
        new Achievement("Most Expensive Stock", "Anybody who was a early supporter is rolling in millions... [250 Currencies]", "Structures", { Currency: 250 }),
        new Achievement("Nerd Cloning", "Must be what you're doing. [250 Research Facilities]", "Structures", { ["Research Facility"]: 250 }),
        new Achievement("Nope Seems Like Theres None Left", "That's not good. [250 Matter Refiners]", "Structures", { ["Matter Refiner"]: 250 }),
        new Achievement("Reality is a lie", "Finally for once it's not the cake. [250 The Matrixes]", "Structures", { ["The Matrix"]: 250 }),
        new Achievement("Everything is Coins", "What is wrong with you? [250 Atomizers]", "Structures", { Atomizer: 250 }),
        // SumStructs
        new Achievement("Builder", "Keep going... [100 Structures]", "SumStructs", 100),
        new Achievement("Entrepreneur", "That's a lot to keep track of... [250 Structures]", "SumStructs", 250),
        new Achievement("Your Own Country", "Wow! You're a proud Queen or King of a whole lot! [500 Structures]", "SumStructs", 500),
        new Achievement("Your Own Galaxy", "Honorable coin Queen or King of a whole Galaxy of structures! [1K Structures]", "SumStructs", 1000),
        new Achievement("Don't You Own Everything?", "Sure sounds like it. [2.5K Structures]", "SumStructs", 2500),
        // SumUpgrades
        new Achievement("Experimentalist", "Hard to keep pace with all these upgrades requiring brilliance... [100 Upgrades]", "SumUpgrades", 100),
        // Special
        new Achievement("Wii U", "You're officially cooler than all other players. [Play on Wii U]", "Special", null, true)
    ]
}

export default { items }
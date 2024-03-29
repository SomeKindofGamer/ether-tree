addLayer("main", {
  name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "Eth", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() { return {
      unlocked: true,
  points: new Decimal(0), // Currency

  }},
  color: "#6A0DAD",
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "ether", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() {return player.points}, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      mult = mult.mul(buyableEffect('main', 12))
      if (hasUpgrade('main', 12)) mult = mult.pow(1.05)
      if (hasUpgrade('main', 13)) mult = mult.pow(1.1)
      if (hasUpgrade('main', 14)) mult = mult.pow(1.25)
      if (hasUpgrade('main', 15)) mult = mult.pow(1.4)
      if (hasUpgrade('main', 23)) mult = mult.pow(1.65)
      if (hasUpgrade('main', 24)) mult = mult.pow(1.85)
      if (hasUpgrade('main', 33)) mult = mult.pow(1.1)
      if (hasUpgrade('main', 34)) mult = mult.pow(1.1)
      if (hasUpgrade('main', 41)) mult = mult.pow(1.5)
      if (hasMilestone('shadow', 0)) mult = mult.mul(10)
      if (hasMilestone('shadow', 1)) mult = mult.pow(1.4)
      if (hasMilestone('shadow', 2)) mult = mult.mul(20)
      if (hasMilestone('shadow', 3)) mult = mult.pow(1.8)
      if (hasMilestone('shadow', 4)) mult = mult.mul(35)
      if (hasMilestone('shadow', 5)) mult = mult.pow(1.1)
      if (hasMilestone('shadow', 6)) mult = mult.pow(1.25)
      if (hasUpgrade('shadow', 15)) mult = mult.mul(300)
      if (hasUpgrade('shadow', 33)) mult = mult.pow(2)
      if (hasUpgrade('shadow', 41)) {
        if (hasMilestone('seth', 1)) {
        }
        else
        {
          mult = mult.pow(0.1)
        }
      }
      if (hasMilestone('energy', 5)) mult = mult.pow(1.25)
      if (hasMilestone('seth', 1)) mult = mult.mul(player.seth.points + 1)
      if (hasMilestone('seth', 2)) mult = mult.pow(0.01)
      if (hasMilestone('seth', 3)) mult = mult.mul(20)
      if (hasMilestone('seth', 6)) mult = mult.mul(50)
      if (hasMilestone('seth', 7)) mult = mult.mul(200)
      if (hasMilestone('seth', 10)) mult = mult.mul(2500)
      if (hasMilestone('seth', 13)) mult = mult.pow(2)
      if (hasMilestone('seth', 14)) mult = mult.pow(2)
      if (hasMilestone('seth', 15)) mult = mult.pow(2)

      return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
    let Generation = new Decimal(1)
    if (hasMilestone('seth', 2)) Generation = Generation.div(1.5)
    return Generation
  },
  passiveGeneration() {
      let Generation = new Decimal(1)
      return Generation
    },

    automate(){
      if (hasMilestone('shadow', 2)) 
      if (hasMilestone('shadow', 2)) {
        for (let i = 0; i < 40; i++) {
            buyBuyable('main', i % 2 === 0 ? 11 : 12);
        }
    }
  },

    upgrades: {

      11: {
          title: "Point Generator",
          description: "Double your point gain.",
          cost: new Decimal(1),
      },
      
      12: {
          title: "Ether Generator",
          description: "Add ^0.05 to your Ether gain",
          cost: new Decimal(35),
      },

      13: {
        title: "Ether Generator v2",
        description: "Add ^0.1 to your Ether gain",
        cost: new Decimal(1500),
      },

      14: {
        title: "Ether Generator v3",
        description: "Add ^0.25 to your Ether gain",
        cost: new Decimal(1e6),
      },

      15: {
        title: "Ether Generator v4",
        description: "Add ^0.4 to your Ether gain",
        cost: new Decimal(1e12),
      },

      21: {
        title: "Point Generator v2",
        description: "Add ^0.2 to your Point gain",
        cost: new Decimal(1e100),
      },

      22: {
        title: "MORE BUYABLES!!!",
        description: "Adds 200 to the buyable limit (1000)",
        cost: new Decimal(1e250),
      },

      23: {
        title: "Ether Generator v5",
        description: "Add ^0.65 to your Ether gain",
        cost: new Decimal(1e295),
      },

      24: {
        title: "Ether Generator MKII",
        description: "Add ^0.85 to your Ether gain",
        cost: new Decimal("1e600"),
        unlocked() {
          if (hasMilestone('shadow', 1)) return true
        }
      },

      31: {
        title: "EVEN MORE BUYABLES!!!",
        description: "Adds 250 to the buyable limit (1250)",
        cost: new Decimal("1e775"),
        unlocked() {
          if (hasMilestone('shadow', 1)) return true
        }
      },

      32: {
        title: "Darkness Lightraiser",
        description: "Earn 2x more shadow",
        cost: new Decimal("1e850"),
        unlocked() {
          if (hasMilestone('shadow', 1)) return true
        }
      },

      33: {
        title: "NEED MORE ETHER??",
        description: "Watch a 100 hour long tutorial on how to get more ether",
        cost: new Decimal("1e8600"),
        unlocked() {
          if (hasMilestone('seth', 14)) return true
        }
      },

      34: {
        title: "WATCH ANOTHER ONE!!!",
        description: "Watch a 500 hour long tutorial on how to get even more ether",
        cost: new Decimal("1e9500"),
        unlocked() {
          if (hasMilestone('seth', 14)) return true
        }
      },

      41: {
        title: "Summon a magical wizard for more ether",
        description: "A magical wizard for ^1.5 more ether",
        cost: new Decimal("1e11400"),
        unlocked() {
          if (hasMilestone('shadow', 5)) return true
        }
      },
    },

    buyables: {

11 : {
    cost(x) {
      let PowerI = new Decimal(1.75)
      let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
      return Calculation;
    },
    purchaseLimit() {
      let LimitThing = new Decimal(800)
      if (hasUpgrade('main', 22)) LimitThing = LimitThing.add(200)
      if (hasUpgrade('main', 31)) LimitThing = LimitThing.add(250)
      return LimitThing
    },
    display() {
      return `<b style="font-size:24px">Point Generator v${format(player[this.layer].buyables[this.id], 0)}</b>
  <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</h2><br>
  <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ether</h1>
  <h1><b style="font-size:15px">Max: ${format(this.purchaseLimit())}</h1>`
    },
    canAfford() {
      return player[this.layer].points.gte(this.cost())
    },
    buy() {
      player[this.layer].points = player[this.layer].points.sub(this.cost())
      setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
      let Effect = new Decimal(1).mul(Decimal.pow(2, x.pow(1)))
      return Effect;
    },
    unlocked() {
      return true;
    }
  },

  12 : {
    cost(x) {
      let PowerI = new Decimal(2.35)
      if (hasMilestone('seth', 11)) PowerI = PowerI.div(1.5)
      let Calculation = new Decimal(25).mul(Decimal.pow(PowerI, x.pow(1)))
      return Calculation;
    },
    display() {
      return `<b style="font-size:24px">Ethereal Token v${format(player[this.layer].buyables[this.id], 0)} </b>
  <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Ether Generation</h2><br>
  <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ether</h1>
  <h1><b style="font-size:15px">Max: ${format(this.purchaseLimit())}</h1>
  `
    },
    canAfford() {
      return player[this.layer].points.gte(this.cost())
    },
    purchaseLimit() {
      let LimitThing = new Decimal(800)
      if (hasUpgrade('main', 22)) LimitThing = LimitThing.add(200)
      if (hasUpgrade('main', 31)) LimitThing = LimitThing.add(250)
      if (hasMilestone('seth', 12)) LimitThing = LimitThing.add(500)
      return LimitThing
    },
    buy() {
      player[this.layer].points = player[this.layer].points.sub(this.cost())
      setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
      let Effect = new Decimal(1).mul(Decimal.pow(1.25, x.pow(1)))
      if (hasMilestone('seth', 11)) Effect = Effect.pow(60)
      if (hasMilestone('seth', 11)) Effect = Effect.mul(300)
      return Effect;
    },
    unlocked() {
      return true;
    }
  },
},

  row: 0, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    //  {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
  ],
  layerShown(){return true},

  tabFormat: {
    "Upgrades": {
      content:
      ["main-display",
      "resource-display",
      "blank", 
      "upgrades",]

    },
    "Buyables": {
      content:
      ["main-display",
      "resource-display",
      "blank", 
      "buyables",]

    }
  }
})

addLayer("shadow", {
name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
startData() { return {
    unlocked: false,
points: new Decimal(0), // Currency

}},
color: "#323232",
requires: new Decimal(5e257), // Can be a function that takes requirement increases into account
resource: "shadow", // Name of prestige currency
baseResource: "ether", // Name of resource prestige is based on
baseAmount() {return player.main.points}, // Get the current amount of baseResource
type: "shadow", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
exponent: 0.0015, // Prestige currency exponent
gainExp() { // Calculate the exponent on main currency from bonuses
  let Generation = new Decimal(1)
  if (hasUpgrade('shadow', 14)) Generation = Generation.add(0.03)
  return Generation
},

gainMult() { // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1)
    if (hasUpgrade('main', 32)) mult = mult.mul(2)
    if (hasMilestone('shadow', 3)) mult = mult.mul(2)
    if (hasUpgrade('shadow', 11)) mult = mult.mul(2)
    if (hasUpgrade('shadow', 12)) mult = mult.mul(2)
    if (hasUpgrade('shadow', 13)) mult = mult.mul(3)
    if (hasUpgrade('shadow', 21)) mult = mult.mul(4)
    if (hasUpgrade('shadow', 22)) mult = mult.pow(1.02)
    if (hasUpgrade('shadow', 23)) mult = mult.pow(1.05)
    if (hasUpgrade('shadow', 24)) mult = mult.pow(1.075)
    if (hasMilestone('energy', 0)) mult = mult.mul(1.5)
    if (hasMilestone('energy', 1)) mult = mult.mul(1.5)
    if (hasMilestone('energy', 3)) mult = mult.mul(2)
    if (hasMilestone('energy', 4)) mult = mult.mul(3.5)
    if (hasMilestone('energy', 5)) mult = mult.pow(1.25)

    if (hasUpgrade('shadow', 41)) {
      document.body.style.setProperty('--background', "#1f0f0f");
    }
    if (hasMilestone('seth', 14)) mult = mult.pow(2)
    if (hasMilestone('seth', 15)) mult = mult.pow(2)
    return mult
},

upgrades: {

  11: {
      title: "Shadow Multiplier",
      description: "Double your shadow gain",
      cost: new Decimal(1000),
      unlocked() {
        if (hasMilestone('shadow', 4)) return true
      }
  },

  12: {
    title: "Shadow Multiplier II",
    description: "Double your shadow gain again",
    cost: new Decimal(2500),
    unlocked() {
      if (hasMilestone('shadow', 4)) return true
    }
  },

  13: {
    title: "Shadow Multiplier III",
    description: "Triple your shadow gain",
    cost: new Decimal(5000),
    unlocked() {
      if (hasMilestone('shadow', 4)) return true
    }
  },

  14: {
    title: "Sacrifice Duper",
    description: "/1.2 Sacrifice Cost",
    cost: new Decimal(10000),
    unlocked() {
      if (hasMilestone('shadow', 4)) return true
    }
  },

  15: {
    title: "Shadow Ether Generator",
    description: "x300 Ether Gain",
    cost: new Decimal(15000),
    unlocked() {
      if (hasMilestone('shadow', 4)) return true
    }
  },

  21: {
    title: "Shadow Multiplier IV",
    description: "Quadruple your Shadow Gain",
    cost: new Decimal(25000),
    unlocked() {
      if (hasMilestone('shadow', 4)) return true
    }
  },
  
  22: {
    title: "Shadow Spawner",
    description: "^1.02 your Shadow Gain",
    cost: new Decimal(32000),
    unlocked() {
      if (hasMilestone('shadow', 4)) return true
    }
  },

  23: {
    title: "Shadow Spawner II",
    description: "^1.05 your Shadow Gain",
    cost: new Decimal(50000),
    unlocked() {
      if (hasMilestone('shadow', 4)) return true
    }
  },

  24: {
    title: "Shadow Spawner III",
    description: "^1.075 your Shadow Gain",
    cost: new Decimal(75000),
    unlocked() {
      if (hasMilestone('shadow', 4)) return true
    }
  },

  31: {
    title: "Energy Converter",
    description: "Unlock shadow energy",
    cost: new Decimal(100000),
    unlocked() {
      if (hasMilestone('shadow', 4)) return true
    }
  },

  32: {
    title: "Energy Converter II",
    description: "2x Shadow Energy Gain",
    cost: new Decimal(250000),
    unlocked() {
      if (hasMilestone('energy', 1)) return true
    }
  },

  33: {
    title: "Ultimate Ether Generation",
    description: "^2 Ether Generation",
    cost: new Decimal(750000),
    unlocked() {
      if (hasMilestone('energy', 1)) return true
    }
  },

  41: {
    title: "hi",
    description: "whats this...?",
    cost: new Decimal(2e9),
    onPurchase() {
      this.title = "my finger slipped"
      this.description = "no more ether muhahaha!!!",
      doPopup(type = "none", text = "OH NO MY ETHER", title = "hehehe", timer = 3, color = "#5f0f0f")
    },
    unlocked() {
      if (hasMilestone('energy', 1)) return true
      if (hasMilestone('seth', 1)) return false
    }
  },

},

milestones: {
  0: {
    requirementDescription: "Do a Shadow",
    effectDescription: "10x ether gain",
    done() {
      return player.shadow.points.gte(1)
    }
  },

  1: {
    requirementDescription: "Get 3 shadows",
    effectDescription: "^1.4 ether gain and unlock 3 more ether upgrades",
    done() {
      return player.shadow.points.gte(3)
    }
  },

  2: {
    requirementDescription: "Get 50 shadows",
    effectDescription: "x20 ether gain and automate ether buyables",
    done() {
      return player.shadow.points.gte(50)
    }
  },

  3: {
    requirementDescription: "Get 500 shadows",
    effectDescription: "^1.8 ether gain and 2x shadow gain",
    done() {
      return player.shadow.points.gte(500)
    }
  },

  4: {
    requirementDescription: "Get 5,000 shadows",
    effectDescription: "x35 ether gain and unlock shadow upgrades",
    done() {
      return player.shadow.points.gte(5000)
    }
  },

  5: {
    requirementDescription: "SHADOW GOD!!!!!!!! (1e15)",
    effectDescription: "^1.1 ether gain and unlock 1 new ether upgrade",
    done() {
      return player.shadow.points.gte(1e15)
    },

    unlocked() {
      return player.shadow.points.gte(1e8)
    }
  },

  6: {
    requirementDescription: "Shadow is too easy! (1e45)",
    effectDescription: "^1.25 ether gain and unlock 1 new ether upgrade",
    done() {
      return player.shadow.points.gte(1e45)
    },

    unlocked() {
      return player.shadow.points.gte(1e15)
    }
  }
  
},

row: 1, // Row the layer is in on the tree (0 is the first row)
layerShown(){return hasAchievement("a", 25)},

tabFormat: {
  "Sacrifice": {
    content:
    ["main-display",
    "resource-display",
    "prestige-button",
    "blank", 
    "milestones", 
  ]
  },

  "Upgrades": {
    content:
    ["main-display",
    "resource-display",
    "blank", 
    "upgrades", 
  ]
  }
}

})

addLayer("seth", {
name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
symbol: "S-ET", // This appears on the layer's node. Default is the id with the first letter capitalized
position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
startData() { return {
  unlocked: true,
  points: new Decimal(0), // Currency

}},
color: "#301934",
requires: new Decimal(1000), // Can be a function that takes requirement increases into account
resource: "super", // Name of prestige currency
baseResource: "ether", // Name of resource prestige is based on
baseAmount() {return player.main.points}, // Get the current amount of baseResource
type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
exponent: 0.1, // Prestige currency exponent
gainExp() { // Calculate the exponent on main currency from bonuses
  let Generation = new Decimal(1)
  Generation = Generation.div(player.seth.points + 1)
  if (hasMilestone('seth', 2)) Generation = Generation.div(0.05)
  if (hasMilestone('seth', 4)) Generation = Generation.div(1.5)
  if (hasMilestone('seth', 5)) Generation = Generation.div(0.99)
  if (hasMilestone('seth', 7)) Generation = Generation.div(2)
  if (hasMilestone('seth', 9)) Generation = Generation.div(1.5)
  if (hasMilestone('seth', 12)) Generation = Generation.div(5)
  if (hasMilestone('seth', 14)) Generation = Generation.div(20)
  return Generation
},

gainMult() { // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1)
    return mult
},

milestones: {
  0: {
    requirementDescription: "my stuff... (1)",
    effectDescription: "what a shame",
    done() {
      return player.seth.points.gte(1)
    },
    unlocked() {
      return player.seth.points.gte(1)
    }
  },

  1: {
    requirementDescription: "is there any point to this? (2)",
    effectDescription: "boosts ether by super ether",
    done() {
      return player.seth.points.gte(2)
    },
    unlocked() {
      return player.seth.points.gte(2)
    }
  },

  2: {
    requirementDescription: "no. (7)",
    effectDescription: ":)",
    onComplete() {
      doPopup(type = "none", text = "was it getting too easy?", title = ":)", timer = 3, color = "#5f0f0f")
    },
    done() {
      return player.seth.points.gte(7)
    },
    unlocked() {
      return player.seth.points.gte(6)
    }
  },

  3: {
    requirementDescription: "ok thats enough hardness (8)",
    effectDescription: "more ether yay",
    done() {
      return player.seth.points.gte(8)
    },
    unlocked() {
      return player.seth.points.gte(8)
    }
  },

  4: {
    requirementDescription: "enjoying this? (10)",
    effectDescription: "x5 Point Gain",
    done() {
      return player.seth.points.gte(10)
    },
    unlocked() {
      return player.seth.points.gte(9)
    }
  },

  5: {
    requirementDescription: "its about time points got multiplied (11)",
    effectDescription: "x20 Point Gain",
    done() {
      return player.seth.points.gte(11)
    },
    unlocked() {
      return player.seth.points.gte(10)
    }
  },

  6: {
    requirementDescription: "having fun? (12)",
    effectDescription: "x50 Ether Gain",
    done() {
      return player.seth.points.gte(12)
    },
    unlocked() {
      return player.seth.points.gte(11)
    }
  },

  7: {
    requirementDescription: "mmm i love ether dont you? (14)",
    effectDescription: "x50 Point Gain, 200x Ether Gain",
    done() {
      return player.seth.points.gte(14)
    },
    unlocked() {
      return player.seth.points.gte(13)
    }
  },

  8: {
    requirementDescription: "we're being nice to points now (15)",
    effectDescription: "^1.5 Point Gain",
    done() {
      return player.seth.points.gte(15)
    },
    unlocked() {
      return player.seth.points.gte(15)
    }
  },

  9: {
    requirementDescription: "more point gain cause why not (18)",
    effectDescription: "x25 Point Gain",
    done() {
      return player.seth.points.gte(18)
    },
    unlocked() {
      return player.seth.points.gte(17)
    }
  },

  10: {
    requirementDescription: "congratulations you reached the end of super ether (19)",
    effectDescription: "x2,500 Ether Gain",
    done() {
      return player.seth.points.gte(19)
    },
    unlocked() {
      return player.seth.points.gte(18)
    }
  },

  11: {
    requirementDescription: "surprise super ether milestone!!! (22)",
    effectDescription: "Etheral Token Buyable is now better",
    done() {
      return player.seth.points.gte(22)
    },
    unlocked() {
      return player.seth.points.gte(22)
    }
  },

  12: {
    requirementDescription: "another surprise super ether milestone!!! (25)",
    effectDescription: "Etheral Token Buyable has 500 more limit and does 300x more boost",
    done() {
      return player.seth.points.gte(25)
    },
    unlocked() {
      return player.seth.points.gte(25)
    }
  },
  
  13: {
    requirementDescription: "enjoying super ether? (26)",
    effectDescription: "^2 ether gain",
    done() {
      return player.seth.points.gte(26)
    },
    unlocked() {
      return player.seth.points.gte(26)
    }
  },

  14: {
    requirementDescription: "ok fr no more super ether (30)",
    effectDescription: "^2 ether, ^2 shadow gain unlock 2 new ether upgrades",
    done() {
      return player.seth.points.gte(30)
    },
    unlocked() {
      return player.seth.points.gte(30)
    }
  },

  15: {
    requirementDescription: "why did you get this much... (50)",
    effectDescription: "^2 ether and ^2 shadow gain (CURRENT ENDGAME)",
    done() {
      return player.seth.points.gte(50)
    },
    unlocked() {
      return player.seth.points.gte(32)
    }
  },
},

row: 3, // Row the layer is in on the tree (0 is the first row)
layerShown(){return hasAchievement("a", "MY1")},

tabFormat: {
  "Super Ether": {
    content:
    ["main-display",
    "resource-display",
    "prestige-button",
    "blank", 
    "milestones", 
  ]
  }
}

})

addLayer("energy", {
name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
symbol: "S-E", // This appears on the layer's node. Default is the id with the first letter capitalized
position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
startData() { return {
    unlocked: false,
points: new Decimal(0), // Currency

}},
color: "#34381b",
requires: new Decimal(1), // Can be a function that takes requirement increases into account
resource: "shadow energy", // Name of prestige currency
baseResource: "shadow", // Name of resource prestige is based on
baseAmount() {return player.shadow.points}, // Get the current amount of baseResource
type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
exponent: 0.2, // Prestige currency exponent

gainExp() { // Calculate the exponent on main currency from bonuses
  let Generation = new Decimal(1)
  return Generation
},

gainMult() { // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1)
    if (hasMilestone('energy', 2)) mult = mult.mul(1.5)
    if (hasMilestone('energy', 3)) mult = mult.mul(1.5)
    if (hasUpgrade('shadow', 33)) mult = mult.mul(2)
    return mult
},

row: 2, // Row the layer is in on the tree (0 is the first row)
layerShown(){return hasUpgrade('shadow', 31)},

milestones: {
  0: {
    requirementDescription: "Get 1 shadow energy",
    effectDescription: "x1.5 shadow gain",
    done() {
      return player.energy.points.gte(1)
    }
  },

  1: {
    requirementDescription: "Get 10 shadow energy",
    effectDescription: "x1.5 Shadow Gain, Unlock 3 new shadow upgrades",
    done() {
      return player.energy.points.gte(10)
    }
  },

  2: {
    requirementDescription: "Get 50 shadow energy",
    effectDescription: "x1.5 Shadow Energy Gain",
    done() {
      return player.energy.points.gte(50)
    }
  },

  3: {
    requirementDescription: "Get 200 shadow energy",
    effectDescription: "x1.5 shadow energy gain and x2 shadow gain",
    done() {
      return player.energy.points.gte(200)
    }
  },

  4: {
    requirementDescription: "Get 1500 shadow energy",
    effectDescription: "x3.5 shadow gain",
    done() {
      return player.energy.points.gte(1500)
    }
  },

  5: {
    requirementDescription: "Get 1,000,000 shadow energy",
    effectDescription: "^1.25 ether and shadow gain",
    done() {
      return player.energy.points.gte(1000000)
    }
  },
  
},

tabFormat: {
  "Energy": {
    content:
    ["main-display",
    "resource-display",
    "prestige-button",
    "blank", 
    "milestones", 
  ]
  }
}

})

addLayer("a", {
startData() { return {
    unlocked: true,
points: new Decimal(0),
}},
color: "yellow",
resource: "achievements", 
row: "side",
tooltip() { // Optional, tooltip displays when the layer is locked
    return ("Achievements")
},
achievementPopups: true,
achievements: {
    11: {
        name: "i love ether",
        done() {return player.main.points.gte(1)},
        tooltip: "Get 1 ether", // Showed when the achievement is completed
        onComplete() {player.a.points = player.a.points.add(1)}
    },

    12: {
      name: "wow ether!",
      done() {return player.main.points.gte(1000)},
      tooltip: "Get 1,000 ether", // Showed when the achievement is completed
      onComplete() {player.a.points = player.a.points.add(1)}
  },

  13: {
    name: "oh more ether!!",
    done() {return player.main.points.gte(1000000)},
    tooltip: "Get 1,000,000 ether", // Showed when the achievement is completed
    onComplete() {player.a.points = player.a.points.add(1)}
},

14: {
  name: "ok im getting tired of ether",
  done() {return player.main.points.gte(1_000_000_000)},
  tooltip: "Get 1,000,000,000 ether", // Showed when the achievement is completed
  onComplete() {player.a.points = player.a.points.add(1)}
},

15: {
name: "thats alot of ether",
done() {return player.main.points.gte(1e13)},
tooltip: "Get 1e13 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

16: {
name: "can i have something new",
done() {return player.main.points.gte(1e18)},
tooltip: "Get 1e18 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

17: {
name: "...is that a no?",
done() {return player.main.points.gte(1e22)},
tooltip: "Get 1e22 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

18: {
name: "wow!",
done() {return player.main.points.gte(1e26)},
tooltip: "Get 1e26 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

19: {
name: "pls new layer",
done() {return player.main.points.gte(1e33)},
tooltip: "Get 1e33 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

20: {
name: "i need something else",
done() {return player.main.points.gte(1e40)},
tooltip: "Get 1e40 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

21: {
name: "wait whats this?",
done() {return player.main.points.gte(1e65)},
tooltip: "Get 1e65 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

22: {
name: "it was nothing!!!!",
done() {return player.main.points.gte(1e85)},
tooltip: "Get 1e85 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

23: {
name: "hmm",
done() {return player.main.points.gte(1e125)},
tooltip: "Get 1e125 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

24: {
name: "hmmmmmmmmm....",
done() {return player.main.points.gte(1e165)},
tooltip: "Get 1e165 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

25: {
name: "FINALLY SOMETHING NEW!",
done() {return player.main.points.gte(1e250)},
tooltip: "Get 1e250 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

26: {
name: "I still love ether!",
done() {return player.main.points.gte(1e285)},
tooltip: "Get 1e285 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

27: {
name: "I still really love ether!",
done() {return player.main.points.gte("1e325")},
tooltip: "Get 1e325 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

28: {
name: "cool",
done() {return player.main.points.gte("1e385")},
tooltip: "Get 1e385 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

29: {
name: "you must be dedicated to ether",
done() {return player.main.points.gte("1e420")},
tooltip: "Get 1e420 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

30: {
name: "1e500 ether speedrun",
done() {return player.main.points.gte("1e500")},
tooltip: "Get 1e500 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

31: {
name: "Ether Champion",
done() {return player.main.points.gte("1e650")},
tooltip: "Get 1e650 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

32: {
name: "this is alot of ether",
done() {return player.main.points.gte("1e900")},
tooltip: "Get 1e900 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

33: {
name: "this is REALLY alot of ether",
done() {return player.main.points.gte("1e1200")},
tooltip: "Get 1e1200 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

34: {
name: "this is too much ether",
done() {return player.main.points.gte("1e1500")},
tooltip: "Get 1e1500 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

35: {
name: "do we need this much ether",
done() {return player.main.points.gte("1e2000")},
tooltip: "Get 1e2000 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

36: {
name: "unlimited ether",
done() {return player.main.points.gte("1e3000")},
tooltip: "Get 1e3000 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

37: {
name: "really",
done() {return player.main.points.gte("1e4500")},
tooltip: "Get 1e4500 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

38: {
name: "too much ether",
done() {return player.main.points.gte("1e6000")},
tooltip: "Get 1e6000 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

39: {
name: "w ether",
done() {return player.main.points.gte("1e8500")},
tooltip: "Get 1e8500 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

40: {
name: "unstoppable ether",
done() {return player.main.points.gte("1e10000")},
tooltip: "Get 1e10000 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

41: {
name: "so you obviously cheated for these",
done() {return player.main.points.gte("1e12500")},
tooltip: "Get 1e12500 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

42: {
name: "im sure you're just good",
done() {return player.main.points.gte("1e17500")},
tooltip: "Get 1e17500 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

43: {
name: "1e25000 is a big number you know that?",
done() {return player.main.points.gte("1e25000")},
tooltip: "Get 1e25000 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

44: {
name: "1e30000 is a bigger number!",
done() {return player.main.points.gte("1e30000")},
tooltip: "Get 1e30000 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

45: {
name: "im sorry, we're gonna have to break up💔",
done() {return player.main.points.gte("1e45000")},
tooltip: "Get 1e45000 ether", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},


//      --------      Shadow Achievements      --------      \\

["S1"]: {
name: "i love shadow",
done() {return player.shadow.points.gte(1)},
tooltip: "Get 1 shadow", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

["S2"]: {
name: "wow shadow!",
done() {return player.shadow.points.gte(3)},
tooltip: "Get 3 shadows", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

["S3"]: {
name: "yum give me more",
done() {return player.shadow.points.gte(25)},
tooltip: "Get 25 shadows", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

["S4"]: {
name: "so many shadows",
done() {return player.shadow.points.gte(750)},
tooltip: "Get 750 shadows", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

["S5"]: {
name: "yummy shadows",
done() {return player.shadow.points.gte(5000)},
tooltip: "Get 5,000 shadows", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

["S6"]: {
name: "tasty shadows",
done() {return player.shadow.points.gte(20000)},
tooltip: "Get 200,000 shadows", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

["S7"]: {
name: "These are easy shadows",
done() {return player.shadow.points.gte(1000000)},
tooltip: "Get 1,000,000 shadows", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

["S8"]: {
name: "Shadow God",
done() {return player.shadow.points.gte(1_000_000_000)},
tooltip: "Get 1,000,000,000 shadows", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

["S9"]: {
name: "Shadow Master",
done() {return player.shadow.points.gte(1e12)},
tooltip: "Get 1e12 shadows", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

["S10"]: {
name: "alot of shadows",
done() {return player.shadow.points.gte(1e20)},
tooltip: "Get 1e20 shadows", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

//      --------      Shadow Energy Achievements      --------      \\

["SE1"]: {
name: "And we reset again...",
done() {return player.energy.points.gte(1)},
tooltip: "Get 1 Shadow Energy", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

["SE2"]: {
name: "Starting off somewhere",
done() {return player.energy.points.gte(100)},
tooltip: "Get 100 Shadow Energy", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

["SE3"]: {
name: "alot of shadow energy",
done() {return player.energy.points.gte(10000)},
tooltip: "Get 10,000 Shadow Energy", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

["SE4"]: {
name: "nvm shadow energy is boring",
done() {return player.energy.points.gte(1000000)},
tooltip: "Get 1,000,000 Shadow Energy", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

["SE5"]: {
name: "i like shadow energy actually",
done() {return player.energy.points.gte(1e9)},
tooltip: "Get 1e9 Shadow Energy", // Showed when the achievement is completed
onComplete() {player.a.points = player.a.points.add(1)}
},

//      --------      Mystery Achievements      --------      \\

["MY1"]: {
name: "what have i done",
done() {return hasUpgrade('shadow', 41)},
tooltip: "oh well atleast u got super ether now", // Showed when the achievement is completed
unlocked() {return hasMilestone('seth', 1)},
onComplete() {player.a.points = player.a.points.add(1)}
},

["MY2"]: {
name: "errr what did you even do?",
done() {return player.seth.points.gte(100)},
tooltip: "100 super ether is alot of super ether... why?", // Showed when the achievement is completed
unlocked() {return player.seth.points.gte(100)},
onComplete() {player.a.points = player.a.points.add(1)}
},

},

tabFormat: [
  ["display-text", function() { return "<MA style='font-size: 25px; font-family: url(\"fonts/cabin.ttf\")'>Achievements ~ " + player.a.achievements.length + " / " + (Object.keys(tmp.a.achievements).length - 2) }],
  "blank", 
  "blank",
  ["display-text", function() { return "~ Ether Achievements ~"}],
  "blank",
     ["row", [["achievement", 11], ["achievement", 12], ["achievement", 13], ["achievement", 14], ["achievement", 15]]],
     ["row", [["achievement", 16], ["achievement", 17], ["achievement", 18], ["achievement", 19], ["achievement", 20]]],
     ["row", [["achievement", 21], ["achievement", 22], ["achievement", 23], ["achievement", 24], ["achievement", 25]]],
     ["row", [["achievement", 26], ["achievement", 27], ["achievement", 28], ["achievement", 29], ["achievement", 30]]],
     ["row", [["achievement", 31], ["achievement", 32], ["achievement", 33], ["achievement", 34], ["achievement", 35]]],
     ["row", [["achievement", 36], ["achievement", 37], ["achievement", 38], ["achievement", 39], ["achievement", 40]]],
     ["row", [["achievement", 41], ["achievement", 42], ["achievement", 43], ["achievement", 44], ["achievement", 45]]],
     "blank",
     "blank",

     ["display-text", function() { return "~ Shadow Achievements ~"}],
  "blank",
     ["row", [["achievement", "S1"], ["achievement", "S2"], ["achievement", "S3"], ["achievement", "S4"], ["achievement", "S5"]]],
     ["row", [["achievement", "S6"], ["achievement", "S7"], ["achievement", "S8"], ["achievement", "S9"], ["achievement", "S10"]]],
     "blank",
     "blank",
     
     ["display-text", function() { return "~ Shadow Energy Achievements ~"}],
  "blank",
     ["row", [["achievement", "SE1"], ["achievement", "SE2"], ["achievement", "SE3"], ["achievement", "SE4"], ["achievement", "SE5"]]],
     "blank",
     "blank", 

     ["display-text", function() { return "~ Mystery Achievements ~"}],
     "blank",
        ["row", [["achievement", "MY1"], ["achievement", "MY2"]]],
        "blank",
        "blank", 
     
],
layerShown(){return true}
})
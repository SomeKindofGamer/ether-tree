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
        if (hasUpgrade('main', 18)) mult = mult.pow(1.65)
        if (hasUpgrade('main', 19)) mult = mult.pow(1.85)
        if (hasMilestone('shadow', 0)) mult = mult.mul(10)
        if (hasMilestone('shadow', 1)) mult = mult.pow(1.5)
        if (hasMilestone('shadow', 2)) mult = mult.mul(20)
        if (hasMilestone('shadow', 3)) mult = mult.pow(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
      let Generation = new Decimal(1)
      
      return Generation
    },
    passiveGeneration() {
        let Generation = new Decimal(1)
        return Generation
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

        16: {
          title: "Point Generator v2",
          description: "Add ^0.2 to your Point gain",
          cost: new Decimal(1e100),
        },

        17: {
          title: "MORE BUYABLES!!!",
          description: "Adds 200 to the buyable limit (1000)",
          cost: new Decimal(1e250),
        },

        18: {
          title: "Ether Generator v5",
          description: "Add ^0.65 to your Ether gain",
          cost: new Decimal(1e295),
        },

        19: {
          title: "Ether Generator MKII",
          description: "Add ^0.85 to your Ether gain",
          cost: new Decimal("1e600"),
          unlocked() {
            if (hasMilestone('shadow', 1)) return true
          }
        },

        20: {
          title: "EVEN MORE BUYABLES!!!",
          description: "Adds 250 to the buyable limit (1250)",
          cost: new Decimal("1e775"),
          unlocked() {
            if (hasMilestone('shadow', 1)) return true
          }
        },

        21: {
          title: "Darkness Lightraiser",
          description: "Earn 2x more shadow",
          cost: new Decimal("1e850"),
          unlocked() {
            if (hasMilestone('shadow', 1)) return true
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
      display() {
        return `<b style="font-size:24px">Ether Point Generator v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ether</h1>`
      },
      purchaseLimit() {
        let LimitThing = new Decimal(800)
        if (hasUpgrade('main', 17)) LimitThing = LimitThing.add(200)
        if (hasUpgrade('main', 20)) LimitThing = LimitThing.add(250)
        return LimitThing
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
        let Calculation = new Decimal(25).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Ethereal Token v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Ether Generation</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ether</h1>`
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      purchaseLimit() {
        let LimitThing = new Decimal(800)
        if (hasUpgrade('main', 17)) LimitThing = LimitThing.add(200)
        if (hasUpgrade('main', 20)) LimitThing = LimitThing.add(250)
        return LimitThing
      },
      buy() {
        player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(1.25, x.pow(1)))
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
      "main tab": {
        content:
        ["main-display",
        "resource-display",
        "blank", 
        "buyables", 
        "blank", 
        "upgrades",]
  
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
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.0015, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      if (hasUpgrade('main', 21)) mult = mult.mul(2)
      if (hasMilestone('shadow', 3)) mult = mult.mul(2)
      return mult
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
      effectDescription: "^1.5 ether gain and unlock 3 more upgrades",
      done() {
        return player.shadow.points.gte(3)
      }
    },

    2: {
      requirementDescription: "Get 50 shadows",
      effectDescription: "x20 ether gain",
      done() {
        return player.shadow.points.gte(50)
      }
    },

    3: {
      requirementDescription: "Get 500 shadows",
      effectDescription: "^2 ether gain and 2x shadow gain",
      done() {
        return player.shadow.points.gte(500)
      }
    },
    
  },

  row: 1, // Row the layer is in on the tree (0 is the first row)
  layerShown(){return hasAchievement("a", 25)},

  tabFormat: {
    "main tab": {
      content:
      ["main-display",
      "resource-display",
      ["prestige-button", "", {'width': '250px', 'height': '150px'}], 
      "blank", 
      "milestones", 
      "blank", 
      "upgrades",]

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
  name: "this is EXTREMELY alot of ether",
  done() {return player.main.points.gte("1e1500")},
  tooltip: "Get 1e1500 ether", // Showed when the achievement is completed
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



  },

  tabFormat: [
    ["display-text", function() { return "<MA style='font-size: 25px'>Achievements: " + player.a.achievements.length + " / " + (Object.keys(tmp.a.achievements).length - 2) }],
    "blank", 
    "blank",
    ["display-text", function() { return "Ether Achievements"}],
    "blank",
       ["row", [["achievement", 11], ["achievement", 12], ["achievement", 13], ["achievement", 14]]],
       ["row", [["achievement", 15], ["achievement", 16], ["achievement", 17], ["achievement", 18]]],
       ["row", [["achievement", 19], ["achievement", 20], ["achievement", 21], ["achievement", 22]]],
       ["row", [["achievement", 23], ["achievement", 24], ["achievement", 25], ["achievement", 26]]],
       ["row", [["achievement", 27], ["achievement", 28], ["achievement", 29], ["achievement", 30]]],
       ["row", [["achievement", 31], ["achievement", 32], ["achievement", 33], ["achievement", 34]]],
       "blank",
       "blank",

       ["display-text", function() { return "Shadow Achievements"}],
    "blank",
       ["row", [["achievement", "S1"], ["achievement", "S2"], ["achievement", "S3"], ["achievement", "S4"]]],
       ["row", [["achievement", "S5"], ["achievement", "S6"], ["achievement", "S7"], ["achievement", "S8"]]],
       "blank",
       "blank",
],
layerShown(){return true}
})
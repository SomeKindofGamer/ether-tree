let modInfo = {
	name: "The Ethereal Tree",
	id: "Ethereal",
	author: "Shibified (Shoober)",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.0.1",
	name: "Ethereal Tree",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1.0.1</h3><br>
		- Super Ether 30 now unlocks some new upgrades!<br>
		- 2 new shadow and shadow energy milestones <br>
		- Added 5 new ether achievements and 1 new mystery achievement (ooo what a mystery!)<br>
		- Fixed Shadow Energy achievement saying power.<br>
		`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
		let gain = new Decimal(1)

		gain = gain.mul(buyableEffect('main', 11))
		if (hasUpgrade('main', 11)) gain = gain.times(2)
		if (hasUpgrade('main', 21)) gain = gain.pow(1.2)
		if (hasMilestone('seth', 4)) gain = gain.mul(5)
		if (hasMilestone('seth', 5)) gain = gain.mul(20)
		if (hasMilestone('seth', 7)) gain = gain.mul(50)
		if (hasMilestone('seth', 8)) gain = gain.pow(1.5)
		if (hasMilestone('seth', 9)) gain = gain.mul(25)
		
		
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
class Item {
	constructor(config){
		this.name = config.name || 'Unknown';
		this.imgRef = config.imgRef;
		this.amount = config.amount || 0;
		this.totalAmount = config.totalAmount || 1;
		this.type = config.type || 'Unknown';
		this.info = config.info || 'No information';
		this.attack = config.attack || 0;
		this.defense = config.defense || 0;
		this.speed = config.speed || 0;
		this.slots = config.slots || 0;
		this.life = config.life || 0;
		this.health = config.health || 0;
		this.mana = config.mana || 0;
		this.level = config.level || 0;
		this.buy = config.buy || false;
		this.sell = config.sell || false;
		this.actionName = config.actionName || false;
		this.drop = 'Drop'
		this.action = config.action || false;
		this.itemType = config.itemType || null;
	}
}
const type = ['Shield','Sword','Bow','Wand','Coin','Weapon','Ammunition','Teleporter','Key','Regenerative Potion','Magic Potion','Backpack'];


var items = [
new Item({
	name: 'Gold',
	imgRef: {sx: 130,sy: 211,sD: 15,sH: 14},
	totalAmount: 999999999,
	type: type[1],
	info: 'Everything can be exchanged for gold, have enough',
	action: function(){},
	itemType: 0
}),
new Item({
	name: 'Diamond',
	imgRef: {sx: 34,sy: 419,sD: 16,sH: 14},
	totalAmount: 999999999,
	type: type[1],
	info: 'They are valuble and rare',
	action: function(){},
	itemType: 1
}),
new Item({
	name: 'Health Potion',
	imgRef: {sx: 37,sy: 162,sD: 9,sH: 16},
	totalAmount: 200,
	type: type[6],
	info: 'Instant health',
	health: 90,
	buy: {diamond: 0, gold: 50},
	sell: {diamond: 0, gold: 25},
	actionName: 'Use',
	action: function(){
		console.log('Hp: ' + players[gameStates.currentPlayer].attributes.stats.hp);
		
		if(players[gameStates.currentPlayer].attributes.stats.hp == players[gameStates.currentPlayer].attributes.stats.hpMax){
			console.log('Current Hp: ' + players[gameStates.currentPlayer].attributes.stats.hp);
			return 0;
		};
		
		players[gameStates.currentPlayer].attributes.stats.hp = players[gameStates.currentPlayer].attributes.stats.hp + 100;
		if(players[gameStates.currentPlayer].attributes.stats.hp > players[gameStates.currentPlayer].attributes.stats.hpMax){
			players[gameStates.currentPlayer].attributes.stats.hp = players[gameStates.currentPlayer].attributes.stats.hpMax;
		};
		console.log('Current Hp: ' + players[gameStates.currentPlayer].attributes.stats.hp);
		return 1;
	},
	itemType: 2
}),
new Item({
	name: 'Mana Potion',
	imgRef: {sx: 5,sy: 162,sD: 9,sH: 16},
	totalAmount: 200,
	type: type[6],
	info: 'Instant mana',
	mana: 90,
	buy: {diamond: 0, gold: 50},
	sell: {diamond: 0, gold: 25},
	actionName: 'Use',
	action: function(){
		console.log('Mp: ' + players[gameStates.currentPlayer].attributes.stats.mp);
		
		if(players[gameStates.currentPlayer].attributes.stats.mp == players[gameStates.currentPlayer].attributes.stats.mpMax){
			console.log('Current Mp: ' + players[gameStates.currentPlayer].attributes.stats.mp);
			return 0;
		};
		
		players[gameStates.currentPlayer].attributes.stats.mp = players[gameStates.currentPlayer].attributes.stats.mp + 100;
		if(players[gameStates.currentPlayer].attributes.stats.mp > players[gameStates.currentPlayer].attributes.stats.mpMax){
			players[gameStates.currentPlayer].attributes.stats.mp = players[gameStates.currentPlayer].attributes.stats.mpMax;
		};
		console.log('Current Mp: ' + players[gameStates.currentPlayer].attributes.stats.mp);
		return 1;
	},
	itemType: 3
}),
new Item({
	name: 'Shield',
	imgRef: {sx: 3,sy: 322,sD: 15,sH: 15},
	totalAmount: 1,
	type: type[0],
	info: 'Protect you in combat',
	defense: 16,
	actionName: 'Equip',
	action: function(){},
	itemType: 4
}),
new Item({
	name: 'Sword',
	imgRef: {sx: 4,sy: 308,sD: 13,sH: 13},
	totalAmount: 1,
	type: type[1],
	info: 'Simple weapon, but powerful',
	attack: 15,
	actionName: 'Equip',
	action: function(){},
	itemType: 5
}),
new Item({
	name: 'Bag',
	imgRef: {sx: 83,sy: 210,sD: 14,sH: 15},
	totalAmount: 1,
	type: type[11],
	info: 'Carry items with you',
	slots: 14,
	sell: {diamond: 0, gold: 40},
	actionName: 'Equip',
	action: function(){},
	itemType: 6
})
];
/*items[0].image.src = "images/inventory/items/ouro.png";
items[1].image.src = "images/inventory/items/diamante.png";
items[2].image.src = "images/inventory/items/healthPotion.png";
items[3].image.src = "images/inventory/items/manaPotion.png";
items[4].image.src = "images/inventory/items/escudo.png";
items[5].image.src = "images/inventory/items/espada.png";
items[6].image.src = "images/inventory/items/bolsa.png";*/
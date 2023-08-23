console.log('Running!');

const cnv = document.getElementById('myCanvas');
const ctx = cnv.getContext('2d');
cnv.width = config.tileScreenX * config.tile;
cnv.height = config.tileScreenY * config.tile;




var gameStates = {
	main: true,
	inventory: false,
	selectedItem: false,
	currentPlayer: 0,
	takeItem: {
		left: false,
		right: false,
		up: false,
		down: false,
		center: false
	}
}
gameStates.currentMap = 0;


function abs(){
	players[gameStates.currentPlayer].currentframe = (players[gameStates.currentPlayer].currentframe === 1) ? 2 : 1;
	setTimeout(abs,200)
}
setTimeout(abs,200)


var lastKeyPressed;
document.body.onkeydown = function(e){
	lastKeyPressed = e.keyCode;
	//console.log(e);
};

function updateGame(){
	//Main
	if(gameStates.main){
		//Open inventory
		if(lastKeyPressed == 73){
			gameStates.inventory = true;
			gameStates.main = false;
			lastKeyPressed = -1;
		};

		//Move player
		if(lastKeyPressed == 37){
			players[gameStates.currentPlayer].moveLeft();
			lastKeyPressed = -1;
		};
		if(lastKeyPressed == 38){
			players[gameStates.currentPlayer].moveUp();
			lastKeyPressed = -1;
		};
		if(lastKeyPressed == 39){
			players[gameStates.currentPlayer].moveRight();
			lastKeyPressed = -1;
		};
		if(lastKeyPressed == 40){
			players[gameStates.currentPlayer].moveDown();
			lastKeyPressed = -1;
		};

	//Take item
		//Verification
		if(typeof maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y)][Number(players[gameStates.currentPlayer].states.position.x) - 1].item == 'object'){
			gameStates.takeItem.left = true;
		}else{gameStates.takeItem.left = false;}; 
		
		if(typeof maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y)][Number(players[gameStates.currentPlayer].states.position.x) + 1].item == 'object'){
			gameStates.takeItem.right = true;
		}else{gameStates.takeItem.right = false;}; 

		if(typeof maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y)  - 1][Number(players[gameStates.currentPlayer].states.position.x)].item == 'object'){
			gameStates.takeItem.up = true;
		}else{gameStates.takeItem.up = false;}; 

		if(typeof maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y)  + 1][Number(players[gameStates.currentPlayer].states.position.x)].item == 'object'){
			gameStates.takeItem.down = true;
		}else{gameStates.takeItem.down = false;}; 

		if(typeof maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y)][Number(players[gameStates.currentPlayer].states.position.x)].item == 'object'){
			gameStates.takeItem.center = true;
		}else{gameStates.takeItem.center = false;};

		//Action
		if(gameStates.takeItem.left == true && lastKeyPressed == 84){
			//Add to backpack
			players[gameStates.currentPlayer].backpack.addItem(
				items[Number(maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y)][Number(players[gameStates.currentPlayer].states.position.x) - 1].item.itemType)],
				Number(maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y)][Number(players[gameStates.currentPlayer].states.position.x) - 1].item.amount)
			);

			//Remove from map
			maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y)][Number(players[gameStates.currentPlayer].states.position.x) - 1].item = false;
			
			gameStates.takeItem.left = false;

			//Reset last click
			lastKeyPressed = -1;
		};
		
		if(gameStates.takeItem.right == true && lastKeyPressed == 84){
			//Add to backpack
			players[gameStates.currentPlayer].backpack.addItem(
				items[Number(maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y)][Number(players[gameStates.currentPlayer].states.position.x) + 1].item.itemType)],
				Number(maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y)][Number(players[gameStates.currentPlayer].states.position.x) + 1].item.amount)
			);

			//Remove from map
			maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y)][Number(players[gameStates.currentPlayer].states.position.x) + 1].item = false;
			
			gameStates.takeItem.left = false;

			//Reset last click
			lastKeyPressed = -1;
		};

		if(gameStates.takeItem.up == true && lastKeyPressed == 84){
			//Add to backpack
			players[gameStates.currentPlayer].backpack.addItem(
				items[Number(maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y) - 1][Number(players[gameStates.currentPlayer].states.position.x)].item.itemType)],
				Number(maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y) - 1][Number(players[gameStates.currentPlayer].states.position.x)].item.amount)
			);

			//Remove from map
			maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y) - 1][Number(players[gameStates.currentPlayer].states.position.x)].item = false;
			
			gameStates.takeItem.up = false;

			//Reset last click
			lastKeyPressed = -1;
		};

		if(gameStates.takeItem.down == true && lastKeyPressed == 84){
			//Add to backpack
			players[gameStates.currentPlayer].backpack.addItem(
				items[Number(maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y) + 1][Number(players[gameStates.currentPlayer].states.position.x)].item.itemType)],
				Number(maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y) + 1][Number(players[gameStates.currentPlayer].states.position.x)].item.amount)
			);

			//Remove from map
			maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y) + 1][Number(players[gameStates.currentPlayer].states.position.x)].item = false;
			
			gameStates.takeItem.down = false;

			//Reset last click
			lastKeyPressed = -1;
		};

		if(gameStates.takeItem.center == true && lastKeyPressed == 84){
			//Add to backpack
			players[gameStates.currentPlayer].backpack.addItem(
				items[Number(maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y)][Number(players[gameStates.currentPlayer].states.position.x)].item.itemType)],
				Number(maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y)][Number(players[gameStates.currentPlayer].states.position.x)].item.amount)
			);

			//Remove from map
			maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y)][Number(players[gameStates.currentPlayer].states.position.x)].item = false;
			
			gameStates.takeItem.center = false;

			//Reset last click
			lastKeyPressed = -1;
		};
	};

	//Inventory
	if(gameStates.inventory){
		//Close inventory
		if(lastKeyPressed == 27 ){
			gameStates.inventory = false;
			gameStates.main = true;
			lastKeyPressed = -1;
		};
		
		//Select item
		if(lastKeyPressed == 37 || lastKeyPressed == 65){
			players[gameStates.currentPlayer].backpack.previous();
			lastKeyPressed = -1;
		};
		if(lastKeyPressed == 38 || lastKeyPressed == 87){
			
			lastKeyPressed = -1;
		};
		if(lastKeyPressed == 39 || lastKeyPressed == 68){
			players[gameStates.currentPlayer].backpack.next();
			lastKeyPressed = -1;
		};
		if(lastKeyPressed == 40 || lastKeyPressed == 83){
			
			lastKeyPressed = -1;
		};

		//Selected item
		if(lastKeyPressed == 13){
			if(players[gameStates.currentPlayer].backpack.items.length == 0){return;};
			gameStates.inventory = false;
			gameStates.selectedItem = true;
			lastKeyPressed = -1;
		};
	};

	//Item selected
	if(gameStates.selectedItem){
		//Close
		if(lastKeyPressed == 27 ){
			gameStates.inventory = true;
			gameStates.selectedItem = false;
			lastKeyPressed = -1;
		};

		//Item action
		if(lastKeyPressed == 69 ){
			gameStates.inventory = true;
			gameStates.selectedItem = false;
			players[gameStates.currentPlayer].backpack.action(true);
			lastKeyPressed = -1;
		};
		//Item drop
		if(lastKeyPressed == 81){
			gameStates.inventory = true;
			gameStates.selectedItem = false;
			players[gameStates.currentPlayer].backpack.action(false);
			lastKeyPressed = -1;
		};
	};
};
function render(){
	//Clear the screen for a new frame
	ctx.clearRect(0,0,cnv.width,cnv.height);

	//Render current map
	maps[gameStates.currentMap].draw();

	//Render player
	players[gameStates.currentPlayer].draw();
	players[gameStates.currentPlayer].drawHUD();
	players[gameStates.currentPlayer].drawMiniHUD();

	//Render inventory
	if(gameStates.inventory){
		players[gameStates.currentPlayer].backpack.draw();
	};

	//Render selected item
	if(gameStates.selectedItem){
		players[gameStates.currentPlayer].backpack.itemSelectedDraw()
	};
};
function loop(){
	updateGame();
	render();
	window.requestAnimationFrame(loop);
};
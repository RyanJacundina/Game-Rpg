class Map{
	constructor(config){
		this.x = config.x || 0;
		this.y = config.y || 0;
		this.mapImage = config.mapImage;
		this.draw = function(){
			//Draw map
			ctx.drawImage(
				this.mapImage,
				this.x,
				this.y
			);

			//Draw items
			var objX = this.x;
			var objY = this.y;
			var tileSize = 26
			for(var y in maps[gameStates.currentMap].data){
				for(var x in maps[gameStates.currentMap].data[y]){
					var obj = maps[gameStates.currentMap].data[y][x];

					objX = x * tileSize + this.x;
					objY = y * tileSize + this.y;

					// If items
					if(typeof obj.item == 'object'){
						function checkAdditionalSD(amount){
							if(amount == 9){
								return 8;
							}else if(amount == 15){
								return 6;
							}else if(amount == 16){
								return 5;
							}else if(amount == 15){
								return 12;
							}else if(amount == 13){
								return 7;
							};
							return 12;
						};

						function checkAdditionalSH(amount){
							if(amount == 16){
								return 5;
							}else if(amount == 14){
								return 5;
							}else if(amount == 14){
								return 13;
							}else if(amount == 15){
								return 5;
							}else if(amount == 13){
								return 6;
							};
							return 12;
						};

						const additionalSD = checkAdditionalSD(obj.item.imgRef.sD);
						const additionalSH = checkAdditionalSH(obj.item.imgRef.sH);

						ctx.drawImage(
							packImage,
							obj.item.imgRef.sx,
							obj.item.imgRef.sy,
							obj.item.imgRef.sD,
							obj.item.imgRef.sH,
							objX + additionalSD,
							objY + additionalSH,
							obj.item.imgRef.sD,
							obj.item.imgRef.sH
						);

						//Draw amount
							//Config text
							ctx.fillStyle = 'white';
							ctx.font = 'bold 10px "PixelatedFont", monospace';
							//ctx.imageSmoothingEnabled = false;
						ctx.textAlign = 'center';
						if(obj.item.amount != 1){

						function checkAdditional(amount){
							const amountToString = amount.toString();
							if(amountToString.length == 1){
								return 17;
							}else if(amountToString.length == 2){
								return 15;
							}else if(amountToString.length == 3){
								return 12;
							}else if(amountToString.length == 4){
								return 12;
							};
							return 12;
						};
			
						const additional = checkAdditional(obj.item.amount);
						ctx.fillText(
							obj.item.amount, 
							objX + additional, 
							objY + 20
						); // Adjust the vertical position as needed
						};
						/*console.log(obj.item.imgRef.sx)
						console.log(obj.item.imgRef)
						console.log(objX)
						console.log(objY)*/
					};

					// If player
					if(typeof obj.player == 'object' && obj.player.id != gameStates.currentPlayer){
						if(obj.player.id != 0){
				//Body
				//console.log(obj.player.states.positionOnMap.x)
				//console.log(objX)
				ctx.drawImage(
					charactersImage,
					obj.player.playerStateImgRef.idle.down.body.sx,
					obj.player.playerStateImgRef.idle.down.body.sy,
					obj.player.playerStateImgRef.idle.down.body.sD,
					obj.player.playerStateImgRef.idle.down.body.sH,
					obj.player.states.positionOnMap.x + 5,
					obj.player.states.positionOnMap.y + 14,
					obj.player.playerStateImgRef.idle.down.body.sD,
					obj.player.playerStateImgRef.idle.down.body.sH
				);
				//Head
				ctx.drawImage(
					charactersImage,
					obj.player.playerStateImgRef.idle.down.head.sx,
					obj.player.playerStateImgRef.idle.down.head.sy,
					obj.player.playerStateImgRef.idle.down.head.sD,
					obj.player.playerStateImgRef.idle.down.head.sH,
					obj.player.states.positionOnMap.x + 5,
					obj.player.states.positionOnMap.y,
					obj.player.playerStateImgRef.idle.down.head.sD,
					obj.player.playerStateImgRef.idle.down.head.sH
				);
				//Shield
				ctx.drawImage(
					charactersImage,
					obj.player.playerStateImgRef.idle.down.shield.sx,
					obj.player.playerStateImgRef.idle.down.shield.sy,
					obj.player.playerStateImgRef.idle.down.shield.sD,
					obj.player.playerStateImgRef.idle.down.shield.sH,
					obj.player.states.positionOnMap.x + 14,
					obj.player.states.positionOnMap.y + 14,
					obj.player.playerStateImgRef.idle.down.shield.sD,
					obj.player.playerStateImgRef.idle.down.shield.sH
				);
				//Sword
				ctx.drawImage(
					charactersImage,
					obj.player.playerStateImgRef.idle.down.sword.sx,
					obj.player.playerStateImgRef.idle.down.sword.sy,
					obj.player.playerStateImgRef.idle.down.sword.sD,
					obj.player.playerStateImgRef.idle.down.sword.sH,
					obj.player.states.positionOnMap.x + 4,
					obj.player.states.positionOnMap.y + 7,
					obj.player.playerStateImgRef.idle.down.sword.sD,
					obj.player.playerStateImgRef.idle.down.sword.sH
				);
						};
					};
					
				};
			};
		};
		this.checkCurrentPlayerPosition = function (){
			for(var y in maps[0].data){
				for(var x in maps[0].data[y]){
					if(maps[0].data[y][x].player == players[gameStates.currentPlayer]){
						console.log(maps[0].data[y][x])

						console.log('y: ' + y);
						console.log('x: ' + x)
					};
				};
			};
		};
	};
};

var maps = [];

function createMaps(){
	maps.push(new Map({
		x: -26 * 2, y: -26 * 4, 
		mapImage: mapImage
	}));
	maps[0].data =  [
			[1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
			[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		];
	console.log(players)
	for(var y in maps[0].data){
		for(var x in maps[0].data[y]){
			if(maps[0].data[y][x] == 1){
				maps[0].data[y][x] = new GameObject({
					collision: true
				});
			};
			if(maps[0].data[y][x] == 0){
				maps[0].data[y][x] = new GameObject({});
			};
			if(maps[0].data[y][x] == 2){
				maps[0].data[y][x] = new GameObject({
					player: players[gameStates.currentPlayer]
				});
				maps[0].data[y][x].player.position();
				console.log(maps[0].data[y][x])
				console.log('y:' + y);
				console.log('x: ' + x)
			};
			if(maps[0].data[y][x] == 3){
				maps[0].data[y][x] = new GameObject({
					item: players[gameStates.currentPlayer].backpack.items[0]
				});
				console.log(typeof maps[0].data[y][x].item)
			};
			if(maps[0].data[y][x] == 4){
				maps[0].data[y][x] = new GameObject({
					player: players[1]
				});
				maps[0].data[y][x].player.position();
			};
		};
	};
};
class Inventory{
	constructor(){
		this.items = [];
		this.slot = {sx: 2, sy: 630,sD: 21, sH: 649};
		this.select = {selected: false, position: 0};
		this.button = {
			red: {sx: 243, sy: 677, sD: 50,sH: 26},
			green: {sx: 243, sy: 703, sD: 50,sH: 26}, 
			blue: {sx: 243, sy: 729, sD: 50,sH: 26}
		};
		this.armor = {
			sword: {
				item: {}, 
				empty: {true: true,sx: 84,sy: 404,sD: 13,sH: 13}
			},
			bow: {
				item: {}, 
				empty: {true: true,sx: 114,sy: 402,sD: 16,sH: 16}
			},
			wand: {
				item: {}, 
				empty: {true: true,sx: 130,sy: 402,sD: 16,sH: 16}
			},
			shield: {
				item: {}, 
				empty: {true: true,sx: 99,sy: 402,sD: 15,sH: 15}
			},
			backpack: {
				item: {}, 
				empty: {true: true,sx: 226,sy: 402,sD: 16,sH: 16}
			},
			helmet: {
				item: {}, 
				empty: {true: true,sx: 4,sy: 388,sD: 12,sH: 13}
			},
			breastplate: {
				item: {}, 
				empty: {true: true,sx:18 ,sy: 387,sD: 16,sH: 14}
			},
			rightGlove: {
				item: {}, 
				empty: {true: true,sx: 82,sy: 386,sD: 16,sH: 16}
			},
			leftGlove: {
				item: {}, 
				empty: {true: true,sx: 98,sy: 386,sD: 16,sH: 16}
			},
			pants: {
				item: {}, 
				empty: {true: true,sx: 50,sy: 386,sD: 16,sH: 16}
			},
			boots: {
				item: {}, 
				empty: {true: true,sx: 68,sy: 387,sD: 12,sH: 15}
			},
			belt: {
				item: {}, 
				empty: {true: true,sx: 34,sy: 387,sD: 16,sH: 13}
			},
			necklace: {
				item: {}, 
				empty: {true: true,sx: 115,sy: 386,sD: 14,sH: 16}
			},
			ring: {
				item: {}, 
				empty: {true: true,sx: 131,sy: 387,sD: 14,sH: 14}
			}
		}
	};
	
	hasItem(name){
		var hasItem = -1;
		for(var x in this.items){
			if(this.items[x].name == name){
				hasItem = x;
			};
		};
		return hasItem;
	};
	addItem(item, amount){
		const clonedItem = {...item};
		clonedItem.position = this.items.length;
		const hasItem = this.hasItem(item.name);
		console.log(hasItem)
		console.log(item.name)
		if(item.totalAmount == 1){amount = 1;};

		//If has the item and item's total capacity is bigger than 1
		if(hasItem != -1 && this.items[hasItem].totalAmount > 1){
			//
			var max = this.items[hasItem].totalAmount;
			console.log('max = ' + max);
			//Empty space
			var sub = max - this.items[hasItem].amount;
			console.log('sub = ' + sub);
			//Used space
			var diference = max- sub;
			console.log('diference = ' + diference);
			if(sub > amount){
				sub = sub - amount;
				this.items[hasItem].amount = this.items[hasItem].amount + amount;	
				return this.items.length;
			}else{
				this.items[hasItem].amount = this.items[hasItem].totalAmount;
				amount = amount - sub;
				clonedItem.amount = amount;
				this.items.push(clonedItem);
				return this.items.length;
			};
			console.log('amount = ' + amount)

			
			if(amount != 0){
			clonedItem.amount = amount;
			this.items.push(clonedItem);
			}
		}else{
			if(amount != 0){
			clonedItem.amount = amount;
			this.items.push(clonedItem);
			return this.items.length;
			}else{return false;};
		};
	};
	removeItem(position){
		for(var i = 0; i <= this.items.length; i++){
			return this.items.splice(position,1);
		};
		return false;
	};
	draw(){
		ctx.drawImage(modalImage,0,0);

	//Config text
		ctx.fillStyle = 'white';
		ctx.font = 'bold 10px "PixelatedFont", monospace';
		//ctx.imageSmoothingEnabled = false;
		ctx.textAlign = 'center';

	//DrawArmor
		//Variables
		const xy = 26 + 2;
		const shift = 14;
		var posX = xy * 2 - shift;
		var posY = xy * 2 + 15;
		
		//Draw slots
		ctx.drawImage(packImage,153,571,26,26,posX,posY,26,26);
		posX = posX + xy;
		ctx.drawImage(packImage,153,571,26,26,posX,posY,26,26);
		posX = posX + xy;
		ctx.drawImage(packImage,153,571,26,26,posX,posY,26,26);
		posX = posX + xy;
		ctx.drawImage(packImage,153,571,26,26,posX,posY,26,26);
		posX = xy * 2 - shift;
		posY = posY + xy;
		ctx.drawImage(packImage,153,571,26,26,posX,posY,26,26);
		posX = posX + xy;
		ctx.drawImage(packImage,153,571,26,26,posX,posY,26,26);
		posX = posX + xy;
		ctx.drawImage(packImage,153,571,26,26,posX,posY,26,26);
		posX = posX + xy;
		ctx.drawImage(packImage,153,571,26,26,posX,posY,26,26);
		posX = xy * 2 - shift;
		posY = posY + xy;
		ctx.drawImage(packImage,153,571,26,26,posX,posY,26,26);
		posX = posX + xy;
		ctx.drawImage(packImage,153,571,26,26,posX,posY,26,26);
		posX = posX + xy;
		ctx.drawImage(packImage,153,571,26,26,posX,posY,26,26);
		posX = posX + xy;
		ctx.drawImage(packImage,153,571,26,26,posX,posY,26,26);
		posX = xy * 2 - shift;
		posY = posY + xy;
		ctx.drawImage(packImage,153,571,26,26,posX,posY,26,26);
		posX = posX + xy;
		posX = posX + xy;
		ctx.drawImage(packImage,153,571,26,26,posX,posY,26,26);

		//Reset variables
		var posX = xy * 2 - shift;
		var posY = xy * 2 + 15;

		//Draw items
		if(this.armor.sword.empty.true){
			ctx.drawImage(
				packImage,
				this.armor.sword.empty.sx,
				this.armor.sword.empty.sy,
				this.armor.sword.empty.sD,
				this.armor.sword.empty.sH,
				posX + 6,
				posY + 4,
				this.armor.sword.empty.sD,
				this.armor.sword.empty.sH
			);
		}else{
			ctx.drawImage(
				packImage,
				this.armor.sword.item.imgRef.sx,
				this.armor.sword.item.imgRef.sy,
				this.armor.sword.item.imgRef.sD,
				this.armor.sword.item.imgRef.sH,
				posX + 6,
				posY + 4,
				this.armor.sword.item.imgRef.sD,
				this.armor.sword.item.imgRef.sH
			)
			ctx.fillText(
				this.armor.sword.item.attack, 
				posX + 7, 
				posY + 22
			); // Adjust the vertical position as needed
		};

		posX = posX + xy;
		if(this.armor.necklace.empty.true){
			ctx.drawImage(
				packImage,
				this.armor.necklace.empty.sx,
				this.armor.necklace.empty.sy,
				this.armor.necklace.empty.sD,
				this.armor.necklace.empty.sH,
				posX + 6,
				posY + 4,
				this.armor.necklace.empty.sD,
				this.armor.necklace.empty.sH
			);
		}else{
			ctx.drawImage(
				packImage,
				this.armor.necklace.item.imgRef.sx,
				this.armor.necklace.item.imgRef.sy,
				this.armor.necklace.item.imgRef.sD,
				this.armor.necklace.item.imgRef.sH,
				posX + 6,
				posY + 4,
				this.armor.necklace.item.imgRef.sD,
				this.armor.necklace.item.imgRef.sH
			)
			ctx.fillText(
				this.armor.necklace.item.life, 
				posX + 7, 
				posY + 22
			); // Adjust the vertical position as needed
		};

		posX = posX + xy;
		if(this.armor.helmet.empty.true){
			ctx.drawImage(
				packImage,
				this.armor.helmet.empty.sx,
				this.armor.helmet.empty.sy,
				this.armor.helmet.empty.sD,
				this.armor.helmet.empty.sH,
				posX + 8,
				posY + 6,
				this.armor.helmet.empty.sD,
				this.armor.helmet.empty.sH
			);
		}else{
			ctx.drawImage(
				packImage,
				this.armor.helmet.item.imgRef.sx,
				this.armor.helmet.item.imgRef.sy,
				this.armor.helmet.item.imgRef.sD,
				this.armor.helmet.item.imgRef.sH,
				posX + 6,
				posY + 4,
				this.armor.helmet.item.imgRef.sD,
				this.armor.helmet.item.imgRef.sH
			)
			ctx.fillText(
				this.armor.helmet.item.defense, 
				posX + 7, 
				posY + 22
			); // Adjust the vertical position as needed
		};

		posX = posX + xy;
		if(this.armor.backpack.empty.true){
			ctx.drawImage(
				packImage,
				this.armor.backpack.empty.sx,
				this.armor.backpack.empty.sy,
				this.armor.backpack.empty.sD,
				this.armor.backpack.empty.sH,
				posX + 6,
				posY + 4,
				this.armor.backpack.empty.sD,
				this.armor.backpack.empty.sH
			);
		}else{
			ctx.drawImage(
				packImage,
				this.armor.backpack.item.imgRef.sx,
				this.armor.backpack.item.imgRef.sy,
				this.armor.backpack.item.imgRef.sD,
				this.armor.backpack.item.imgRef.sH,
				posX + 6,
				posY + 4,
				this.armor.backpack.item.imgRef.sD,
				this.armor.backpack.item.imgRef.sH
			)
			ctx.fillText(
				this.armor.backpack.item.slots, 
				posX + 7, 
				posY + 22
			); // Adjust the vertical position as needed
		};

		posX = xy * 2 - shift;
		posY = posY + xy;
		if(this.armor.shield.empty.true){
			ctx.drawImage(
				packImage,
				this.armor.shield.empty.sx,
				this.armor.shield.empty.sy,
				this.armor.shield.empty.sD,
				this.armor.shield.empty.sH,
				posX + 6,
				posY + 4,
				this.armor.shield.empty.sD,
				this.armor.shield.empty.sH
			);
		}else{
			ctx.drawImage(
				packImage,
				this.armor.shield.item.imgRef.sx,
				this.armor.shield.item.imgRef.sy,
				this.armor.shield.item.imgRef.sD,
				this.armor.shield.item.imgRef.sH,
				posX + 6,
				posY + 4,
				this.armor.shield.item.imgRef.sD,
				this.armor.shield.item.imgRef.sH
			)
			ctx.fillText(
				this.armor.shield.item.defense, 
				posX + 7, 
				posY + 22
			); // Adjust the vertical position as needed
		};

		posX = posX + xy;
		if(this.armor.rightGlove.empty.true){
			ctx.drawImage(
				packImage,
				this.armor.rightGlove.empty.sx,
				this.armor.rightGlove.empty.sy,
				this.armor.rightGlove.empty.sD,
				this.armor.rightGlove.empty.sH,
				posX + 6,
				posY + 4,
				this.armor.rightGlove.empty.sD,
				this.armor.rightGlove.empty.sH
			);
		}else{
			ctx.drawImage(
				packImage,
				this.armor.rightGlove.item.imgRef.sx,
				this.armor.rightGlove.item.imgRef.sy,
				this.armor.rightGlove.item.imgRef.sD,
				this.armor.rightGlove.item.imgRef.sH,
				posX + 6,
				posY + 4,
				this.armor.rightGlove.item.imgRef.sD,
				this.armor.rightGlove.item.imgRef.sH
			)
			ctx.fillText(
				this.armor.rightGlove.item.defense, 
				posX + 7, 
				posY + 22
			); // Adjust the vertical position as needed
		};

		posX = posX + xy;
		if(this.armor.breastplate.empty.true){
			ctx.drawImage(
				packImage,
				this.armor.breastplate.empty.sx,
				this.armor.breastplate.empty.sy,
				this.armor.breastplate.empty.sD,
				this.armor.breastplate.empty.sH,
				posX + 6,
				posY + 4,
				this.armor.breastplate.empty.sD,
				this.armor.breastplate.empty.sH
			);
		}else{
			ctx.drawImage(
				packImage,
				this.armor.breastplate.item.imgRef.sx,
				this.armor.breastplate.item.imgRef.sy,
				this.armor.breastplate.item.imgRef.sD,
				this.armor.breastplate.item.imgRef.sH,
				posX + 6,
				posY + 4,
				this.armor.breastplate.item.imgRef.sD,
				this.armor.breastplate.item.imgRef.sH
			)
			ctx.fillText(
				this.armor.breastplate.item.defense, 
				posX + 7, 
				posY + 22
			); // Adjust the vertical position as needed
		};

		posX = posX + xy;
		if(this.armor.leftGlove.empty.true){
			ctx.drawImage(
				packImage,
				this.armor.leftGlove.empty.sx,
				this.armor.leftGlove.empty.sy,
				this.armor.leftGlove.empty.sD,
				this.armor.leftGlove.empty.sH,
				posX + 6,
				posY + 4,
				this.armor.leftGlove.empty.sD,
				this.armor.leftGlove.empty.sH
			);
		}else{
			ctx.drawImage(
				packImage,
				this.armor.leftGlove.item.imgRef.sx,
				this.armor.leftGlove.item.imgRef.sy,
				this.armor.leftGlove.item.imgRef.sD,
				this.armor.leftGlove.item.imgRef.sH,
				posX + 6,
				posY + 4,
				this.armor.leftGlove.item.imgRef.sD,
				this.armor.leftGlove.item.imgRef.sH
			)
			ctx.fillText(
				this.armor.leftGlove.item.defense, 
				posX + 7, 
				posY + 22
			); // Adjust the vertical position as needed
		};

		posX = xy * 2 - shift;
		posY = posY + xy;
		if(this.armor.bow.empty.true){
			ctx.drawImage(
				packImage,
				this.armor.bow.empty.sx,
				this.armor.bow.empty.sy,
				this.armor.bow.empty.sD,
				this.armor.bow.empty.sH,
				posX + 6,
				posY + 4,
				this.armor.bow.empty.sD,
				this.armor.bow.empty.sH
			);
		}else{
			ctx.drawImage(
				packImage,
				this.armor.bow.item.imgRef.sx,
				this.armor.bow.item.imgRef.sy,
				this.armor.bow.item.imgRef.sD,
				this.armor.bow.item.imgRef.sH,
				posX + 6,
				posY + 4,
				this.armor.bow.item.imgRef.sD,
				this.armor.bow.item.imgRef.sH
			)
			ctx.fillText(
				this.armor.bow.item.attack, 
				posX + 7, 
				posY + 22
			); // Adjust the vertical position as needed
		};

		posX = posX + xy;
		if(this.armor.ring.empty.true){
			ctx.drawImage(
				packImage,
				this.armor.ring.empty.sx,
				this.armor.ring.empty.sy,
				this.armor.ring.empty.sD,
				this.armor.ring.empty.sH,
				posX + 6,
				posY + 4,
				this.armor.ring.empty.sD,
				this.armor.ring.empty.sH
			);
		}else{
			ctx.drawImage(
				packImage,
				this.armor.ring.item.imgRef.sx,
				this.armor.ring.item.imgRef.sy,
				this.armor.ring.item.imgRef.sD,
				this.armor.ring.item.imgRef.sH,
				posX + 6,
				posY + 4,
				this.armor.ring.item.imgRef.sD,
				this.armor.ring.item.imgRef.sH
			)
			ctx.fillText(
				this.armor.ring.item.life, 
				posX + 7, 
				posY + 22
			); // Adjust the vertical position as needed
		};

		posX = posX + xy;
		if(this.armor.pants.empty.true){
			ctx.drawImage(
				packImage,
				this.armor.pants.empty.sx,
				this.armor.pants.empty.sy,
				this.armor.pants.empty.sD,
				this.armor.pants.empty.sH,
				posX + 6,
				posY + 4,
				this.armor.pants.empty.sD,
				this.armor.pants.empty.sH
			);
		}else{
			ctx.drawImage(
				packImage,
				this.armor.pants.item.imgRef.sx,
				this.armor.pants.item.imgRef.sy,
				this.armor.pants.item.imgRef.sD,
				this.armor.pants.item.imgRef.sH,
				posX + 6,
				posY + 4,
				this.armor.pants.item.imgRef.sD,
				this.armor.pants.item.imgRef.sH
			)
			ctx.fillText(
				this.armor.pants.item.defense, 
				posX + 7, 
				posY + 22
			); // Adjust the vertical position as needed
		};

		posX = posX + xy;
		if(this.armor.belt.empty.true){
			ctx.drawImage(
				packImage,
				this.armor.belt.empty.sx,
				this.armor.belt.empty.sy,
				this.armor.belt.empty.sD,
				this.armor.belt.empty.sH,
				posX + 6,
				posY + 4,
				this.armor.belt.empty.sD,
				this.armor.belt.empty.sH
			);
		}else{
			ctx.drawImage(
				packImage,
				this.armor.belt.item.imgRef.sx,
				this.armor.belt.item.imgRef.sy,
				this.armor.belt.item.imgRef.sD,
				this.armor.belt.item.imgRef.sH,
				posX + 6,
				posY + 4,
				this.armor.belt.item.imgRef.sD,
				this.armor.belt.item.imgRef.sH
			)
			ctx.fillText(
				this.armor.belt.item.defense, 
				posX + 7, 
				posY + 22
			); // Adjust the vertical position as needed
		};

		posX = xy * 2 - shift;
		posY = posY + xy;
		if(this.armor.wand.empty.true){
			ctx.drawImage(
				packImage,
				this.armor.wand.empty.sx,
				this.armor.wand.empty.sy,
				this.armor.wand.empty.sD,
				this.armor.wand.empty.sH,
				posX + 6,
				posY + 4,
				this.armor.wand.empty.sD,
				this.armor.wand.empty.sH
			);
		}else{
			ctx.drawImage(
				packImage,
				this.armor.wand.item.imgRef.sx,
				this.armor.wand.item.imgRef.sy,
				this.armor.wand.item.imgRef.sD,
				this.armor.wand.item.imgRef.sH,
				posX + 6,
				posY + 4,
				this.armor.wand.item.imgRef.sD,
				this.armor.wand.item.imgRef.sH
			)
			ctx.fillText(
				this.armor.wand.item.attack, 
				posX + 7, 
				posY + 22
			); // Adjust the vertical position as needed
		};

		posX = posX + xy + xy;
		if(this.armor.boots.empty.true){
			ctx.drawImage(
				packImage,
				this.armor.boots.empty.sx,
				this.armor.boots.empty.sy,
				this.armor.boots.empty.sD,
				this.armor.boots.empty.sH,
				posX + 6,
				posY + 4,
				this.armor.boots.empty.sD,
				this.armor.boots.empty.sH
			);
		}else{
			ctx.drawImage(
				packImage,
				this.armor.boots.item.imgRef.sx,
				this.armor.boots.item.imgRef.sy,
				this.armor.boots.item.imgRef.sD,
				this.armor.boots.item.imgRef.sH,
				posX + 7,
				posY + 4,
				this.armor.boots.item.imgRef.sD,
				this.armor.boots.item.imgRef.sH
			)
			ctx.fillText(
				this.armor.boots.item.defense, 
				posX + 7, 
				posY + 22
			); // Adjust the vertical position as needed
		};

	//DrawBackPack
		//Variables
		var posX = xy * 6;
		var posY = xy * 2 + 15;

		//Draw slots
		for(var i = 0; i < this.armor.backpack.item.slots; i++){
			if(this.select.position == i){
				ctx.drawImage(packImage,153,571,26,26,posX - 1,posY - 1,28,28);
			}else{
				ctx.drawImage(packImage,153,571,26,26,posX,posY,26,26);
			};
			if(posX == xy * 13){
				posY = posY + xy;
				posX = xy * 6;
			}else{
				posX = posX + xy;
			};
	
		};
		//Reset variables
		posX = xy * 6 ;
		posY = xy * 2+ 15;

		//Draw items
		for(var j = 0; j < this.items.length; j++){
			//Draw item
			ctx.drawImage(
				packImage, 
				this.items[j].imgRef.sx,
				this.items[j].imgRef.sy,
				this.items[j].imgRef.sD,
				this.items[j].imgRef.sH, 
				posX + 6, 
				posY + 4,
				this.items[j].imgRef.sD,
				this.items[j].imgRef.sH
			);
			
			
			//Draw amount
			if(this.items[j].amount != 1){

			function checkAdditional(amount){
				const amountToString = amount.toString();
				if(amountToString.length == 1){
					return 4;
				}else if(amountToString.length == 2){
					return 7;
				}else if(amountToString.length == 3){
					return 9;
				}else if(amountToString.length == 4){
					return 12;
				};
				return 12;
			};
			
			const additional = checkAdditional(this.items[j].amount);
			ctx.fillText(
				this.items[j].amount, 
				posX + additional, 
				posY + 22
			); // Adjust the vertical position as needed
			};
			
			//Config variables
			if(posX == xy * 13){
				posY = posY + xy;
				posX = xy * 6;
			}else{
				posX = posX + xy;
			};
		};

	};
	equipAction(position){
		position = position;
		if(this.items[position].actionName == 'Equip'){
			var armor = this.items[position].type;
			armor = armor.toLowerCase();
			console.log(armor)

			//Check if the slot armor is empty
			if(this.armor[armor].empty.true == true){
				this.armor[armor].item = {...this.items[position]};
				this.removeItem(position);
				this.armor[armor].empty.true = false;

				return true;
			}else{
				this.addItem(this.armor[armor].item);
				this.armor[armor].item = {...this.items[position]};
				this.removeItem(position);

				return true;
			};
		}else{
			return false;
		};
	};
	selectAction(position){
		if(this.items[position].actionName == 'Select'){
			return true;
		}else{
			return false;
		};
	};
	useAction(position){
		if(this.items[position].actionName == 'Use'){
			const result = this.items[position].action();
			if(result == 1){
				this.items[position].amount--;
			}
			if(this.items[position].amount == 0){
				this.removeItem(position);
			};
			return true;
		}else{
			return false;
		};
	};
	dropAction(position){
		this.select.position = 0;
		//Check area around
		//Left
		var left = maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y)][Number(players[gameStates.currentPlayer].states.position.x) - 1]
		if(typeof left.player == 'object'){}else if(left.collision == true){}else if(typeof left.item == 'object'){}else{maps[gameStates.currentMap].data[players[gameStates.currentPlayer].states.position.y][Number(players[gameStates.currentPlayer].states.position.x) - 1].item = this.items[position];
		this.removeItem(position);return;};
		//Right
		var right = maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y)][Number(players[gameStates.currentPlayer].states.position.x) + 1]
		if(typeof right.player == 'object'){}else if(right.collision == true){}else if(typeof right.item == 'object'){}else{maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y)][Number(players[gameStates.currentPlayer].states.position.x) + 1].item = this.items[position];
		this.removeItem(position);return;};
		//Up
		var up = maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y) - 1][Number(players[gameStates.currentPlayer].states.position.x)]
		if(typeof up.player == 'object'){}else if(up.collision == true){}else if(typeof up.item == 'object'){}else{maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y) - 1][Number(players[gameStates.currentPlayer].states.position.x)].item = this.items[position];
		this.removeItem(position);return;};
		//Down
		var down = maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y) + 1][Number(players[gameStates.currentPlayer].states.position.x)]
		if(typeof down.player == 'object'){}else if(down.collision == true){}else if(typeof down.item == 'object'){}else{maps[gameStates.currentMap].data[Number(players[gameStates.currentPlayer].states.position.y) + 1][Number(players[gameStates.currentPlayer].states.position.x)].item = this.items[position];
		this.removeItem(position);return;};



		
		console.log(this.items[position])
		

		
	};
	next(){
		if(this.items.length == 0){return;};
		if(this.select.position == this.items.length - 1){
			this.select.position = 0;
		}else{
			this.select.position++;
		}
	};
	previous(){
		if(this.items.length == 0){return;};
		if(this.select.position == 0){
			this.select.position = this.items.length - 1;
		}else{
			this.select.position--
		};
	};
	itemSelectedDraw(){
		if(this.items.length == 0){return;};
		this.select.selected = true;

		//Config text
		ctx.fillStyle = 'white';
		ctx.font = 'bold 10px "PixelatedFont", monospace';
		//ctx.imageSmoothingEnabled = false;
		ctx.textAlign = 'center';

		//Variables
		const xy = 26;
		var posX = xy * 8;
		var posY = xy * 1 + (xy / 2);
		var j = this.select.position;

		//Modal
		ctx.drawImage(modalImage,0,0);

		//Draw slot
		ctx.drawImage(packImage,153,571,26,26,posX - 1,posY - 1,28,28);
		//Draw item
		ctx.drawImage(
				packImage, 
				this.items[j].imgRef.sx,
				this.items[j].imgRef.sy,
				this.items[j].imgRef.sD,
				this.items[j].imgRef.sH, 
				posX + 6, 
				posY + 4,
				this.items[j].imgRef.sD,
				this.items[j].imgRef.sH
		);

		//Draw amount
			if(this.items[j].amount != 1){

			function checkAdditional(amount){
				const amountToString = amount.toString();
				if(amountToString.length == 1){
					return 4;
				}else if(amountToString.length == 2){
					return 7;
				}else if(amountToString.length == 3){
					return 9;
				}else if(amountToString.length == 4){
					return 12;
				};
				return 12;
			};
			
			const additional = checkAdditional(this.items[j].amount);
			ctx.fillText(
				this.items[j].amount, 
				posX + additional, 
				posY + 22
			);
			};

		//Draw name

			//Config text
			ctx.fillStyle = 'white';
			ctx.font = 'bold 12px "PixelatedFont", monospace';
			//ctx.imageSmoothingEnabled = false;
			ctx.textAlign = 'center';

		var text = this.items[j].name;
		var textWidth = ctx.measureText(text).width;
		var slotCenterX = posX + 14;
		var textX = slotCenterX - (textWidth / 2) + xy / 2;
		var textY = posY + (xy / 2) + xy - 3;

		ctx.fillText(
			text, 
			textX, 
			textY
		);

		//Draw buttons
			//Config text
			ctx.fillStyle = 'white';
			ctx.font = 'bold 15px "PixelatedFont", monospace';
			//ctx.imageSmoothingEnabled = false;
			ctx.textAlign = 'center';

			var action = this.items[j].actionName;
			var drop = this.items[j].drop;
		
		if(action == false){
			//Config variables
			posX = 26 * 7;
			posY = 26 * 6;

			ctx.drawImage(
				packImage,
				this.button.red.sx,
				this.button.red.sy,
				this.button.red.sD,
				this.button.red.sH, 
				posX, 
				posY, 
				this.button.red.sD + xy,
				this.button.red.sH 
			);

			ctx.fillText(
				drop + '(Q)',
				posX + xy + 11,
				posY + 18
			);
		};
		if(action == 'Equip'){
			//Config variables
			posX = 26 * 9;
			posY = 26 * 6;

			ctx.drawImage(
				packImage,
				this.button.red.sx,
				this.button.red.sy,
				this.button.red.sD,
				this.button.red.sH, 
				posX, 
				posY, 
				this.button.red.sD + xy,
				this.button.red.sH 
			);

			ctx.fillText(
				drop + '(Q)',
				posX + xy + 11,
				posY + 18
			);

			//Config variables
			posX = 26 * 5;
			posY = 26 * 6;

			ctx.drawImage(
				packImage,
				this.button.green.sx,
				this.button.green.sy,
				this.button.green.sD,
				this.button.green.sH, 
				posX, 
				posY, 
				this.button.green.sD + xy,
				this.button.green.sH 
			);

			ctx.fillText(
				action + '(E)',
				posX + xy + 11,
				posY + 18
			);
		};
		if(action == 'Select'){
			//Config variables
			posX = 26 * 9;
			posY = 26 * 6;

			ctx.drawImage(
				packImage,
				this.button.red.sx,
				this.button.red.sy,
				this.button.red.sD,
				this.button.red.sH, 
				posX, 
				posY, 
				this.button.red.sD + xy,
				this.button.red.sH 
			);

			ctx.fillText(
				drop+ '(Q)',
				posX + xy + 11,
				posY + 18
			);

			//Config variables
			posX = 26 * 5;
			posY = 26 * 6;

			ctx.drawImage(
				packImage,
				this.button.green.sx,
				this.button.green.sy,
				this.button.green.sD,
				this.button.green.sH, 
				posX, 
				posY, 
				this.button.green.sD + xy,
				this.button.green.sH 
			);

			ctx.fillText(
				action + '(E)',
				posX + xy + 11,
				posY + 18
			);
		};
		if(action == 'Use'){
			//Config variables
			posX = 26 * 9;
			posY = 26 * 6;

			ctx.drawImage(
				packImage,
				this.button.red.sx,
				this.button.red.sy,
				this.button.red.sD,
				this.button.red.sH, 
				posX, 
				posY, 
				this.button.red.sD + xy,
				this.button.red.sH 
			);

			ctx.fillText(
				drop+ '(Q)',
				posX + xy + 11,
				posY + 18
			);

			//Config variables
			posX = 26 * 5;
			posY = 26 * 6;

			ctx.drawImage(
				packImage,
				this.button.green.sx,
				this.button.green.sy,
				this.button.green.sD,
				this.button.green.sH, 
				posX, 
				posY, 
				this.button.green.sD + xy,
				this.button.green.sH 
			);

			ctx.fillText(
				action + '(E)',
				posX + xy + 11,
				posY + 18
			);
		};
		
	};
	deselect(){
		this.select.selected = false;
	};
	action(i){
		//Variables
		var j = this.select.position;
		
		if(i == true){
			const equipResult = this.equipAction(j);
			if(equipResult){
				this.select.position = 0;
				return 'Equip: ' + true;
			}else{
				const selectResult = this.selectAction(j);
				if(selectResult){
					this.select.position = 0;
					return 'Select: ' + true;
				}else{
					const useResult = this.useAction(j);
					this.select.position = 0;
					return 'Use: '  + true;
				};
				
			}
		}else{
			this.dropAction(j);
		};
		
	};
};


class BackPack extends Inventory {
	addItem(item,amount){
		if(this.items.length >= this.armor.backpack.item.slots){
			console.log("Backpack is full");
			return false;
		}else{
			super.addItem(item,amount);
			return true;
		};
	};
};
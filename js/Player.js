class Player{
	constructor(config){
		this.nickName = config.nickName || 'Unnamed';
		this.currentframe = 1;
		this.id = players.length || 0;
		this.attributes = {
			stats: {
				exp: config.exp || 0,
				nextLevelExp: 100,
				lostExp: Math.round(100 / 3), 
				maxExp: 0,
				hp: config.hp || 115,
				hpMax: 115,
				mp: config.mp || 110,
				mpMax: 110,
				speed: 50,
				level: config.level || 1,
				attack: config.attack || 5,
				defense: config.defense || 5
			}
		};
		this.backpack = new BackPack();
		this.states = {
			positionOnMap: {x: 10 * 26, y: 6 * 26},
			position: {x: 10, y: 6},
			isMoving: false,
			left: false,
			up: false,
			right: false,
			down: true
		};
		this.playerStateImgRef = {
			hud: {
				complex: {sx: 2,sy: 510,sD: 122,sH: 20},
				hpColor: '#CF3232',
				mpColor: '#3CBCFC',
				expColor: '#F3F3F3'
			},
			miniHud: {
				complex: {sx: 160,sy: 484,sD: 26,sH: 6},
				red: '#CF3232',
				yellow: '#EAFF00',
				green: '#1EBA4A',
				blue: '#3CBCFC'
			},
			config: {
				complex: {sx: 57,sy: 484,sD: 26,sH: 26}
			},
			back: {
				complex: {sx: 83,sy: 484,sD: 26,sH: 24}
			},
			idle: {
				left: {
					body: {sx: 154,sy: 211,sD: 12,sH: 10},
					head: {sx: 258,sy: 134,sD: 15,sH: 15},
					sword: {sx: 209,sy: 150,sD: 6,sH: 11},
					shield: {sx: 298,sy: 134,sD: 6,sH: 11}
				},
				up: {
					body: {sx: 154,sy: 158,sD: 16,sH: 11},
					head: {sx: 225,sy: 134,sD: 16,sH: 15},
					sword: {sx: 256,sy: 150,sD: 6,sH: 11},
					shield: {sx: 286,sy: 134,sD: 11,sH: 11}
				},
				right: {
					body: {sx: 154,sy: 187,sD: 12,sH: 10},
					head: {sx: 242,sy: 134,sD: 15,sH: 15},
					sword: {sx: 256,sy: 150,sD: 6,sH: 11},
					shield: {sx: 0,sy: 0,sD: 0,sH: 0}
				},
				down: {
					body: {sx: 154,sy: 134,sD: 15,sH: 11},
					head: {sx: 208,sy: 134,sD: 16,sH: 15},
					sword: {sx: 209,sy: 150,sD: 6,sH: 11},
					shield: {sx: 274,sy: 134,sD: 11,sH: 11}
				},
			},
			movingLeft: {
				frame1: {
					body: {sx: 167,sy: 211,sD: 12,sH: 10}
				},
				frame2: {
					body: {sx: 180,sy: 211,sD: 12,sH: 10}
				}
			},
			movingUp: {
				frame1: {
					body: {sx: 171,sy: 158,sD: 16,sH: 11}
				},
				frame2: {
					body: {sx: 188,sy: 158,sD: 16,sH: 11}
				}
			},
			movingRight: {
				frame1: {
					body: {sx: 167,sy: 187,sD: 12,sH: 10}
				},
				frame2: {
					body: {sx: 180,sy: 187,sD: 12,sH: 10}
				}
			},
			movingDown: {
				frame1: {
					body: {sx: 171,sy: 134,sD: 16,sH: 11}
				},
				frame2: {
					body: {sx: 188,sy: 134,sD: 16,sH: 11}
				}
			}
		};

		//Methods
		this.levelUp = function(){
			this.attributes.stats.exp -= this.attributes.stats.nextLevelExp;
			this.attributes.stats.nextLevelExp =Math.round(this.attributes.stats.nextLevelExp * 1.5);
			this.attributes.stats.lostExp = Math.round(this.attributes.stats.nextLevelExp / 3);
			this.attributes.stats.hpMax += 15;
			this.attributes.stats.hp = this.attributes.stats.hpMax;
			this.attributes.stats.mpMax += 10;
			this.attributes.stats.mp = this.attributes.stats.mpMax;
			this.attributes.stats.level++;
			if(this.attributes.stats.level % 2  === 0){
				this.attributes.stats.speed++;
			};
			return 'Level Up!';
		};
		this.levelDemoted = function(){
			var diference = this.attributes.stats.lostExp -  this.attributes.stats.exp;
		
			this.attributes.stats.nextLevelExp =Math.round(this.attributes.stats.nextLevelExp / 1.5);
			this.attributes.stats.lostExp = Math.round(this.attributes.stats.nextLevelExp / 3);
			this.attributes.stats.hpMax -= 15;
			this.attributes.stats.mpMax -= 10;
			this.attributes.stats.hp = this.attributes.stats.hpMax;
			this.attributes.stats.mp = this.attributes.stats.mpMax;
			this.attributes.stats.exp = this.attributes.stats.nextLevelExp - diference;
			if(this.attributes.stats.level % 2  === 0){
				this.attributes.stats.speed--;
		};
			this.attributes.stats.level--;
			return 'You were demoted to level ' + this.attributes.stats.level;
		};
		this.gainExp = function (amount){
			this.attributes.stats.exp += amount;
			if(this.attributes.stats.exp >= this.attributes.stats.nextLevelExp){
				this.levelUp();
				return 'You gain ' + amount + ' experience points';
			};
		};
		this.death = function() {
			if(this.attributes.stats.level != 1){
				if (this.attributes.stats.lostExp > this.attributes.stats.exp) {
					var lostPoints = this.attributes.stats.lostExp;
					this.levelDemoted();
					return 'You lost ' + lostPoints + ' experience points';
				}else{
					var lostPoints = this.attributes.stats.lostExp;
					this.attributes.stats.exp = this.attributes.stats.exp - this.attributes.stats.lostExp;
					return 'You lost ' + lostPoints + ' experience points';
				};
			}else{
				return 'You lost 0 experience points';
			};
		};

		this.direction = function(){
			if(this.state.left == true){
				return 'left'
			};
			if(this.state.up == true){
				return 'up'
			};
			if(this.state.right == true){
				return 'right'
			};
			if(this.state.down == true){
				return 'down'
			};
		};
		
		this.drawIdle = function(){
			if(this.states.down){
				//Body
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.down.body.sx,
					this.playerStateImgRef.idle.down.body.sy,
					this.playerStateImgRef.idle.down.body.sD,
					this.playerStateImgRef.idle.down.body.sH,
					26 * 8 + 5,
					26 * 4 + 14,
					this.playerStateImgRef.idle.down.body.sD,
					this.playerStateImgRef.idle.down.body.sH
				);
				//Head
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.down.head.sx,
					this.playerStateImgRef.idle.down.head.sy,
					this.playerStateImgRef.idle.down.head.sD,
					this.playerStateImgRef.idle.down.head.sH,
					26 * 8 + 5,
					26 * 4,
					this.playerStateImgRef.idle.down.head.sD,
					this.playerStateImgRef.idle.down.head.sH
				);
				//Shield
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.down.shield.sx,
					this.playerStateImgRef.idle.down.shield.sy,
					this.playerStateImgRef.idle.down.shield.sD,
					this.playerStateImgRef.idle.down.shield.sH,
					26 * 8 + 14,
					26 * 4 + 14,
					this.playerStateImgRef.idle.down.shield.sD,
					this.playerStateImgRef.idle.down.shield.sH
				);
				//Sword
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.down.sword.sx,
					this.playerStateImgRef.idle.down.sword.sy,
					this.playerStateImgRef.idle.down.sword.sD,
					this.playerStateImgRef.idle.down.sword.sH,
					26 * 8 + 4,
					26 * 4 + 7,
					this.playerStateImgRef.idle.down.sword.sD,
					this.playerStateImgRef.idle.down.sword.sH
				);
				};

				if(this.states.left){
				//Sword
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.left.sword.sx,
					this.playerStateImgRef.idle.left.sword.sy,
					this.playerStateImgRef.idle.left.sword.sD,
					this.playerStateImgRef.idle.left.sword.sH,
					26 * 8 + 8,
					26 * 4 + 7,
					this.playerStateImgRef.idle.left.sword.sD,
					this.playerStateImgRef.idle.left.sword.sH
				);
				//Body
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.left.body.sx,
					this.playerStateImgRef.idle.left.body.sy,
					this.playerStateImgRef.idle.left.body.sD,
					this.playerStateImgRef.idle.left.body.sH,
					26 * 8 + 8,
					26 * 4 + 15,
					this.playerStateImgRef.idle.left.body.sD,
					this.playerStateImgRef.idle.left.body.sH
				);
				//Head
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.left.head.sx,
					this.playerStateImgRef.idle.left.head.sy,
					this.playerStateImgRef.idle.left.head.sD,
					this.playerStateImgRef.idle.left.head.sH,
					26 * 8 + 5,
					26 * 4 ,
					this.playerStateImgRef.idle.left.head.sD,
					this.playerStateImgRef.idle.left.head.sH
				);
				//Shield
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.left.shield.sx,
					this.playerStateImgRef.idle.left.shield.sy,
					this.playerStateImgRef.idle.left.shield.sD,
					this.playerStateImgRef.idle.left.shield.sH,
					26 * 8 + 8,
					26 * 4 + 13,
					this.playerStateImgRef.idle.left.shield.sD,
					this.playerStateImgRef.idle.left.shield.sH
				);
				};

				if(this.states.right){
				//Body
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.right.body.sx,
					this.playerStateImgRef.idle.right.body.sy,
					this.playerStateImgRef.idle.right.body.sD,
					this.playerStateImgRef.idle.right.body.sH,
					26 * 8 + 5,
					26 * 4 + 15,
					this.playerStateImgRef.idle.right.body.sD,
					this.playerStateImgRef.idle.right.body.sH
				);
				//Head
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.right.head.sx,
					this.playerStateImgRef.idle.right.head.sy,
					this.playerStateImgRef.idle.right.head.sD,
					this.playerStateImgRef.idle.right.head.sH,
					26 * 8 + 5,
					26 * 4 ,
					this.playerStateImgRef.idle.right.head.sD,
					this.playerStateImgRef.idle.right.head.sH
				);
				//Shield
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.right.shield.sx,
					this.playerStateImgRef.idle.right.shield.sy,
					this.playerStateImgRef.idle.right.shield.sD,
					this.playerStateImgRef.idle.right.shield.sH,
					26 * 8 + 9,
					26 * 4 + 14,
					this.playerStateImgRef.idle.right.shield.sD,
					this.playerStateImgRef.idle.right.shield.sH
				);
				//Sword
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.right.sword.sx,
					this.playerStateImgRef.idle.right.sword.sy,
					this.playerStateImgRef.idle.right.sword.sD,
					this.playerStateImgRef.idle.right.sword.sH,
					26 * 8 + 10,
					26 * 4 + 7,
					this.playerStateImgRef.idle.right.sword.sD,
					this.playerStateImgRef.idle.right.sword.sH
				);
				};

				if(this.states.up){
				//Shield
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.up.shield.sx,
					this.playerStateImgRef.idle.up.shield.sy,
					this.playerStateImgRef.idle.up.shield.sD,
					this.playerStateImgRef.idle.up.shield.sH,
					26 * 8 + 1,
					26 * 4 + 13,
					this.playerStateImgRef.idle.up.shield.sD,
					this.playerStateImgRef.idle.up.shield.sH
				);
				//Sword
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.up.sword.sx,
					this.playerStateImgRef.idle.up.sword.sy,
					this.playerStateImgRef.idle.up.sword.sD,
					this.playerStateImgRef.idle.up.sword.sH,
					26 * 8 + 16,
					26 * 4 + 7,
					this.playerStateImgRef.idle.up.sword.sD,
					this.playerStateImgRef.idle.up.sword.sH
				);
				//Body
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.up.body.sx,
					this.playerStateImgRef.idle.up.body.sy,
					this.playerStateImgRef.idle.up.body.sD,
					this.playerStateImgRef.idle.up.body.sH,
					26 * 8 + 5,
					26 * 4 + 14,
					this.playerStateImgRef.idle.up.body.sD,
					this.playerStateImgRef.idle.up.body.sH
				);
				//Head
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.up.head.sx,
					this.playerStateImgRef.idle.up.head.sy,
					this.playerStateImgRef.idle.up.head.sD,
					this.playerStateImgRef.idle.up.head.sH,
					26 * 8 + 5,
					26 * 4 ,
					this.playerStateImgRef.idle.up.head.sD,
					this.playerStateImgRef.idle.up.head.sH
				);
				};
		}; // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

		this.drawMoving = function(){
			var currentframe = 1;
			var frameInterval = 1000;

			var nextFrame = ()=>{
				if(this.states.down && this.currentframe == 1 && this.states.isMoving){
					//Body
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.movingDown['frame' + this.currentframe].body.sx,
						this.playerStateImgRef.movingDown['frame' + this.currentframe].body.sy,
						this.playerStateImgRef.movingDown['frame' + this.currentframe].body.sD,
						this.playerStateImgRef.movingDown['frame' + this.currentframe].body.sH,
						26 * 8 + 5,
						26 * 4 + 14,
						this.playerStateImgRef.movingDown['frame' + this.currentframe].body.sD,
						this.playerStateImgRef.movingDown['frame' + this.currentframe].body.sH
					);
					//Head
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.down.head.sx,
						this.playerStateImgRef.idle.down.head.sy,
						this.playerStateImgRef.idle.down.head.sD,
						this.playerStateImgRef.idle.down.head.sH,
						26 * 8 + 5,
						26 * 4,
						this.playerStateImgRef.idle.down.head.sD,
						this.playerStateImgRef.idle.down.head.sH
					);
					//Shield
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.down.shield.sx,
						this.playerStateImgRef.idle.down.shield.sy,
						this.playerStateImgRef.idle.down.shield.sD,
						this.playerStateImgRef.idle.down.shield.sH,
						26 * 8 + 14,
						26 * 4 + 13,
						this.playerStateImgRef.idle.down.shield.sD,
						this.playerStateImgRef.idle.down.shield.sH
					);
					//Sword
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.down.sword.sx,
						this.playerStateImgRef.idle.down.sword.sy,
						this.playerStateImgRef.idle.down.sword.sD,
						this.playerStateImgRef.idle.down.sword.sH,
						26 * 8 + 4,
						26 * 4 + 6,
						this.playerStateImgRef.idle.down.sword.sD,
						this.playerStateImgRef.idle.down.sword.sH
					);
					
					
				};

				if(this.states.down && this.currentframe == 2){
					//Body
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.movingDown['frame' + this.currentframe].body.sx,
						this.playerStateImgRef.movingDown['frame' + this.currentframe].body.sy,
						this.playerStateImgRef.movingDown['frame' + this.currentframe].body.sD,
						this.playerStateImgRef.movingDown['frame' + this.currentframe].body.sH,
						26 * 8 + 5,
						26 * 4 + 14,
						this.playerStateImgRef.movingDown['frame' + this.currentframe].body.sD,
						this.playerStateImgRef.movingDown['frame' + this.currentframe].body.sH
					);
					//Head
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.down.head.sx,
						this.playerStateImgRef.idle.down.head.sy,
						this.playerStateImgRef.idle.down.head.sD,
						this.playerStateImgRef.idle.down.head.sH,
						26 * 8 + 5,
						26 * 4,
						this.playerStateImgRef.idle.down.head.sD,
						this.playerStateImgRef.idle.down.head.sH
					);
					//Shield
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.down.shield.sx,
						this.playerStateImgRef.idle.down.shield.sy,
						this.playerStateImgRef.idle.down.shield.sD,
						this.playerStateImgRef.idle.down.shield.sH,
						26 * 8 + 14,
						26 * 4 + 12,
						this.playerStateImgRef.idle.down.shield.sD,
						this.playerStateImgRef.idle.down.shield.sH
					);
					//Sword
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.down.sword.sx,
						this.playerStateImgRef.idle.down.sword.sy,
						this.playerStateImgRef.idle.down.sword.sD,
						this.playerStateImgRef.idle.down.sword.sH,
						26 * 8 + 4,
						26 * 4 + 7,
						this.playerStateImgRef.idle.down.sword.sD,
						this.playerStateImgRef.idle.down.sword.sH
					);
							
					
					
				};

				if(this.states.left && this.currentframe == 1){
					//Sword
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.left.sword.sx,
						this.playerStateImgRef.idle.left.sword.sy,
						this.playerStateImgRef.idle.left.sword.sD,
						this.playerStateImgRef.idle.left.sword.sH,
						26 * 8 + 8,
						26 * 4 + 7,
						this.playerStateImgRef.idle.left.sword.sD,
						this.playerStateImgRef.idle.left.sword.sH
					);
					//Body
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.movingLeft['frame' + this.currentframe].body.sx,
						this.playerStateImgRef.movingLeft['frame' + this.currentframe].body.sy,
						this.playerStateImgRef.movingLeft['frame' + this.currentframe].body.sD,
						this.playerStateImgRef.movingLeft['frame' + this.currentframe].body.sH,
						26 * 8 + 8,
						26 * 4 + 15,
						this.playerStateImgRef.movingLeft['frame' + this.currentframe].body.sD,
						this.playerStateImgRef.movingLeft['frame' + this.currentframe].body.sH
					);
					//Head
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.left.head.sx,
						this.playerStateImgRef.idle.left.head.sy,
						this.playerStateImgRef.idle.left.head.sD,
						this.playerStateImgRef.idle.left.head.sH,
						26 * 8 + 5,
						26 * 4 ,
						this.playerStateImgRef.idle.left.head.sD,
						this.playerStateImgRef.idle.left.head.sH
					);
					//Shield
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.left.shield.sx,
						this.playerStateImgRef.idle.left.shield.sy,
						this.playerStateImgRef.idle.left.shield.sD,
						this.playerStateImgRef.idle.left.shield.sH,
						26 * 8 + 7,
						26 * 4 + 13,
						this.playerStateImgRef.idle.left.shield.sD,
						this.playerStateImgRef.idle.left.shield.sH
					);
				};

				if(this.states.left && this.currentframe == 2){
					//Sword
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.left.sword.sx,
						this.playerStateImgRef.idle.left.sword.sy,
						this.playerStateImgRef.idle.left.sword.sD,
						this.playerStateImgRef.idle.left.sword.sH,
						26 * 8 + 8,
						26 * 4 + 6,
						this.playerStateImgRef.idle.left.sword.sD,
						this.playerStateImgRef.idle.left.sword.sH
					);
					//Body
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.movingLeft['frame' + this.currentframe].body.sx,
						this.playerStateImgRef.movingLeft['frame' + this.currentframe].body.sy,
						this.playerStateImgRef.movingLeft['frame' + this.currentframe].body.sD,
						this.playerStateImgRef.movingLeft['frame' + this.currentframe].body.sH,
						26 * 8 + 8,
						26 * 4 + 15,
						this.playerStateImgRef.movingLeft['frame' + this.currentframe].body.sD,
						this.playerStateImgRef.movingLeft['frame' + this.currentframe].body.sH
					);
					//Head
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.left.head.sx,
						this.playerStateImgRef.idle.left.head.sy,
						this.playerStateImgRef.idle.left.head.sD,
						this.playerStateImgRef.idle.left.head.sH,
						26 * 8 + 5,
						26 * 4 ,
						this.playerStateImgRef.idle.left.head.sD,
						this.playerStateImgRef.idle.left.head.sH
					);
					//Shield
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.left.shield.sx,
						this.playerStateImgRef.idle.left.shield.sy,
						this.playerStateImgRef.idle.left.shield.sD,
						this.playerStateImgRef.idle.left.shield.sH,
						26 * 8 + 8,
						26 * 4 + 13,
						this.playerStateImgRef.idle.left.shield.sD,
						this.playerStateImgRef.idle.left.shield.sH
					);
				};

				if(this.states.right && this.currentframe == 1){
					//Body
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.movingRight['frame' + this.currentframe].body.sx,
						this.playerStateImgRef.movingRight['frame' + this.currentframe].body.sy,
						this.playerStateImgRef.movingRight['frame' + this.currentframe].body.sD,
						this.playerStateImgRef.movingRight['frame' + this.currentframe].body.sH,
						26 * 8 + 5,
						26 * 4 + 15,
						this.playerStateImgRef.movingRight['frame' + this.currentframe].body.sD,
						this.playerStateImgRef.movingRight['frame' + this.currentframe].body.sH
					);
					//Head
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.right.head.sx,
						this.playerStateImgRef.idle.right.head.sy,
						this.playerStateImgRef.idle.right.head.sD,
						this.playerStateImgRef.idle.right.head.sH,
						26 * 8 + 5,
						26 * 4 ,
						this.playerStateImgRef.idle.right.head.sD,
						this.playerStateImgRef.idle.right.head.sH
					);
					//Shield
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.right.shield.sx,
						this.playerStateImgRef.idle.right.shield.sy,
						this.playerStateImgRef.idle.right.shield.sD,
						this.playerStateImgRef.idle.right.shield.sH,
						26 * 8 + 9,
						26 * 4 + 14,
						this.playerStateImgRef.idle.right.shield.sD,
						this.playerStateImgRef.idle.right.shield.sH
					);
					//Sword
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.right.sword.sx,
						this.playerStateImgRef.idle.right.sword.sy,
						this.playerStateImgRef.idle.right.sword.sD,
						this.playerStateImgRef.idle.right.sword.sH,
						26 * 8 + 9,
						26 * 4 + 7,
						this.playerStateImgRef.idle.right.sword.sD,
						this.playerStateImgRef.idle.right.sword.sH
					);
				};

				if(this.states.right && this.currentframe == 2){
					//Body
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.movingRight['frame' + this.currentframe].body.sx,
						this.playerStateImgRef.movingRight['frame' + this.currentframe].body.sy,
						this.playerStateImgRef.movingRight['frame' + this.currentframe].body.sD,
						this.playerStateImgRef.movingRight['frame' + this.currentframe].body.sH,
						26 * 8 + 5,
						26 * 4 + 15,
						this.playerStateImgRef.movingRight['frame' + this.currentframe].body.sD,
						this.playerStateImgRef.movingRight['frame' + this.currentframe].body.sH
					);
					//Head
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.right.head.sx,
						this.playerStateImgRef.idle.right.head.sy,
						this.playerStateImgRef.idle.right.head.sD,
						this.playerStateImgRef.idle.right.head.sH,
						26 * 8 + 5,
						26 * 4 ,
						this.playerStateImgRef.idle.right.head.sD,
						this.playerStateImgRef.idle.right.head.sH
					);
					//Shield
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.right.shield.sx,
						this.playerStateImgRef.idle.right.shield.sy,
						this.playerStateImgRef.idle.right.shield.sD,
						this.playerStateImgRef.idle.right.shield.sH,
						26 * 8 + 9,
						26 * 4 + 14,
						this.playerStateImgRef.idle.right.shield.sD,
						this.playerStateImgRef.idle.right.shield.sH
					);
					//Sword
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.right.sword.sx,
						this.playerStateImgRef.idle.right.sword.sy,
						this.playerStateImgRef.idle.right.sword.sD,
						this.playerStateImgRef.idle.right.sword.sH,
						26 * 8 + 10,
						26 * 4 + 7,
						this.playerStateImgRef.idle.right.sword.sD,
						this.playerStateImgRef.idle.right.sword.sH
					);
				};

				if(this.states.up && this.currentframe == 1){
					//Shield
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.up.shield.sx,
						this.playerStateImgRef.idle.up.shield.sy,
						this.playerStateImgRef.idle.up.shield.sD,
						this.playerStateImgRef.idle.up.shield.sH,
						26 * 8 + 1,
						26 * 4 + 12,
						this.playerStateImgRef.idle.up.shield.sD,
						this.playerStateImgRef.idle.up.shield.sH
					);
					//Sword
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.up.sword.sx,
						this.playerStateImgRef.idle.up.sword.sy,
						this.playerStateImgRef.idle.up.sword.sD,
						this.playerStateImgRef.idle.up.sword.sH,
						26 * 8 + 16,
						26 * 4 + 7,
						this.playerStateImgRef.idle.up.sword.sD,
						this.playerStateImgRef.idle.up.sword.sH
					);
					//Body
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.movingUp['frame' + this.currentframe].body.sx,
						this.playerStateImgRef.movingUp['frame' + this.currentframe].body.sy,
						this.playerStateImgRef.movingUp['frame' + this.currentframe].body.sD,
						this.playerStateImgRef.movingUp['frame' + this.currentframe].body.sH,
						26 * 8 + 5,
						26 * 4 + 14,
						this.playerStateImgRef.movingUp['frame' + this.currentframe].body.sD,
						this.playerStateImgRef.movingUp['frame' + this.currentframe].body.sH
					);
					//Head
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.up.head.sx,
						this.playerStateImgRef.idle.up.head.sy,
						this.playerStateImgRef.idle.up.head.sD,
						this.playerStateImgRef.idle.up.head.sH,
						26 * 8 + 5,
						26 * 4 ,
						this.playerStateImgRef.idle.up.head.sD,
						this.playerStateImgRef.idle.up.head.sH
					);
				};
			

			if(this.states.up && this.currentframe == 2){
					//Shield
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.up.shield.sx,
						this.playerStateImgRef.idle.up.shield.sy,
						this.playerStateImgRef.idle.up.shield.sD,
						this.playerStateImgRef.idle.up.shield.sH,
						26 * 8 + 1,
						26 * 4 + 13,
						this.playerStateImgRef.idle.up.shield.sD,
						this.playerStateImgRef.idle.up.shield.sH
					);
					//Sword
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.up.sword.sx,
						this.playerStateImgRef.idle.up.sword.sy,
						this.playerStateImgRef.idle.up.sword.sD,
						this.playerStateImgRef.idle.up.sword.sH,
						26 * 8 + 16,
						26 * 4 + 6,
						this.playerStateImgRef.idle.up.sword.sD,
						this.playerStateImgRef.idle.up.sword.sH
					);
					//Body
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.movingUp['frame' + this.currentframe].body.sx,
						this.playerStateImgRef.movingUp['frame' + this.currentframe].body.sy,
						this.playerStateImgRef.movingUp['frame' + this.currentframe].body.sD,
						this.playerStateImgRef.movingUp['frame' + this.currentframe].body.sH,
						26 * 8 + 5,
						26 * 4 + 14,
						this.playerStateImgRef.movingUp['frame' + this.currentframe].body.sD,
						this.playerStateImgRef.movingUp['frame' + this.currentframe].body.sH
					);
					//Head
					ctx.drawImage(
						charactersImage,
						this.playerStateImgRef.idle.up.head.sx,
						this.playerStateImgRef.idle.up.head.sy,
						this.playerStateImgRef.idle.up.head.sD,
						this.playerStateImgRef.idle.up.head.sH,
						26 * 8 + 5,
						26 * 4 ,
						this.playerStateImgRef.idle.up.head.sD,
						this.playerStateImgRef.idle.up.head.sH
					);
				};
			};
			nextFrame();
		};    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------

		this.drawAttack = function(){
			if(this.states.down){
				//Body
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.down.body.sx,
					this.playerStateImgRef.idle.down.body.sy,
					this.playerStateImgRef.idle.down.body.sD,
					this.playerStateImgRef.idle.down.body.sH,
					26 * 8 + 5,
					26 * 4 + 14,
					this.playerStateImgRef.idle.down.body.sD,
					this.playerStateImgRef.idle.down.body.sH
				);
				//Head
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.down.head.sx,
					this.playerStateImgRef.idle.down.head.sy,
					this.playerStateImgRef.idle.down.head.sD,
					this.playerStateImgRef.idle.down.head.sH,
					26 * 8 + 5,
					26 * 4,
					this.playerStateImgRef.idle.down.head.sD,
					this.playerStateImgRef.idle.down.head.sH
				);
				//Shield
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.down.shield.sx,
					this.playerStateImgRef.idle.down.shield.sy,
					this.playerStateImgRef.idle.down.shield.sD,
					this.playerStateImgRef.idle.down.shield.sH,
					26 * 8 + 14,
					26 * 4 + 14,
					this.playerStateImgRef.idle.down.shield.sD,
					this.playerStateImgRef.idle.down.shield.sH
				);
				//Sword
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.down.sword.sx,
					this.playerStateImgRef.idle.down.sword.sy,
					this.playerStateImgRef.idle.down.sword.sD,
					this.playerStateImgRef.idle.down.sword.sH,
					26 * 8 + 4,
					26 * 4 + 7,
					this.playerStateImgRef.idle.down.sword.sD,
					this.playerStateImgRef.idle.down.sword.sH
				);
				};

				if(this.states.left){
				//Sword
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.left.sword.sx,
					this.playerStateImgRef.idle.left.sword.sy,
					this.playerStateImgRef.idle.left.sword.sD,
					this.playerStateImgRef.idle.left.sword.sH,
					26 * 8 + 8,
					26 * 4 + 7,
					this.playerStateImgRef.idle.left.sword.sD,
					this.playerStateImgRef.idle.left.sword.sH
				);
				//Body
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.left.body.sx,
					this.playerStateImgRef.idle.left.body.sy,
					this.playerStateImgRef.idle.left.body.sD,
					this.playerStateImgRef.idle.left.body.sH,
					26 * 8 + 8,
					26 * 4 + 15,
					this.playerStateImgRef.idle.left.body.sD,
					this.playerStateImgRef.idle.left.body.sH
				);
				//Head
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.left.head.sx,
					this.playerStateImgRef.idle.left.head.sy,
					this.playerStateImgRef.idle.left.head.sD,
					this.playerStateImgRef.idle.left.head.sH,
					26 * 8 + 5,
					26 * 4 ,
					this.playerStateImgRef.idle.left.head.sD,
					this.playerStateImgRef.idle.left.head.sH
				);
				//Shield
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.left.shield.sx,
					this.playerStateImgRef.idle.left.shield.sy,
					this.playerStateImgRef.idle.left.shield.sD,
					this.playerStateImgRef.idle.left.shield.sH,
					26 * 8 + 9,
					26 * 4 + 14,
					this.playerStateImgRef.idle.left.shield.sD,
					this.playerStateImgRef.idle.left.shield.sH
				);
				};

				if(this.states.right){
				//Body
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.right.body.sx,
					this.playerStateImgRef.idle.right.body.sy,
					this.playerStateImgRef.idle.right.body.sD,
					this.playerStateImgRef.idle.right.body.sH,
					26 * 8 + 5,
					26 * 4 + 15,
					this.playerStateImgRef.idle.right.body.sD,
					this.playerStateImgRef.idle.right.body.sH
				);
				//Head
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.right.head.sx,
					this.playerStateImgRef.idle.right.head.sy,
					this.playerStateImgRef.idle.right.head.sD,
					this.playerStateImgRef.idle.right.head.sH,
					26 * 8 + 5,
					26 * 4 ,
					this.playerStateImgRef.idle.right.head.sD,
					this.playerStateImgRef.idle.right.head.sH
				);
				//Shield
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.right.shield.sx,
					this.playerStateImgRef.idle.right.shield.sy,
					this.playerStateImgRef.idle.right.shield.sD,
					this.playerStateImgRef.idle.right.shield.sH,
					26 * 8 + 9,
					26 * 4 + 14,
					this.playerStateImgRef.idle.right.shield.sD,
					this.playerStateImgRef.idle.right.shield.sH
				);
				//Sword
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.right.sword.sx,
					this.playerStateImgRef.idle.right.sword.sy,
					this.playerStateImgRef.idle.right.sword.sD,
					this.playerStateImgRef.idle.right.sword.sH,
					26 * 8 + 10,
					26 * 4 + 7,
					this.playerStateImgRef.idle.right.sword.sD,
					this.playerStateImgRef.idle.right.sword.sH
				);
				};

				if(this.states.up){
				//Shield
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.up.shield.sx,
					this.playerStateImgRef.idle.up.shield.sy,
					this.playerStateImgRef.idle.up.shield.sD,
					this.playerStateImgRef.idle.up.shield.sH,
					26 * 8 + 1,
					26 * 4 + 13,
					this.playerStateImgRef.idle.up.shield.sD,
					this.playerStateImgRef.idle.up.shield.sH
				);
				//Sword
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.up.sword.sx,
					this.playerStateImgRef.idle.up.sword.sy,
					this.playerStateImgRef.idle.up.sword.sD,
					this.playerStateImgRef.idle.up.sword.sH,
					26 * 8 + 16,
					26 * 4 + 7,
					this.playerStateImgRef.idle.up.sword.sD,
					this.playerStateImgRef.idle.up.sword.sH
				);
				//Body
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.up.body.sx,
					this.playerStateImgRef.idle.up.body.sy,
					this.playerStateImgRef.idle.up.body.sD,
					this.playerStateImgRef.idle.up.body.sH,
					26 * 8 + 5,
					26 * 4 + 14,
					this.playerStateImgRef.idle.up.body.sD,
					this.playerStateImgRef.idle.up.body.sH
				);
				//Head
				ctx.drawImage(
					charactersImage,
					this.playerStateImgRef.idle.up.head.sx,
					this.playerStateImgRef.idle.up.head.sy,
					this.playerStateImgRef.idle.up.head.sD,
					this.playerStateImgRef.idle.up.head.sH,
					26 * 8 + 5,
					26 * 4 ,
					this.playerStateImgRef.idle.up.head.sD,
					this.playerStateImgRef.idle.up.head.sH
				);
				};
		};

		this.draw = function(){
			//Idle
			if(this.states.isMoving == false){
				this.drawIdle();
			}else{
				this.drawMoving()
			};
		};
		
		this.position = function(){
			for(var y in maps[gameStates.currentMap].data){
				for(var x in maps[gameStates.currentMap].data[y]){
					if(maps[gameStates.currentMap].data[y][x].player == this){
						this.states.position.x = x;
						this.states.position.y = y;
						this.states.positionOnMap.x = x * 26 - 52;
						this.states.positionOnMap.y = y * 26 - 52
						return {x: x, y: y};
					}
				};
			};
		};
		
		this.ban = function(){
			//Player position
			maps[gameStates.currentMap].data[this.states.position.y][this.states.position.x] = 0;
			maps[gameStates.currentMap].data[3][29] = 2;
			this.position();			

			this.states.x = 21;
			this.states.y = -1;
			
			//Map position
			maps[gameStates.currentMap].x = -26 * this.states.x;
			maps[gameStates.currentMap].y = -26 * this.states.y;

			
		};
		
		this.checkCollision = function(){
			//Object to be returned
			var collisions = {};

			//Verifications
				//Right
				if(maps[gameStates.currentMap].data[this.states.position.y][Number(this.states.position.x) + 1].collision == true){
					collisions.right = true;
				}else{
					collisions.right = false;
				};
				//Left
				if(maps[gameStates.currentMap].data[this.states.position.y][Number(this.states.position.x) - 1].collision == true){
					collisions.left = true;
				}else{
					collisions.left = false;
				};
				//Down
				if(maps[gameStates.currentMap].data[Number(this.states.position.y)  + 1][this.states.position.x].collision == true){
					collisions.down = true;
				}else{
					collisions.down = false;
				};
				//Up
				if(maps[gameStates.currentMap].data[Number(this.states.position.y) - 1][this.states.position.x].collision == true){
					collisions.up = true;
				}else{
					collisions.up = false;
				};

			return collisions;
		};

		this.moveLeft = function(){
			if(this.states.isMoving){
				return;
			};

			if(this.states.down){this.states.down = false;
			this.states.left = true;};
			if(this.states.up){this.states.up = false;
			this.states.left = true;};
			if(this.states.right){this.states.right = false;
			this.states.left = true;};
			
			//Check collision
			var collision = this.checkCollision();
			if(collision.left == true){
				return;
			};

			//Player position
			maps[gameStates.currentMap].data[this.states.position.y][this.states.position.x].player = false;
			maps[gameStates.currentMap].data[this.states.position.y][this.states.position.x - 1].player = this;
			this.position();

			this.states.isMoving = true;

			var steps = 26;
			var counter = 0;
			var intervalDuration = 1000 / this.attributes.stats.speed;

			function moveStep(){
				maps[gameStates.currentMap].x++;
				counter++;
				
				if(counter < steps){
					requestAnimationFrame(moveStep);
				}else{
					players[gameStates.currentPlayer].states.isMoving = false;
				};
			};
			moveStep();
		};
		this.moveUp = function(){
			if(this.states.isMoving){
				return;
			};

			if(this.states.left){this.states.left = false;
			this.states.up = true;};
			if(this.states.down){this.states.down = false;
			this.states.up = true;};
			if(this.states.right){this.states.right = false;
			this.states.up = true;};

			//Check collision
			var collision = this.checkCollision();
			if(collision.up == true){
				return;
			};

			//Player position
			maps[gameStates.currentMap].data[this.states.position.y][this.states.position.x].player = false;
			maps[gameStates.currentMap].data[this.states.position.y - 1][this.states.position.x ].player = this;
			this.position();

			this.states.isMoving = true;

			var steps = 26;
			var counter = 0;
			var intervalDuration = 1000 / this.attributes.stats.speed;

			function moveStep(){
				maps[gameStates.currentMap].y++;
				counter++;
				
				if(counter < steps){
					requestAnimationFrame(moveStep);
				}else{
					players[gameStates.currentPlayer].states.isMoving = false;
				};
			};
			moveStep();
		};
		this.moveRight = function(){
			if(this.states.isMoving){
				return;
			};

			if(this.states.down){this.states.down = false;
			this.states.right = true;};
			if(this.states.up){this.states.up = false;
			this.states.right = true;};
			if(this.states.left){this.states.left = false;
			this.states.right = true;};

			//Check collision
			var collision = this.checkCollision();
			if(collision.right == true){
				return;
			};

			//Player position
			maps[gameStates.currentMap].data[this.states.position.y][this.states.position.x].player = false;
			maps[gameStates.currentMap].data[this.states.position.y][Number(this.states.position.x) + 1].player = this;
			this.position();


			this.states.isMoving = true;

			var steps = 26;
			var counter = 0;
			var intervalDuration = 1000 / this.attributes.stats.speed;

			function moveStep(){
				maps[gameStates.currentMap].x--;
				counter++;
				
				if(counter < steps){
					requestAnimationFrame(moveStep);
				}else{
					players[gameStates.currentPlayer].states.isMoving = false;
				};
			};
			moveStep();
		};
		this.moveDown = function(){
			if(this.states.isMoving){
				return;
			};

			if(this.states.left){this.states.left = false;
			this.states.down = true;};
			if(this.states.up){this.states.up = false;
			this.states.down = true;};
			if(this.states.right){this.states.right = false;
			this.states.down = true;};

			//Check collision
			var collision = this.checkCollision();
			if(collision.down == true){
				return;
			};

			//Player position
			maps[gameStates.currentMap].data[this.states.position.y][this.states.position.x].player = false;
			maps[gameStates.currentMap].data[Number(this.states.position.y) + 1][this.states.position.x].player = this;
			this.position();


			this.states.isMoving = true;

			var steps = 26;
			var counter = 0;
			var intervalDuration = 1000 / this.attributes.stats.speed;

			var moveStep = ()=>{
				if(gameStates.currentPlayer == this.id){
					maps[gameStates.currentMap].y--;
					counter++;
				}else{
					this.states.positionOnMap.y--;
					counter++;
				};
					
				if(counter < steps){
					requestAnimationFrame(moveStep);
				}else{
					this.states.isMoving = false;
				};
			};
			moveStep();
		};

		this.drawHUD = function() {
			// Variables
				// Hud
				var hudX = 0;
				var hudY = 0;
				// Hp Bar
				var hpBarX = 2;
				var hpBarY = 2;
				var hpBarWidth = 118;
				var hpBarHeight = 10;
				// Mp Bar
				var mpBarX = 2;
				var mpBarY = 13;
				var mpBarWidth = 118;
				var mpBarHeight = 3;
				// Exp Bar
				var expBarX = 2;
				var expBarY = 17;
				var expBarWidth = 118;
				var expBarHeight = 1;

			//Config text
				ctx.fillStyle = 'white';
				ctx.font = 'bold 10px "PixelatedFont", monospace';
				//ctx.imageSmoothingEnabled = false;
				ctx.textAlign = 'center';
				

			// Draw complex HUD background
				ctx.drawImage(
					packImage,
					this.playerStateImgRef.hud.complex.sx,
					this.playerStateImgRef.hud.complex.sy,
					this.playerStateImgRef.hud.complex.sD,
					this.playerStateImgRef.hud.complex.sH,
					hudX,
					hudY,
					this.playerStateImgRef.hud.complex.sD,
					this.playerStateImgRef.hud.complex.sH
				);

			// Draw HP bar
				var hpPercentage = this.attributes.stats.hp / this.attributes.stats.hpMax;
				ctx.fillStyle = this.playerStateImgRef.hud.hpColor; // Red color for HP bar
				ctx.fillRect(hpBarX, hpBarY, hpBarWidth * hpPercentage, hpBarHeight);

			// Draw MP bar
				var mpPercentage = this.attributes.stats.mp / this.attributes.stats.mpMax;
				ctx.fillStyle = this.playerStateImgRef.hud.mpColor; // Blue color for MP bar
				ctx.fillRect(mpBarX, mpBarY, mpBarWidth * mpPercentage, mpBarHeight);

			// Draw EXP bar
				var expPercentage = this.attributes.stats.exp / this.attributes.stats.nextLevelExp;
				ctx.fillStyle = this.playerStateImgRef.hud.expColor; // White color for EXP bar
				ctx.fillRect(expBarX, expBarY, expBarWidth * expPercentage, expBarHeight);

			// Draw text
				ctx.fillText(
					'/', 
					hpBarWidth / 2, 
					10
				); // Adjust the vertical position as needed

				ctx.fillText(
					this.attributes.stats.hpMax, 
					hpBarWidth / 2 + 9, 
					10
				); // Adjust the vertical position as needed

				var textWidth = ctx.measureText(this.attributes.stats.hp).width;
				ctx.fillText(
					this.attributes.stats.hp, 
					hpBarWidth / 2 - textWidth, 
					10
				); // Adjust the vertical position as needed
		};

		this.drawMiniHUD = function() {
			// Variables
				// Hud
				var hudX = 26 * 8;
				var hudY = 26 * 4 - this.playerStateImgRef.miniHud.complex.sH;
				// Hp Bar
				var hpBarX = hudX + 2;
				var hpBarY = hudY + 2;
				var hpBarWidth = 22;
				var hpBarHeight = 2;

			
				

			// Draw complex mini HUD background
				ctx.drawImage(
					packImage,
					this.playerStateImgRef.miniHud.complex.sx,
					this.playerStateImgRef.miniHud.complex.sy,
					this.playerStateImgRef.miniHud.complex.sD,
					this.playerStateImgRef.miniHud.complex.sH,
					hudX,
					hudY,
					this.playerStateImgRef.miniHud.complex.sD,
					this.playerStateImgRef.miniHud.complex.sH
				);

			// Draw HP bar
				var hpPercentage = this.attributes.stats.hp / this.attributes.stats.hpMax;
				function hpBarFunctionColor(){
					if(hpPercentage > 1 - 0.333){
						return '#1EBA4A';
					};
					if(hpPercentage < 1 - 0.333 && hpPercentage > 0.333){
						return '#EAFF00';
					};
					if(hpPercentage < 1 - 0.666){
						return '#CF3232';
					};
				};
				var color = hpBarFunctionColor();
				ctx.fillStyle = color; // Red color for HP bar
				ctx.fillRect(hpBarX, hpBarY, hpBarWidth * hpPercentage, hpBarHeight);

			
			//Config text
				ctx.fillStyle = 'white';
				ctx.font = 'bold 10px "PixelatedFont", monospace';
				//ctx.imageSmoothingEnabled = false;
				ctx.textAlign = 'center';

			// Draw text
				var text = 'Lv.' + this.attributes.stats.level;
				var textWidth = ctx.measureText(text).width;
				ctx.fillText(
					text, 
					26 * 9 - textWidth / 2, 
					26 * 3 + 20
				); // Adjust the vertical position as needed
		};
	};
		
};


let players = [];
players.push(new Player({nickName: 'GameMaster'}));
players.push(new Player({nickName: 'GameMaster', level: 5}));

players[0].backpack.addItem(items[5],1);
players[0].backpack.addItem(items[6],1);
players[0].backpack.addItem(items[1],1);
players[0].backpack.addItem(items[0],500);
players[0].backpack.addItem(items[0],1);
players[0].backpack.addItem(items[0],1);
players[0].backpack.addItem(items[4],1);
players[0].backpack.addItem(items[2],100);
players[0].backpack.addItem(items[3],150);
players[0].backpack.addItem(items[4],150);
players[0].backpack.equipAction(1);
players[0].attributes.stats.hp = players[0].attributes.stats.hp;
players[0].attributes.stats.mp = players[0].attributes.stats.mp - 103;
players[0].attributes.stats.level = 978;

/*players[0].death();
players[0].attributes.stats;
console.log(players[0].attributes.stats);
players[0].gainExp(130);
console.log(players[0].attributes.stats);
players[0].gainExp(30);
console.log(players[0].attributes.stats);
players[0].gainExp(70);
console.log(players[0].attributes.stats);
players[0].death();
console.log(players[0].attributes.stats);*/
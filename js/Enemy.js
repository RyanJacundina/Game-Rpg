class Enemy{
	constructor(config){
		this.nickName = config.nickName || null;
		this.id = enemies.length || 0;
		this.currentframe = 1;
		this.attributes = {
			stats: {
				hp: config.hp || 100,
				hpMax: config.hpMax || 100,
				mp: config.mpMax || 90,
				mpMax: config.mpMax || 90,
				speed: config.speed || 30,
				level: config.level || 1,
				attack: config.attack || 4,
				defense: config.defense || 5
			}
		};
		this.backpack = new BackPack();
		this.states = {
			position: {x: 10, y: 6},
			isMoving: false,
			left: false,
			up: false,
			right: false,
			down: true
		};
		this.enemyImgRef = {
				frame1: {
					sx: config.imgRef.frame1.sx || null,
					sy: config.imgRef.frame1.sy || null,
					sD: config.imgRef.frame1.sD || null,
					SH: config.imgRef.frame1.sH || null
				},
				frame2: {
					sx: config.imgRef.frame2.sx || null,
					sy: config.imgRef.frame2.sy || null,
					sD: config.imgRef.frame2.sD || null,
					sH: config.imgRef.frame2.sH || null
				}
		};
	};
};

var enemies = [];
enemies.push(
	new Enemy({
		imgRef: {
			frame1: {sx: 886,sy: 615,sD: 26,sH: 26},
			frame2: {sx: 886,sy: 641,sD: 26,sH: 26}
		}
	})
);
class GameObject{
	constructor(config){
		this.item = config.item || 'false';
		this.player = config.player || 'false';
		this.enemy = config.enemy || 'false';
		this.collision = config.collision || 'false';
		this.onCollision = config.onCollision || 'false';
		this.onDestroy = config.onDestroy || 'false';
		this.tag = config.tag || 'undefined';
	};
};
class Enemy extends Character{
  constructor(config){
    super(config);
    this.visible = {
      sprite: true,
      displayName: true,
      miniHud: true,
      level: true
    };
  };
};
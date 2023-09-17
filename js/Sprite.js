class Sprite{
  constructor(config){
    this.image = new Image();
    this.image.src = config.src || 'assets/characters/pack.png';
    this.image.onload = ()=>{
      this.isLoaded = true;
    };
    this.primarySrc = {
      x: config.primarySrc.x * 26 || 0,
      y: config.primarySrc.y * 26 || 0
    };
    this.animations = config.animations || {
      idleDown: [
        [0,0],
        [0,1]
      ],
      idleUp: [
        [1,0],
        [1,1]
      ],
      idleLeft: [
        [0,0],
        [0,1]
      ],
      idleRight: [
        [1,0],
        [1,1]
      ]
    };
    this.currentAnimation = config.currentAnimation || 'idleDown';
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 52;
    this.animationFrameProgress = this.animationFrameLimit;

    this.gameObject = config.gameObject;
  };

  get frame(){
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  };

  setAnimation(key){
    if(this.currentAnimation !== key){
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    };
  };

  updateAnimationProgress(){
    if(this.animationFrameProgress > 0){
      this.animationFrameProgress -= 1;
      return;
    };

    this.animationFrameProgress = this.animationFrameLimit;
    if(this.currentAnimationFrame == 0){
      this.currentAnimationFrame = 1;
    }else{
      this.currentAnimationFrame = 0;
    };

    if(this.frame === undefined){
      this.currentAnimationFrame = 0;
    };
  };

  draw(ctx, camera){
    const x = this.gameObject.x + utils.withGrid(8.5) - camera.x;
    const y = this.gameObject.y + utils.withGrid(4) - camera.y;

    const [frameX, frameY] = this.frame;

    ctx.drawImage(this.image,
      this.primarySrc.x + this.animations[this.currentAnimation][this.currentAnimationFrame][0] * 26,
      this.primarySrc.y + this.animations[this.currentAnimation][this.currentAnimationFrame][1] * 26,
      26, 26,
      x, y,
      26, 26
    );

    ctx.font = "6px Arial";
    ctx.fillStyle = this.gameObject.colorText;
    ctx.strokeStyle = "black";
    ctx.textBaseline = "middle";
    ctx.lineWidth =1;
    const text = `${this.gameObject.displayName}`;
    const textW = ctx.measureText(text).width;
    ctx.strokeText(text, x - textW / 2 + 26 / 2, y - 2.25);
    ctx.fillText(text, x - textW / 2 + 26 / 2, y - 2.25);

    this.updateAnimationProgress();
  };
};
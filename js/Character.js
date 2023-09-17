class Character extends GameObject{
  constructor(config){
    super(config);
    this.colorText = config.colorText || "white";
    this.displayName = config.displayName || undefined;
    this.movingProgressRemaining = 0;
    this.isPlayerControlled = config.isPlayerControlled || false;
    this.defaultAnimationFrameLimit = this.sprite.animationFrameLimit;
    this.directionUpdate = {
      "up": ["y", -1],
      "down": ["y", 1],
      "left": ["x", -1],
      "right": ["x", 1]
    };
  };

  update(state){
    this.updateSprite(state);

    // If is following
    if(this.following.who){
      state.map.currentTarget = 0;
      this.target.x = state.map.match.x;
      this.target.y = state.map.match.y;
    }else{
      state.map.currentTarget = 1;
    };

    if(this.movingProgressRemaining > 0){
      this.updatePosition();
      return;
    } else {
      if(this.isCurrentPlayer && state.arrow){
        this.startBehavior(state,{
          type: "walk",
          direction: state.arrow
        });
        return;
      };
    };
    this.sprite.animationFrameLimit = this.defaultAnimationFrameLimit;
    this.animationFrameProgress = this.animationFrameLimit;
  };

  startBehavior(state, behavior){

      this.direction = behavior.direction;

      if(behavior.type == 'walk'){
        const isSpaceTaken = state.map.isSpaceTaken(this.x, this.y, this.direction);
        const isSpaceTakenCoords = state.map.isSpaceTakenCoords(this.x, this.y, this.direction);
        if(isSpaceTaken){

          const collisionObject = state.map.findObject(isSpaceTakenCoords.x, isSpaceTakenCoords.y);

          //console.log(isSpaceTakenCoords.x, isSpaceTakenCoords.y)
          //console.log(collisionObject)

          behavior.retry && setTimeout(()=>{
            this.startBehavior(state, behavior)
          }, 10);

          return;
        };

        // Ready to walk
        /*const nextPos = utils.nextPosition(this.x, this.y, state.arrow);
        state.map.Overworld.target = {x: nextPos.x, y: nextPos.y};*/
        //state.map.moveWall(this.x, this.y, this.direction);
        this.moving = true;
        this.movingProgressRemaining = 26;
        this.sprite.animationFrameLimit = 10;
        this.animationFrameProgress = this.animationFrameLimit;
        if(this.currentAnimationFrame == 0){
          this.currentAnimationFrame = 1;
        }else{
          this.currentAnimationFrame = 0;
        };
      };

    if(behavior.type === 'stand'){
      setTimeout(()=>{
        utils.emitEvent("CharacterStandComplete", {
          whoId: this.id
        });
      }, behavior.time);
    }

  };

  updatePosition(){

      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaining -= 1;

      if(this.movingProgressRemaining === 0){
        utils.emitEvent("CharacterWalkingComplete", {
          whoId: this.id
        });
        this.moving = false;
      };
      
      if(this.displayName == "Hero Lv.507" ){
        //console.log(this.x, this.y);
      };

  };

  updateSprite(state){
    if(this.direction !== 'down' && this.direction !== 'up'){
      this.sprite.setAnimation('idle' + this.direction.charAt(0).toUpperCase() + this.direction.slice(1));
    };
  };
};
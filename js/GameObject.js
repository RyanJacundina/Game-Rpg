class GameObject{
  constructor(config){
    this.id = null;
    this.type = config.type || null;

    this.displayName = config.displayName || undefined;
    this.colorText = config.colorText || "white";
    this.visible = {
      sprite: config.visible.sprite || true,
      displayName: config.visible.displayName || true,
      miniHud: config.visible.miniHud || false,
      level: config.visible.level || true
    };
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || 'down';
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || 'assets/characters/pack.png',
      primarySrc: config.primarySrc || {x: 0, y: 0},
      animationFrameLimit: config.animationFrameLimit || 52
    });
   
    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopWaiting = [];
    this.behaviorContinuos = config.behaviorContinuos || false;
    this.behaviorLoopIndex = 0;
    this.doingBehaviorLoop = false;

    this.following = {state: false, who: null};
  };

  follow(who){
    this.following.state = true;
    this.following.who = who;
  };

  stopToFollow(){
    this.following.state = false;
    this.following.who = null;
  };

  mount(map){
    this.isMounted = true;
    if(this.type == "player"){}else{
      //map.addWall(this.x, this.y);
    };

    // If we have a behavior event
    setTimeout(()=>{
      this.doBehaviorEvent(map);
    }, 10)
  };

  mountOff(map){
    this.isMounted = false;
    map.removeWall(this.x, this.y);
  };

  update(){
    
  };

  continue(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  };

  async doBehaviorEvent(map, state){

    this.doingBehaviorLoop = true;
    
    if(this.behaviorLoopWaiting.length > 0){
       setTimeout(()=>{
       this.behaviorLoop = map.findPath(
        map,
        this.behaviorLoopState.startAt, 
        this.behaviorLoopState.endAt
      ) || [];
      this.behaviorLoopWaiting = [];
      this.behaviorLoopIndex = 0;
      }, 10);
    };

    if(this.behaviorLoop.length === 0){
      this.doingBehaviorLoop =  false;
      return;
    };

    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    await eventHandler.init();

    if(this.behaviorContinuos){
      this.behaviorLoopIndex += 1;
        if(this.behaviorLoopIndex === this.behaviorLoop.length){
        this.behaviorLoopIndex = 0;
      };
      this.doBehaviorEvent(map);
    }else{
      this.behaviorLoop.shift();
      this.doBehaviorEvent(map);
    };

  };
};
class Player extends Character{
  constructor(config){
    super(config);
    this.colorText = "#00BA3E";
    this.visible = {
      sprite: true,
      displayName: true,
      miniHud: true,
      level: true
    };
  };

  async doBehaviorEvent(map, state){

    this.doingBehaviorLoop = true;

    if(map.match){
      const directions = map.traceRoute(
        {x: this.x, y: this.y}, 
        {x: map.match.x, y: map.match.y}
      );

        //directions.pop();

      this.behaviorLoop = directions;//console.log(directions)
    }else{
      this.behaviorLoop = map.traceRoute(
        {x: this.x, y: this.y}, 
        {x: this.target.x, y: this.target.y}
      );//console.log(this.behaviorLoop)
    };

    if(this.behaviorLoop.length === 0){
      this.behaviorLoop.push( { type: 'stand', direction: this.direction, time: 20 } );
    };

    //await this.continue(10);
    
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    await eventHandler.init();

    this.doBehaviorEvent(map, state);
    

  };
};
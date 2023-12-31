class OverworldEvent{
  constructor( {map, event} ){
    this.map = map;
    this.event = event;
  };

  stand(resolve){

    const who = this.map.gameObjects[this.event.who];
    who.startBehavior( {
      map: this.map
    }, {
      type: "stand",
      direction: this.event.direction,
      time: this.event.time
    });

    const completeHandler = e =>{
      if(e.detail.whoId === this.event.who){
        document.removeEventListener("CharacterStandComplete", completeHandler);
        resolve();
      };
    };

    document.addEventListener("CharacterStandComplete", completeHandler);

  };

  walk(resolve){

    const who = this.map.gameObjects[this.event.who];
    who.startBehavior( {
      map: this.map
    }, {
      type: "walk",
      direction: this.event.direction,
      retry: true
    });

    const completeHandler = e =>{
      if(e.detail.whoId === this.event.who){
        document.removeEventListener("CharacterWalkingComplete", completeHandler);
        resolve();
      };
    };

    document.addEventListener("CharacterWalkingComplete", completeHandler);

  };

  init(){
    return new Promise(resolve =>{
      this[this.event.type](resolve);
    });
  };
};
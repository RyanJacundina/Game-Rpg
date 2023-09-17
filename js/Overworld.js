class Overworld {
  constructor(config){
    this.guiPackImage = new Image();
    this.guiPackImage.src = "assets/gui/pack.png";

    this.element = config.element;
    this.canvas = this.element.querySelector('.game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.map = null;
    this.currentPlayer = config.currentPlayer;
  };

  startGameLoop(){
    const step = ()=>{
 
      // Clear the screen
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

      // Establish the current player camera
      const camera = this.map.gameObjects[this.currentPlayer];

      // Update all objects
      Object.values(this.map.gameObjects).forEach(object =>{
        if(object.isCurrentPlayer){
        }
        object.update({
          arrow: this.directionInput.direction,
          map: this.map
        });
      });

      // Draw map
      this.map.drawMapImage(this.ctx, camera, this.guiPackImage);

      // Draw all objects
      Object.values(this.map.gameObjects).sort((a, b)=>{
        return a.y - b.y;
      }).forEach(object =>{
        object.sprite.draw(this.ctx, camera);
      });

      requestAnimationFrame(()=>{
        step();
      });
    };
    step();
  };

  bindActionInput(){
    new KeyPressListener("Enter", ()=>{
      console.log("Enter!");
      this.map.checkForAction(this.currentPlayer);
    });
  };

  init(){
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.scale(3, 3);

    this.map = new OverworldMap(window.OverworldMaps.World);
    this.map.mountObjects();
    this.map.matrix = data; console.log(this.map)

    this.map.currentPlayer = this.currentPlayer;
    this.map.gameObjects[this.currentPlayer].target = {x: this.map.gameObjects[this.currentPlayer].x, y: this.map.gameObjects[this.currentPlayer].y};console.log(this);

    this.bindActionInput();

    // Establish current player
    this.map.gameObjects[this.currentPlayer].isCurrentPlayer = true;

    this.directionInput = new DirectionInput();
    this.directionInput.init();



    this.startGameLoop();

  };

};
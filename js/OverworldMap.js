class OverworldMap{
  constructor(config, currentPlayer){
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};
    this.currentPlayer = null;

    this.target = {};
    this.targetSrc = [{x: 3, y: 485}, {x: 29, y: 485}];
    this.currentTarget = 0;

    this.mapImage = new Image();
    this.mapImage.src = config.mapImage;
  };

  drawMapImage(ctx, camera, guiPackImage){

    // Draw map
    ctx.drawImage(
      this.mapImage,
      0,0,
      this.mapImage.width, this.mapImage.height,
      utils.withGrid(8.5) - camera.x,
      utils.withGrid(4) - camera.y,
      this.mapImage.width,
      this.mapImage.height
    );
    // Draw target on map
    if(this.gameObjects[this.currentPlayer].target.x == this.gameObjects[this.currentPlayer].x && this.gameObjects[this.currentPlayer].target.y == this.gameObjects[this.currentPlayer].y){}else{
        ctx.drawImage(
          guiPackImage, 
          this.targetSrc[this.currentTarget].x, this.targetSrc[this.currentTarget].y, 
          24, 24, 
          this.gameObjects[this.currentPlayer].target.x + utils.withGrid(8.5) - camera.x, this.gameObjects[this.currentPlayer].target.y + utils.withGrid(4) - camera.y, 
          26, 26
        );
      };

  };

  isSpaceTaken(currentX, currentY, direction){
    const {x,y} = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  };

  isSpaceTakenCoords(currentX, currentY, direction){
    const {x,y} = utils.nextPosition(currentX, currentY, direction);
    return {x, y};
  };

  findObject(x, y){
    Object.values(this.gameObjects).forEach(object =>{
      if(object.isCurrentPlayer){
        trigo = object;
        //console.log(object.x)
      };
    });

    /*Object.values(this.gameObjects).forEach(object =>{
        if(object.isCurrentPlayer){
          this.directionInput.player.x = object.x;
          this.directionInput.player.y = object.y;
        }
        object.update({
          arrow: this.directionInput.direction,
          map: this.map
        });
      });*/

  };

  findPath(map, start, end) {

    const directions = [
      [-1, 0], // Cima
      [1, 0],  // Baixo
      [0, -1], // Esquerda
      [0, 1]   // Direita
    ];

    function isValid(x, y) {
      return x >= 0 && x < map.length && y >= 0 && y < map[0].length;
    }

    const openList = [];
    const closedList = [];

    const startNode = { x: start[0], y: start[1], g: 0, h: 0, f: 0, parent: null };

    openList.push(startNode);

    while (openList.length > 0) {
      openList.sort((a, b) => a.f - b.f);
      const currentNode = openList.shift();

      if (currentNode.x === end[0] && currentNode.y === end[1]) {
        const directions = [];
        let current = currentNode;

        while (current.parent !== null) {
          const dx = current.x - current.parent.x;
          const dy = current.y - current.parent.y;

          if (dx === -1 && dy === 0) {
            directions.push({ type: 'walk', direction: 'up' });
          } else if (dx === 1 && dy === 0) {
            directions.push({ type: 'walk', direction: 'down' });
          } else if (dx === 0 && dy === -1) {
            directions.push({ type: 'walk', direction: 'left' });
          } else if (dx === 0 && dy === 1) {
            directions.push({ type: 'walk', direction: 'right' });
          }

          current = current.parent;
        }

        return directions.reverse();
      }

      closedList.push(currentNode);

      for (const dir of directions) {
        const newX = currentNode.x + dir[0];
        const newY = currentNode.y + dir[1];

        if (!isValid(newX, newY)) {
          continue;
        }
  
        if (map[newX][newY] === 1) {
          continue;
        }

        const g = currentNode.g + 1;
        const h = Math.abs(newX - end[0]) + Math.abs(newY - end[1]);
        const f = g + h;

        const existingClosedNode = closedList.find(node => node.x === newX && node.y === newY);
        if (existingClosedNode && g >= existingClosedNode.g) {
          continue;
        }

        const existingOpenNode = openList.find(node => node.x === newX && node.y === newY);
        if (existingOpenNode && g >= existingOpenNode.g) {
          continue;
        }

        const newNode = { x: newX, y: newY, g, h, f, parent: currentNode };
        openList.push(newNode);
      }
    }

    return null;
  };


  traceRoute(current, next){
    //console.log(current, next)

    const map = utils.withMatrix(this.mapImage, this.walls, this.gameObjects[this.currentPlayer]);
    const startAt = utils.asMatrixCoords(current.x, current.y);
    const startPoint = [startAt.y, startAt.x];
    const endAt = utils.asMatrixCoords(next.x, next.y);
    const endPoint = [endAt.y, endAt.x];
    

    const directions = this.findPath(map, startPoint, endPoint) || [];
    return directions;

  };

  mountObjects(){
    Object.keys(this.gameObjects).forEach(key =>{
      let object = this.gameObjects[key];
      object.id = key;

      object.mount(this);
    });



  var counterY = -104;
  var counterX = -234;

  for(let y = 0; y < 9; y += 1){
    for(let x = 0; x < 19; x += 1){
      const block = document.querySelector(`#screen-input-row-${counterY} #screen-input-${counterX}`);
      block.y = counterY;
      block.x = counterX;

      if(block){
        block.addEventListener("click", (e)=>{

          const current = this.gameObjects[this.currentPlayer];
          const next = {x: current.x + block.x, y: current.y + block.y};
          this.gameObjects[this.currentPlayer].stopToFollow();//console.log(this.gameObjects[this.currentPlayer]);
          const match = this.checkForAction(next);
          this.match = match;console.log(this)

          // Verify if has match
          if(match){
            this.gameObjects[this.currentPlayer].follow(match);
          };

          // Verify if the player x is walking or no and aply target
          if(this.gameObjects[this.currentPlayer].x % 26 === 0){
            this.gameObjects[this.currentPlayer].target.x = next.x;
          }else{
            this.gameObjects[this.currentPlayer].target.x = Math.ceil(next.x / 26) * 26;
          };
          // Verify if the player y is walking or no and aply target
          if(this.gameObjects[this.currentPlayer].y % 26 === 0){
            this.gameObjects[this.currentPlayer].target.y = next.y;
          }else{
            this.gameObjects[this.currentPlayer].target.y = Math.ceil(next.y / 26) * 26;
          };//console.log(this.gameObjects[this.currentPlayer].target.x, this.gameObjects[this.currentPlayer].target.y)

        });
      }
      counterX += 26;
    };
    counterY += 26;
    counterX = -234;
  };
  };

  checkForAction(next){
    const player = {...this.gameObjects[this.currentPlayer]};
    const nextAdjust = {...next};
    /*const match = Object.values(this.gameObjects).find(object =>{
          return `${object.x},${object.y}` === `${next.x},${next.y}`;
    });*/
    const verifyAllPixels = ()=>{ 
      for (let x = next.x; x < next.x + 26; x++) {
        for (let y = next.y; y < next.y + 26; y++) {
          //console.log(next);
          //console.log(x, y);
          const match = Object.values(this.gameObjects).find(object =>{
            return `${object.x},${object.y}` === `${x},${y}`;
          });

          if( match ){
            return match;
          };
        };
      };
      return null;
    };
    const match = verifyAllPixels();


      
        //console.log( match.id )
        return match;
      
    
  };

  addWall(x,y){
    this.walls[`${x},${y}`] = true;
  };

  removeWall(x, y){
    delete this.walls[`${x},${y}`]
  };

  moveWall(wasX, wasY, direction){
    this.removeWall(wasX, wasY);
    const {x,y} = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  };
};

window.OverworldMaps = {
  World: {
    mapImage: 'assets/maps/World.png',
    gameObjects: {
      Hero: new Player({
        x: utils.withGrid(15),
        y: utils.withGrid(15),
        type: "player",
        colorText: "#00BA3E",
        visible: {
          miniHud: true
        },
        displayName: "Hero Lv.507",
        animationFrameLimit: 52
      }), 
      Crow: new Enemy({
        x: utils.withGrid(14),
        y: utils.withGrid(15),
        displayName: "Crow Lv.6",
        visible: {
          miniHud: true
        },
        primarySrc: {x: 34, y: 12},
        behaviorContinuos: true,
        behaviorLoop: [
          { type: 'stand', direction: 'left', time: 3000 },
          { type: 'walk', direction: 'left' },
          { type: 'walk', direction: 'left' },
          { type: 'walk', direction: 'left' },
          { type: 'walk', direction: 'left' },
          { type: 'walk', direction: 'left' },
          { type: 'walk', direction: 'left' },
          { type: 'walk', direction: 'left' },
          { type: 'walk', direction: 'up' },
          { type: 'walk', direction: 'up' },
          { type: 'walk', direction: 'up' },
          { type: 'walk', direction: 'up' },
          { type: 'walk', direction: 'up' },
          { type: 'walk', direction: 'up' },
          { type: 'walk', direction: 'right' },
          { type: 'walk', direction: 'right' },
          { type: 'walk', direction: 'right' },
          { type: 'walk', direction: 'right' },
          { type: 'walk', direction: 'right' },
          { type: 'walk', direction: 'right' },
          { type: 'walk', direction: 'right' },
          { type: 'walk', direction: 'down' },
          { type: 'walk', direction: 'down' },
          { type: 'walk', direction: 'down' },
          { type: 'walk', direction: 'down' },
          { type: 'walk', direction: 'down' },
          { type: 'walk', direction: 'down' },
        ]
      }),
      SuppliesNpc: new Character({
        x: utils.withGrid(10),
        y: utils.withGrid(6),
        displayName: "Supplies Merchant",
        visible: {
          miniHud: false,
          level: false
        },
        primarySrc: {x: 8, y: 2}
      }),
      SupporterNpc: new Character({
        x: utils.withGrid(12),
        y: utils.withGrid(5),
        displayName: "Supporter Merchant",
        visible: {
          miniHud: false,
          level: false
        },
        primarySrc: {x: 8, y: 0}
      }),
      GearNpc: new Character({
        x: utils.withGrid(10),
        y: utils.withGrid(18),
        displayName: "Gear Merchant",
        visible: {
          miniHud: false,
          level: false
        },
        primarySrc: {x: 8, y: 4}
      }),
      VaultNpc: new Character({
        x: utils.withGrid(22),
        y: utils.withGrid(18),
        displayName: "Vault Merchant",
        visible: {
          miniHud: false,
          level: false
        },
        primarySrc: {x: 4, y: 2}
      }),
    },
    walls: {
      [utils.asGridCoords(0,0)] : true,
    }
  }
};

for(var y in data){
	for(var x in data[y]){
		if(data[y][x] == 1){
			window.OverworldMaps.World.walls[utils.asGridCoords(x,y)] = true
		};
	};
};
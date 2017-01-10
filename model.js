var model = {
  gridSize: 51,
  frameInterval: 100,
  paused: true,
  direction: "",
  snakeCoordinates: [],
  snakeHead: {},
  snakeTail: {},
  foodCoordinates: {},

  init: function() {
    this.setBeginningSnakeBody();
    this.setFoodCoordinates();
  },

  // returns a coordinates object based on random selection from grid
  getRandomCoordinates: function() {
    var x = Math.floor(Math.random() * this.gridSize);
    var y = Math.floor(Math.random() * this.gridSize);
    return {x: x, y: y};
  },

  setBeginningSnakeBody: function() {
    var mid = Math.floor(this.gridSize / 2);
    // set coordinates to object with x and y properties
    var headStart = {x: mid, y: mid};
    this.snakeCoordinates = [headStart];
  },

  setFoodCoordinates: function() {
    var food = this.getRandomCoordinates();
    if (this.include(food)) {
      setFoodCoordinates();
    } else {
      this.foodCoordinates = food;
    };
  },

  snakeMovement: function() {
    var nextSquare = this.dup(this.snakeCoordinates[0]);
    switch (this.direction) {
      case 'up':
        nextSquare.y += 1;
        break;
      case 'right':
        nextSquare.x -= 1;
        break;
      case 'down':
        nextSquare.y -= 1;
        break;
      case 'left':
        nextSquare.x += 1;
        break;
      default:
        return true;
    };
    this.snakeCoordinates.unshift(nextSquare);
    this.snakeHead = this.snakeCoordinates[0];
    this.snakeTail = this.snakeCoordinates.pop();
  },

  collision: function() {
    if (this.include(this.snakeHead, this.snakeCoordinates.slice(2))) {
      return true;
    } else if (this.hitWall()){
      return true;
    };
  },

  hitWall: function() {
    if (this.snakeCoordinates[0].x > this.gridSize || this.snakeCoordinates[0].x < 0) {
      return true;
    } else if (this.snakeCoordinates[0].y > this.gridSize || this.snakeCoordinates[0].y < 0) {
      return true;
    };
  },

  foodEaten: function() {
    return this.include(this.foodCoordinates);
  },

  addSquareToSnake: function() {
    this.snakeHead = this.foodCoordinates;
    this.snakeCoordinates.unshift(this.foodCoordinates);
  },

  include: function(xYCoordinates, collection) {
    var collection = collection || this.snakeCoordinates
    console.log(collection);
    for (var i = 0; i < collection.length; i++) {
      if (collection[i].x === xYCoordinates.x && collection[i].y === xYCoordinates.y) {
        return true;
      }
    };
    return false;
  },

  dup: function(obj) {
    return $.extend({}, obj);
  }

};

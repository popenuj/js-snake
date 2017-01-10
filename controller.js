var controller = {

  init: function() {
    // assign variables
    view.gridSize = model.gridSize;
    view.movementSpeed = model.movementSpeed;
    // call to set game board and place snake head
    view.init();
    model.init();
    this.gameLoop();
  },

  gameLoop: function(pressedKey) {
    var play = setInterval(function() {
      model.snakeMovement();
      if (model.direction) {
        view.renderBoard(model.foodCoordinates, model.snakeCoordinates, model.snakeTail);
      };
      if (model.foodEaten()) {
        controller.updateFood();
      };
      if (model.collision()) {
        clearInterval(play);
        alert('Game Over! Your score was ' + (model.snakeCoordinates.length - 1) + '.');
      };
    }, model.frameInterval);
  },

  updateDirection: function(pressedKey) {
    switch (pressedKey) {
      case 'ArrowUp':
        if (model.direction !== 'down') {
          model.direction = 'up';
        }
        break;
      case 'ArrowRight':
        if (model.direction !== 'left') {
          model.direction = 'right';
        }
        break;
      case 'ArrowDown':
        if (model.direction !== 'up') {
          model.direction = 'down';
        }
        break;
      case 'ArrowLeft':
        if (model.direction !== 'right') {
          model.direction = 'left';
        }
        break;
    };
  },

  updateFood: function() {
    model.addSquareToSnake();
    view.changeClassAtSquare('remove', 'food', model.foodCoordinates);
    model.setFoodCoordinates();
    view.changeClassAtSquare('add', 'food', model.foodCoordinates);
  }

};
$(document).ready(function() {
  controller.init();
});

var view = {

  init: function() {
    this.setUpBoard();
  },

  // makes calls to create rows and then individual squares within rows
  setUpBoard: function() {
    this.setRows();
    this.setColumns();
    this.setGameBoardListener();
    this.setSnakeStart();
  },

  setRows: function() {
    // loop and create amount of rows corresponding to grid size
    var i = this.gridSize;
    while (i--) {
      // create a div to append to the board
      var rowDiv = this.createDiv("row");
      // append div to the board and assign it a specific id based on i in loop
      $(".board").append(rowDiv.attr("id", i))
    };
  },

  setColumns: function() {
    // assign self to this because .each's this will reference the window
    var self = this
    // iterate through created rows and attach individual squares
    $(".row").each(function(index, element) {
      var i = self.gridSize;
      // create a div to append to the board
      while (i--) {
        // create div to append to the row
        var columnDiv = self.createDiv("square");
        // append div to the row and assign it a unique id
        $(element).append(columnDiv.attr("id", i));
      };
    });
  },

  createDiv: function(className) {
    var $div = $("<div>");
    $div.addClass(className);
    return $div;
  },

  // set listener on document for key presses
  setGameBoardListener: function() {
    $(document).on('keyup', function(event) {
      controller.updateDirection(event.originalEvent.code);
    });
  },

  // sets snake's starting position in middle of the board
  setSnakeStart: function() {
    // calculates center point for start
    var mid = Math.floor(this.gridSize / 2);
    // set coordinates to object with x and y properties
    var xYCoordinates = {x: mid, y: mid};
    this.changeClassAtSquare('add', 'snake', xYCoordinates);
  },

  addFoodToSquare: function(xYCoordinates) {
    this.changeClassAtSquare('add' ,'food', xYcoordinates);
  },

  removeFoodFromSquare: function(xYCoordinates) {
    this.changeClassAtSquare('remove', 'food', xYCoordinates);
  },

  // takes a coordinate object and a string of class name(s)
  // to be added or removed from square based on method
  changeClassAtSquare: function(method, className, xYCoordinates) {
    // find row by id based on y coordinate
    var row = $('.row').filter('#' + xYCoordinates.y);
    // filter square in row by id based on x coordinate
    var square = row.children('#' + xYCoordinates.x);
    // check the method and either add or remove a class
    if (method === 'add') {
      square.addClass(className);
    } else if (method === 'remove') {
      square.removeClass(className);
    };
  },

  renderBoard: function(foodCoordinates, snakeCoordinates, snakeTail) {
    this.renderFood(foodCoordinates);
    this.renderSnake(snakeCoordinates, snakeTail);
  },

  renderSnake: function(snakeCoordinates, snakeTail) {
    // iterate through all coordinates except tail and add snake class to square
    view.changeClassAtSquare('add', 'snake', snakeCoordinates[0]);
    // remove the old tail from the board
    view.changeClassAtSquare('remove', 'snake', snakeTail);
  },

  renderFood: function(foodCoordinates) {
    view.changeClassAtSquare('add', 'food', foodCoordinates);
  }

};

function puzzle_handler(img_url, difficulty_level){
  var context = document.getElementById("puzzle").getContext("2d");
  // get image source
  var img = new Image(480, 480);
  //img.src = 'http://www.brucealderman.info/Images/dimetrodon.jpg';
  img.src = img_url;
  addEventListener('load', drawTiles, false);

  var realWidth = img.width;
  var realHeight = img.height;
  alert("Original width=" + realWidth + ", " + "Original height=" + realHeight);

  // extrac canvase size
  var boardSize = document.getElementById('puzzle').width;
  var tileCount = difficulty_level;

  // calculate the sliding size
  var tileSize = boardSize / tileCount;

  // the blank and user click position
  var clickLoc = new Object;
  clickLoc.x = 0;
  clickLoc.y = 0;

  var emptyLoc = new Object;
  emptyLoc.x = 0;
  emptyLoc.y = 0;
  // declare board
  var boardParts = new Object;
  setBoard();

  // rescale the image if the difficulty-level is changeds
  // document.getElementById('scale').onchange = function () {
  //   tileCount = this.value;
  //   tileSize = boardSize / tileCount;
  //   setBoard();
  //   drawTiles();
  //   console.log(tileSize); 
  // };

  // track mouse movemnet for which title the user is clicked
  document.getElementById('puzzle').onmousemove = function (e) {
    clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
    clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
  };

  document.getElementById('puzzle').onclick = function () {
    // only make the position change when clicked within a range
    if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
      slideTile(emptyLoc, clickLoc);
      drawTiles();
    }
    if (solved) {
      alert("You solved it!");
    }
  };

  // initialize the image board
  function setBoard() {
    boardParts = new Array(tileCount);
    for (var i = 0; i < tileCount; ++i) {
      boardParts[i] = new Array(tileCount);
      for (var j = 0; j < tileCount; ++j) {
        boardParts[i][j] = new Object;
        boardParts[i][j].x = (tileCount - 1) - i;
        boardParts[i][j].y = (tileCount - 1) - j;
      }
    }
    emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x;
    emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
    solved = false;
  }

  function distance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  // function to moving the tile
  function slideTile(toLoc, fromLoc) {
    if (!solved) {
      boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
      boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
      boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
      boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
      toLoc.x = fromLoc.x;
      toLoc.y = fromLoc.y;
      checkSolved();
    }
  }

  // check if the puzzle is solved 
  function checkSolved() {
    var flag = true;
    for (var i = 0; i < tileCount; ++i) {
      for (var j = 0; j < tileCount; ++j) {
        if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
          flag = false;
        }
      }
    }
    solved = flag;
  }

  // redraw the puzzle from the canvase with the new image
  function drawTiles() {
    context.clearRect(0, 0, boardSize, boardSize);
    for (var i = 0; i < tileCount; ++i) {
      for (var j = 0; j < tileCount; ++j) {
        var x = boardParts[i][j].x;
        var y = boardParts[i][j].y;
        console.log(x)
        if (i != emptyLoc.x || j != emptyLoc.y || solved == true) {
          context.drawImage(img, 
            x * tileSize, 
            y * tileSize, 
            tileSize, 
            tileSize,
            i * tileSize, 
            j * tileSize, 
            tileSize, 
            tileSize
          );
        }
      }
    }
  }


}// end of puzzle_hanlder
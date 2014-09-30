var canvas = document.getElementById("game-canvas");

var ctx = canvas.getContext("2d");

var loop;

var WIDTH = 500,
    HEIGHT = 500;

var xPos = 0,   // starting positions for
    yPos = 15;  // the player

var charWidth = 10;
var charHeight = 15;

var MAX_PLAYER_X = (WIDTH / charWidth) * charWidth - charWidth;
var MAX_PLAYER_Y = 33 * charHeight;

var points = 0;

var updatesSinceLastTick = 0;

document.onkeypress = function(evt) {
  evt = evt || window.event;
  var keyCode = evt.keyCode || evt.which;

  var movementKeys = [119, 107, 115, 106, 97, 104, 100, 108, 112];
  if ( movementKeys.indexOf(keyCode) >= 0 ) {
    movePlayer(keyCode);
  }

  if (keyCode == 117) { // U
    attack();
  }
}

var movePlayer = function(keyCode) {
  var monsterAbove = arrayContains( monsters, [xPos, yPos - charHeight ]);
  var monsterBelow = arrayContains( monsters, [xPos, yPos + charHeight ]);
  var monsterLeft  = arrayContains( monsters, [xPos - charWidth, yPos]);
  var monsterRight = arrayContains( monsters, [xPos + charWidth, yPos]);

  if (keyCode == 119 || keyCode == 107) { // W or H
    if ( yPos > charHeight && !monsterAbove ) {
      yPos -= charHeight;
    }
  }
  if (keyCode == 115 || keyCode == 106) { // S or J
    if (yPos < MAX_PLAYER_Y && !monsterBelow) {
      yPos += charHeight;
    }
  }
  if (keyCode == 97  || keyCode == 104) { // A or H
    if (xPos > 0 && !monsterLeft) {
      xPos -= charWidth;
    }
  }
  if (keyCode == 100 || keyCode == 108) { // D or L
    if (xPos < MAX_PLAYER_X && !monsterRight) {
      xPos += charWidth;
    }
  }
  if (keyCode == 112) { // p
    console.log(monsters);
    console.log(xPos, yPos);
  }
}

var start = function() {
  if (typeof loop != "undefined") {
    clearInterval(loop);
  }
  loop = setInterval(update, 60);

  // this will always stay the same,
  // so it is specified here
  ctx.font = "20px inconsolata";

  monsters = createMonsters();
};

var update = function() {
  draw();
  checkForWin();

  updatesSinceLastTick += 1;
  if (updatesSinceLastTick == 5) {
    updatesSinceLastTick = 0;
    tick();
  }
}

var draw = function() {
  // fill screen
  ctx.fillStyle = "#292724";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // draw character
  ctx.fillStyle = "#DEC335";
  ctx.fillText("@", xPos, yPos);

  drawMonsters(monsters);
};

var tick = function() {
  // move monsters
  for (var m = 0; m < monsters.length; m++) {
    var x = Math.random();

    if ( x < 0.3 && monsters[m][0] < MAX_PLAYER_X ) {
      monsters[m][0] += charWidth; // move to left
    } else if ( x < 0.5 && monsters[m][0] > 0 ) {
      monsters[m][0] -= charWidth; // move to right
    }

    var y = Math.random();
    if (y < 0.3 && monsters[m][1] < MAX_PLAYER_Y ) {
      monsters[m][1] += charHeight; // move down
    } else if (x < 0.5 && monsters[m][1] > charHeight ) {
      monsters[m][1] -= charHeight; // move up
    }
  }
};

var checkForWin = function() {
  if (points == MONSTER_COUNT) {
    // fill screen
    ctx.fillStyle = "#292724";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    var sound = new Audio("assets/win.wav");
    sound.play();
    clearInterval(loop);

    // show win text
    document.getElementById("win-message").style.display = "block";
  }
}

start();

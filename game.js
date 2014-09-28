var canvas = document.getElementById("game-canvas");

var ctx = canvas.getContext("2d");

var WIDTH = 500,
    HEIGHT = 500;

var xPos = 0,   // starting positions for
    yPos = 15;  // the player

var charWidth = 10;
var charHeight = 15;

var MAX_PLAYER_X = (WIDTH / charWidth) * charWidth - charWidth;
var MAX_PLAYER_Y = 33 * charHeight;

var MONSTER_COUNT = Math.floor( Math.random() * (8 - 1) ) + 1;
var monsters;

var points = 0;

var arrayContains = function(array, value) {
  return array.some( function(row) {
    return row.toString() == value.toString();
  });
};
var subArrayIndex = function(array, sub) {
  for (var i = 0; i < array.length; i++) {
    if ( array[i].toString() == sub.toString() ) {
      return i;
    }
  }
  return -1;
}

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

var attack = function() {
  var monsterAbove = arrayContains( monsters, [xPos, yPos - charHeight ]);
  var monsterBelow = arrayContains( monsters, [xPos, yPos + charHeight ]);
  var monsterLeft  = arrayContains( monsters, [xPos - charWidth, yPos]);
  var monsterRight = arrayContains( monsters, [xPos + charWidth, yPos]);

  ctx.fillStyle = "#F00";

  if (monsterAbove) {
    monsterIndex = subArrayIndex( monsters, [xPos, yPos - charHeight] );
    monsters.splice(monsterIndex, 1);
    ctx.fillText("|", xPos, yPos - charHeight);
    points += 1;
  }
  if (monsterBelow) {
    monsterIndex = subArrayIndex( monsters, [xPos, yPos + charHeight] );
    monsters.splice(monsterIndex, 1);
    ctx.fillText("|", xPos, yPos + charHeight);
    points += 1;
  }
  if (monsterLeft) {
    monsterIndex = subArrayIndex( monsters, [xPos - charWidth, yPos] );
    monsters.splice(monsterIndex, 1);
    ctx.fillText("-", xPos - charWidth, yPos);
    points += 1;
  }
  if (monsterRight) {
    monsterIndex = subArrayIndex( monsters, [xPos + charWidth, yPos] );
    monsters.splice(monsterIndex, 1);
    ctx.fillText("-", xPos + charWidth, yPos);
    points += 1;
  }
}

var start = function() {
  if (typeof loop != "undefined") {
    clearInterval(loop);
  }
  var loop = setInterval(update, 60);

  // this will always stay the same,
  // so it is specified here
  ctx.font = "20px inconsolata";

  monsters = createMonsters();
};

var update = function() {
  draw();
  checkForWin();
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

var checkForWin = function() {
  if (points == MONSTER_COUNT) {
    // fill screen
    ctx.fillStyle = "#292724";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // show win text
    document.getElementById("win-message").style.display = "block";
  }
}

var createMonsters = function() {
  positions = [];

  for (var i = 0; i < MONSTER_COUNT; i++) {
    var xPos = (Math.floor( Math.random() * 50 / 1 ) + 1) * charWidth,
        yPos = (Math.floor( Math.random() * 33 / 1 ) + 1) * charHeight;
    console.log("created monster at", xPos, yPos);

    positions.push([xPos, yPos]);
  }

  return positions;
};

var drawMonsters = function(positions) {
  ctx.fillStyle = "#BADA55";
  for (var i = 0; i < positions.length; i++) {
    ctx.fillText( "m", positions[i][0], positions[i][1] );
  }
};

start();


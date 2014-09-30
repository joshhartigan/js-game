var MONSTER_COUNT = Math.floor( Math.random() * (15 - 5) ) + 5;
var monsters;

var attack = function() {
  var monsterAbove = arrayContains( monsters, [xPos, yPos - charHeight ]);
  var monsterBelow = arrayContains( monsters, [xPos, yPos + charHeight ]);
  var monsterLeft  = arrayContains( monsters, [xPos - charWidth, yPos]);
  var monsterRight = arrayContains( monsters, [xPos + charWidth, yPos]);

  var sound = new Audio("assets/hit.wav");

  if (monsterAbove || monsterBelow || monsterLeft || monsterRight) {
    points += 1;
    ctx.fillStyle = "#F00";
    sound.play();
  }

  if (monsterAbove) {
    monsterIndex = subArrayIndex( monsters, [xPos, yPos - charHeight] );
    monsters.splice(monsterIndex, 1);
    ctx.fillText("|", xPos, yPos - charHeight);
  }
  if (monsterBelow) {
    monsterIndex = subArrayIndex( monsters, [xPos, yPos + charHeight] );
    monsters.splice(monsterIndex, 1);
    ctx.fillText("|", xPos, yPos + charHeight);
  }
  if (monsterLeft) {
    monsterIndex = subArrayIndex( monsters, [xPos - charWidth, yPos] );
    monsters.splice(monsterIndex, 1);
    ctx.fillText("-", xPos - charWidth, yPos);
  }
  if (monsterRight) {
    monsterIndex = subArrayIndex( monsters, [xPos + charWidth, yPos] );
    monsters.splice(monsterIndex, 1);
    ctx.fillText("-", xPos + charWidth, yPos);
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


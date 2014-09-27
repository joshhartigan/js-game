var canvas = document.getElementById("game-canvas");

var ctx = canvas.getContext("2d");

var WIDTH = 500,
    HEIGHT = 500;

var xPos = 0,
    yPos = 15;

document.onkeypress = function(evt) {
  evt = evt || window.event;
  var keyCode = evt.keyCode || evt.which;
  console.log(keyCode);

  if (keyCode == 119 || keyCode == 107) { // W or H
    if (yPos > 15) { yPos -= 20; }
  }
  if (keyCode == 115 || keyCode == 106) { // S or J
    if (yPos < 495) { yPos += 20; }
  }
  if (keyCode == 97  || keyCode == 104) { // A or H
    if (xPos > 0) { xPos -= 20; }
  }
  if (keyCode == 100 || keyCode == 108) { // D or L
    if (xPos < 480) { xPos += 20; }
  }
}

var draw = function() {
  // fill screen
  ctx.fillStyle = "#292724";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // draw character
  ctx.font = "20px inconsolata";
  ctx.fillStyle = "#EEE";
  ctx.fillText("@", xPos, yPos)
};

var start = function() {
  if (typeof loop != "undefined") {
    clearInterval(loop);
  }
  var loop = setInterval(draw, 10);
};

start();


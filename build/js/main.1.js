'use strict';

console.clear();

var land = '#6365de',
    water = '#943c84',
    steel = '#b5b2b5';

var speed = 2;

var b = void 0,
    pipes = [],
    plane = void 0,
    log = void 0,
    hitsCount = 0,
    xoff = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  b = new Bird();
  plane = new Plane();
  log = new Log();
  // noLoop();
}

function draw() {
  background(water);

  if (frameCount % 10 === 0) {
    xoff += 1;
    pipes.push(new Pipe({
      w: xoff
    }));
  }

  for (var i = pipes.length - 1; i > 0; i--) {
    pipes[i].render();
    pipes[i].update();

    if (pipes[i].hits(plane)) {
      // console.log(`${frameCount}: HITS`);
      log.updateText(hitsCount++);
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  plane.render();
  plane.update();

  log.render();
}

function keyPressed() {
  if (key == ' ') {
    b.up();
  }
}

function mouseMoved() {
  log.updateText(mouseX);
  if (mouseX < width / 2 - 50) {
    plane.dir = -1;
  } else if (mouseX > width / 2 + 50) {
    plane.dir = 1;
  } else {
    plane.dir = 0;
  }
}

function mousePressed() {
  b.up();
}

/*function onOrientationChange (e) {
  alert();
} */

function deviceMoved(e) {
  alert(e.alpha, e.beta, e.gamma);
}

function deviceTurned(e) {
  alert(e.alpha, e.beta, e.gamma);
}

function deviceShaken() {
  alert('deviceShaken');
}

window.addEventListener('deviceorientation', function (e) {
  // alert('ddd');

  var alpha = e.alpha,
      beta = e.beta,
      gamma = e.gamma;

  plane.dir = e.gamma * .5;

  // log.updateText(alpha + " " + beta + " " + gamma);
});
//# sourceMappingURL=main.1.js.map

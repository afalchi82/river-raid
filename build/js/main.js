'use strict';

var land = '#6365de',
    water = '#943c84',
    steel = '#b5b2b5';

var speed = 2;

var bullets = [],
    pipes = [],
    plane = void 0,
    log = void 0,
    hitsCount = 0,
    xoff = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

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

  for (var _i = bullets.length - 1; _i > 0; _i--) {
    bullets[_i].render();
    bullets[_i].update();

    if (bullets[_i].offscreen()) {
      bullets.splice(_i, 1);
    }
  }

  plane.render();
  plane.update();

  log.render();
}
//# sourceMappingURL=main.js.map


const land = '#6365de',
	water = '#943c84',
  steel = '#b5b2b5'      
;

const speed = 2;


let bullets = [],
    pipes = [],
    plane,
    log,
    hitsCount = 0,
    xoff = 0
;

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
  
  for(let i=pipes.length-1; i > 0; i--) {
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

  for(let i = bullets.length-1; i > 0; i--) {
    bullets[i].render();
    bullets[i].update();

    if (bullets[i].offscreen()) {
      bullets.splice(i, 1);
    }
  }
  
  plane.render();
  plane.update();
  
  
  log.render();
  
  
}
































function keyPressed () {
	if (key == ' ') {
  	b.up();
  } 
} 

function mouseMoved () {
  log.updateText(mouseX)
  if(mouseX < (width/2)-50) {
    plane.dir = -1;
  } else if(mouseX > (width/2)+50) {
    plane.dir = 1;
  } else {
    plane.dir = 0;
  }
}

function mousePressed () {
  bullets.push(new Bullet(plane.pos.x));  
  console.log(bullets.length);
  
}

 

function deviceMoved (e) {
  alert(e.alpha, e.beta, e.gamma);
} 

function deviceTurned (e) {
  alert(e.alpha, e.beta, e.gamma);
}

function deviceShaken () {
  alert('deviceShaken');
}

window.addEventListener('deviceorientation', function(e) {
  // alert('ddd');
  
  const alpha = e.alpha,
  	beta = e.beta,
  	gamma = e.gamma
  ;
  
  plane.dir = e.gamma;

  // log.updateText(alpha + " " + beta + " " + gamma);
});

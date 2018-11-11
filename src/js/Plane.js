/* ----------------------------------------
	Plane
---------------------------------------- */
class Plane {
  constructor () {
    this.pos = createVector( width/2, height-80);
    this.w = 20;
    this.h = 20;
    this.dir = 0;    
    this.imgC = loadImage("https://cdn.pbrd.co/images/HMHxkcY.png"); 
    this.imgL = loadImage("https://cdn.pbrd.co/images/HMHxHFw.png"); 
    this.imgR = loadImage("https://cdn.pbrd.co/images/HMHxOmd.png"); 
  }
  
  render () {
    fill(steel);
    let sprite;
    switch (true) {
      case (this.dir > -2 && this.dir < 2): sprite = this.imgC;
        break;
      case (this.dir < 2): sprite = this.imgL;
        break;
      case (this.dir > 2): sprite = this.imgR;
        break;
      default: sprite = this.imgC;
    }
    image(sprite, this.pos.x, this.pos.y, this.w, this.w);
  }
  
  update () {
    this.pos.x += this.dir;
    this.pos.x = constrain(this.pos.x, 0, width-this.w);
    /*
    if( this.pos.x > width - this.w) {
      this.pos.x = width - this.w;
    } else if ( this.pos.x < 0) {
      this.pos.x = 0;
    }*/
    
  }
  
}
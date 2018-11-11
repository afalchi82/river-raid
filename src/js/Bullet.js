/* ----------------------------------------
	Bullet
---------------------------------------- */
class Bullet {
  constructor (planePosX) {
    this.x = planePosX;
    this.y = height - 80;
    this.w = 4;
    this.h = 10;
    this.speed = 3;
  }
  
  render () {
    fill(steel);
    rect(this.x, this.y, this.w, this.h)
  }
  
  update () {
    this.y -= this.speed;    
  }

  offscreen () {
    return this.y < 0;
  }
  
}
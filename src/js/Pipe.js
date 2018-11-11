/* ----------------------------------------
	Pipe Class
---------------------------------------- */
class Pipe {
  
  constructor (config) {
  	this.y = -20;
    this.w = noise(config.w) * (width/2);
    this.h = 20;
    this.speed = 2;
    this.offView = false;
    this.highlight = false;
  }
	
  render () {
  	fill(land);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    noStroke();
  	rect(0, this.y, this.w, this.h);
    rect(width-this.w, this.y, width, this.h);
    
    
    // rect(this.x, 0, this.w, this.top);
    // rect(this.x, height - this.bottom, this.w, this.bottom);
  }
  
  update () {
  	this.y += this.speed;    
  }
  
  offscreen () {
    return this.y > height;
  }
  
  hits (plane) {    
    if (this.y+this.h > plane.pos.y) {        
      if (plane.pos.x < this.w || plane.pos.x > width - this.w) {      
        this.highlight = true;
        return true;  
      } 
      
    } 
    return false;
  }
}
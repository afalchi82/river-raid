
/* ----------------------------------------
	Text
---------------------------------------- */
class Log {
  
  constructor (text) {
		this.text = text;
  }
  
  render () {
  	textSize(12);
    textFont('Press Start 2P');
  	text(this.text, 10, 30);
  	fill(0, 102, 153);
  }
  
  updateText (t) {
  	this.text = t;
  }
  
  
}

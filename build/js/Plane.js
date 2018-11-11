"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* ----------------------------------------
	Plane
---------------------------------------- */
var Plane = function () {
  function Plane() {
    _classCallCheck(this, Plane);

    this.pos = createVector(width / 2, height - 80);
    this.w = 10;
    this.h = 20;
    this.dir = 0;
    this.imgC = loadImage("https://cdn.pbrd.co/images/HMHxkcY.png");
    this.imgL = loadImage("https://cdn.pbrd.co/images/HMHxHFw.png");
    this.imgR = loadImage("https://cdn.pbrd.co/images/HMHxOmd.png");
  }

  _createClass(Plane, [{
    key: "render",
    value: function render() {
      fill(steel);
      // rect(this.pos.x, this.pos.y, 10, 10)
      image(this.imgC, this.pos.x, this.pos.y);
    }
  }, {
    key: "update",
    value: function update() {
      this.pos.x += this.dir;
      this.pos.x = constrain(this.pos.x, 0, width - this.w);
      /*
      if( this.pos.x > width - this.w) {
        this.pos.x = width - this.w;
      } else if ( this.pos.x < 0) {
        this.pos.x = 0;
      }*/
    }
  }]);

  return Plane;
}();
//# sourceMappingURL=Plane.js.map

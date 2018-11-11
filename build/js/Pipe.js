"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* ----------------------------------------
	Pipe Class
---------------------------------------- */
var Pipe = function () {
  function Pipe(config) {
    _classCallCheck(this, Pipe);

    this.y = -20;
    this.w = noise(config.w) * (width / 2);
    this.h = 20;
    this.speed = 2;
    this.highlight = false;
  }

  _createClass(Pipe, [{
    key: "render",
    value: function render() {
      fill(land);
      if (this.highlight) {
        fill(255, 0, 0);
      }
      noStroke();
      rect(0, this.y, this.w, this.h);
      rect(width - this.w, this.y, width, this.h);

      // rect(this.x, 0, this.w, this.top);
      // rect(this.x, height - this.bottom, this.w, this.bottom);
    }
  }, {
    key: "update",
    value: function update() {
      this.y += this.speed;
    }
  }, {
    key: "offscreen",
    value: function offscreen() {
      return this.y > height;
    }
  }, {
    key: "hits",
    value: function hits(plane) {
      if (this.y + this.h > plane.pos.y) {
        if (plane.pos.x < this.w || plane.pos.x > width - this.w) {
          this.highlight = true;
          return true;
        }
      }
      return false;
    }
  }]);

  return Pipe;
}();
//# sourceMappingURL=Pipe.js.map

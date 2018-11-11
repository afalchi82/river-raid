"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* ----------------------------------------
	Bullet
---------------------------------------- */
var Bullet = function () {
  function Bullet(planePosX) {
    _classCallCheck(this, Bullet);

    this.x = planePosX;
    this.y = height - 80;
    this.w = 4;
    this.h = 10;
    this.speed = 3;
  }

  _createClass(Bullet, [{
    key: "render",
    value: function render() {
      fill(steel);
      rect(this.x, this.y, this.w, this.h);
    }
  }, {
    key: "update",
    value: function update() {
      this.y -= this.speed;
    }
  }, {
    key: "offscreen",
    value: function offscreen() {
      return this.y < 0;
    }
  }]);

  return Bullet;
}();
//# sourceMappingURL=Bullet.js.map

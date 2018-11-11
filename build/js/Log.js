'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* ----------------------------------------
	Text
---------------------------------------- */
var Log = function () {
  function Log(text) {
    _classCallCheck(this, Log);

    this.text = text;
  }

  _createClass(Log, [{
    key: 'render',
    value: function render() {
      textSize(12);
      textFont('Press Start 2P');
      text(this.text, 10, 30);
      fill(0, 102, 153);
    }
  }, {
    key: 'updateText',
    value: function updateText(t) {
      this.text = t;
    }
  }]);

  return Log;
}();
//# sourceMappingURL=Log.js.map

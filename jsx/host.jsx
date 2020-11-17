"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hoge = function () {
  function Hoge() {
    _classCallCheck(this, Hoge);

    this.x = 10;
    this.y = 2;
  }

  _createClass(Hoge, [{
    key: "add",
    value: function add() {
      return this.x + this.y;
    }
  }]);

  return Hoge;
}();

var exp = function exp(x, y) {
  return Math.pow(x, y);
};
var hoge = new Hoge();
console.log(exp(hoge.x, hoge.y));
console.log(hoge.add());

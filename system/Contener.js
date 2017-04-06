define(["require", "exports"], function (require, exports) {
    "use strict";
    var Contener = (function () {
        function Contener() {
            this.tiles = [];
            this.val = function (k) {
                return this.tiles[k];
            };
            this.add = function (i) {
                if (!this.exists(i))
                    this.tiles.push(i);
            };
            this.exists = function (i) {
                if (this.tiles.indexOf(i) !== -1) {
                    return true;
                }
                return false;
            };
            this.remove = function (i) {
                var index = this.tiles.indexOf(i);
                if (index > -1) {
                    this.tiles.splice(index, 1);
                }
            };
        }
        Object.defineProperty(Contener.prototype, "length", {
            get: function () {
                return this.tiles.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Contener.prototype, "count", {
            get: function () {
                return this.tiles.length;
            },
            enumerable: true,
            configurable: true
        });
        return Contener;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Contener;
});

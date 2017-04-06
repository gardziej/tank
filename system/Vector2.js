define(["require", "exports"], function (require, exports) {
    "use strict";
    var Vector2 = (function () {
        function Vector2(a, b) {
            if (a instanceof Vector2 && typeof b === 'undefined') {
                this.x = a.x;
                this.y = a.y;
            }
            else {
                this.x = typeof a !== 'undefined' ? a : 0;
                this.y = typeof b !== 'undefined' ? b : 0;
            }
        }
        Object.defineProperty(Vector2, "zero", {
            get: function () {
                return new Vector2();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector2.prototype, "isZero", {
            get: function () {
                return this.x === 0 && this.y === 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector2.prototype, "length", {
            get: function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            enumerable: true,
            configurable: true
        });
        Vector2.prototype.addTo = function (a) {
            if (a.constructor === Vector2) {
                this.x += a.x;
                this.y += a.y;
            }
            else if (a.constructor === Number) {
                this.x += a;
                this.y += a;
            }
            return this;
        };
        Vector2.prototype.add = function (v) {
            var result = this.copy();
            return result.addTo(v);
        };
        ;
        Vector2.prototype.subtractFrom = function (a) {
            if (a.constructor === Vector2) {
                this.x -= a.x;
                this.y -= a.y;
            }
            else if (a.constructor === Number) {
                this.x -= a;
                this.y -= a;
            }
            return this;
        };
        ;
        Vector2.prototype.subtract = function (v) {
            var result = this.copy();
            return result.subtractFrom(v);
        };
        ;
        Vector2.prototype.divideBy = function (a) {
            if (a.constructor === Vector2) {
                this.x /= a.x;
                this.y /= a.y;
            }
            else if (a.constructor === Number) {
                this.x /= a;
                this.y /= a;
            }
            return this;
        };
        ;
        Vector2.prototype.divide = function (a) {
            var result = this.copy();
            return result.divideBy(a);
        };
        ;
        Vector2.prototype.multiplyWith = function (a) {
            if (a.constructor === Vector2) {
                this.x *= a.x;
                this.y *= a.y;
            }
            else if (a.constructor === Number) {
                this.x *= a;
                this.y *= a;
            }
            return this;
        };
        ;
        Vector2.prototype.multiply = function (a) {
            var result = this.copy();
            return result.multiplyWith(a);
        };
        ;
        Vector2.prototype.toString = function () {
            return "(" + this.x + ", " + this.y + ")";
        };
        ;
        Vector2.prototype.copy = function () {
            return new Vector2(this.x, this.y);
        };
        Vector2.prototype.equals = function (obj) {
            return this.x === obj.x && this.y === obj.y;
        };
        ;
        return Vector2;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Vector2;
});

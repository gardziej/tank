define(["require", "exports", './Vector2'], function (require, exports, Vector2_1) {
    "use strict";
    var Rectangle = (function () {
        function Rectangle(x, y, w, h) {
            this.x = typeof x !== 'undefined' ? x : 0;
            this.y = typeof y !== 'undefined' ? y : 0;
            this.width = typeof w !== 'undefined' ? w : 1;
            this.height = typeof h !== 'undefined' ? h : 1;
        }
        Object.defineProperty(Rectangle.prototype, "left", {
            get: function () {
                return this.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "right", {
            get: function () {
                return this.x + this.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "top", {
            get: function () {
                return this.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "bottom", {
            get: function () {
                return this.y + this.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "center", {
            get: function () {
                return this.position.addTo(this.size.divideBy(2));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "position", {
            get: function () {
                return new Vector2_1.default(this.x, this.y);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "size", {
            get: function () {
                return new Vector2_1.default(this.width, this.height);
            },
            enumerable: true,
            configurable: true
        });
        Rectangle.prototype.contains = function (v) {
            v = typeof v !== 'undefined' ? v : new Vector2_1.default();
            return (v.x >= this.left && v.x <= this.right &&
                v.y >= this.top && v.y <= this.bottom);
        };
        ;
        Rectangle.prototype.intersects = function (rect) {
            return (this.left <= rect.right && this.right >= rect.left &&
                this.top <= rect.bottom && this.bottom >= rect.top);
        };
        ;
        return Rectangle;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Rectangle;
});

define(["require", "exports", "./Vector2", "./Color", "./Rectangle"], function (require, exports, Vector2_1, Color_1, Rectangle_1) {
    "use strict";
    var Canvas = (function () {
        function Canvas(id, div, fullScreen) {
            if (fullScreen === void 0) { fullScreen = false; }
            this.canvasOffset = Vector2_1.default.zero;
            this.setCursor = function (type) {
                if (this.canvas.style.cursor !== type) {
                    this.canvas.style.cursor = type;
                }
            };
            this.resize = function () {
                if (this.fullScreen) {
                    this.canvas.width = window.innerWidth;
                    this.canvas.height = window.innerHeight;
                }
                else {
                    this.canvas.width = this.div.getAttribute('width');
                    this.canvas.height = this.div.getAttribute('height');
                    this.canvasOffset.x = this.div.offsetLeft;
                    this.canvasOffset.y = this.div.offsetTop;
                }
                this.width = this.canvas.width;
                this.height = this.canvas.height;
                this.canvas.style.cursor = "default";
            };
            this.setSize = function (x, y) {
                this.width = this.canvas.width = x;
                this.height = this.canvas.height = y;
            };
            this.clear = function () {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            };
            this.drawCircle = function (position, radius, color, lineColor, lineWidth) {
                this.ctx.save();
                this.ctx.fillStyle = color || "none";
                this.ctx.strokeStyle = lineColor || "none";
                this.ctx.beginPath();
                this.ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
                this.ctx.fill();
                if (typeof lineColor !== "undefined") {
                    this.ctx.stroke();
                }
                this.ctx.restore();
            };
            this.drawRectangle = function (x, y, width, height, color, lineColor, lineWidth) {
                this.ctx.save();
                this.ctx.fillStyle = color || "yellow";
                this.ctx.fillRect(x, y, width, height);
                if (lineColor) {
                    this.ctx.strokeStyle = lineColor || "yellow";
                    this.ctx.lineWidth = lineWidth || 1;
                    this.ctx.strokeRect(x, y, width, height);
                }
                this.ctx.restore();
            };
            this.drawImage = function (sprite, position, rotation, origin, sourceRect, shadow) {
                position = typeof position !== 'undefined' ? position : Vector2_1.default.zero;
                rotation = typeof rotation !== 'undefined' ? rotation : 0;
                origin = typeof origin !== 'undefined' ? origin : Vector2_1.default.zero;
                sourceRect = typeof sourceRect !== 'undefined' ? sourceRect : new Rectangle_1.default(0, 0, sprite.img.width, sprite.img.height);
                this.ctx.save();
                this.ctx.translate(position.x, position.y);
                this.ctx.rotate(rotation);
                if (shadow) {
                    this.ctx.shadowColor = shadow.color;
                    this.ctx.shadowBlur = shadow.blur;
                    this.ctx.shadowOffsetX = shadow.offsetX;
                    this.ctx.shadowOffsetY = shadow.offsetY;
                }
                this.ctx.drawImage(sprite.img, sourceRect.x, sourceRect.y, sprite.img.width, sprite.img.height, -origin.x, -origin.y, sourceRect.width, sourceRect.height);
                this.ctx.restore();
            };
            this.drawText = function (text, position, origin, color, textAlign, fontname, fontsize) {
                position = typeof position !== 'undefined' ? position : Vector2_1.default.zero;
                origin = typeof origin !== 'undefined' ? origin : Vector2_1.default.zero;
                color = typeof color !== 'undefined' ? color : Color_1.default.black;
                textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
                fontname = typeof fontname !== 'undefined' ? fontname : "Courier New";
                fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";
                this.ctx.save();
                this.ctx.translate(position.x - origin.x, position.y - origin.y);
                this.ctx.textBaseline = 'top';
                this.ctx.font = fontsize + " " + fontname;
                this.ctx.fillStyle = color.toString();
                this.ctx.textAlign = textAlign;
                this.ctx.fillText(text, 0, 0);
                this.ctx.restore();
            };
            this.measureText = function (text, fontname, fontsize) {
                fontname = typeof fontname !== 'undefined' ? fontname : "Courier New";
                fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";
                this.ctx.save();
                this.ctx.font = fontsize + " " + fontname;
                var len = this.ctx.measureText(text);
                this.ctx.restore();
                return len;
            };
            this.getImageData = function (a, b, c, d) {
                return this.ctx.getImageData(a, b, c, d);
            };
            this.id = id;
            this.div = document.getElementById(div);
            this.canvas = document.getElementById('canvas');
            this.ctx = this.canvas.getContext("2d");
            this.fullScreen = fullScreen;
            this.resize();
        }
        Object.defineProperty(Canvas.prototype, "offset", {
            get: function () {
                return this.canvasOffset;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Canvas.prototype, "cursor", {
            get: function () {
                return this.canvas.style.cursor;
            },
            enumerable: true,
            configurable: true
        });
        return Canvas;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Canvas;
});

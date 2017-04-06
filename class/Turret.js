define(["require", "exports", "../system/system"], function (require, exports, system_1) {
    "use strict";
    var Turret = (function () {
        function Turret(app, sprite, tank) {
            this.position = system_1.default.Vector2.zero;
            this.width = 64;
            this.height = 163;
            this.origin = system_1.default.Vector2.zero;
            this.rotation = Math.PI / 2;
            this.rotationSpeed = 0.03;
            this.direction = true;
            this.rotateRight = function () {
                if (this.direction) {
                    this.rotation += this.rotationSpeed;
                }
                else {
                    this.rotation -= this.rotationSpeed;
                }
            };
            this.rotateLeft = function () {
                if (this.direction) {
                    this.rotation -= this.rotationSpeed;
                }
                else {
                    this.rotation += this.rotationSpeed;
                }
            };
            this.update = function (delta) {
            };
            this.draw = function () {
                this.app.canvas.drawImage(this.sprite, this.position, this.rotation, this.origin, new system_1.default.Rectangle(0, 0, this.width, this.height), this.shadow);
            };
            this.reset = function () {
            };
            this.app = app;
            this.sprite = sprite;
            this.tank = tank;
            this.origin = new system_1.default.Vector2(this.width / 2, this.height / 1.3);
        }
        return Turret;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Turret;
});

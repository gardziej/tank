define(["require", "exports", "../Tank", "../Map", "../../system/system"], function (require, exports, Tank_1, Map_1, system_1) {
    "use strict";
    var DrawPageState = (function () {
        function DrawPageState(app) {
            this.handleInput = function (delta) {
                if (this.app.keyboard.pressed(system_1.default.Key.space)) {
                    console.log('shot');
                    this.tank.shot();
                }
                if (this.app.keyboard.down(system_1.default.Key.left)) {
                    this.tank.rotateLeft();
                }
                if (this.app.keyboard.down(system_1.default.Key.right)) {
                    this.tank.rotateRight();
                }
                if (this.app.keyboard.down(system_1.default.Key.up) && this.app.keyboard.down(system_1.default.Key.down)) {
                    this.tank.decreaseSpeed();
                }
                else if (this.app.keyboard.down(system_1.default.Key.up)) {
                    this.tank.direction = true;
                    this.tank.increaseSpeed(1);
                }
                else if (this.app.keyboard.down(system_1.default.Key.down)) {
                    this.tank.direction = false;
                    this.tank.increaseSpeed(-1);
                }
                else {
                    this.tank.decreaseSpeed();
                }
                if (this.app.keyboard.down(system_1.default.Key.A)) {
                    this.tank.turret.rotateLeft();
                }
                if (this.app.keyboard.down(system_1.default.Key.D)) {
                    this.tank.turret.rotateRight();
                }
            };
            this.update = function (delta) {
                this.tank.update(delta);
            };
            this.draw = function () {
                this.tank.draw();
            };
            this.reset = function () {
                this.tank.reset();
            };
            this.app = app;
            this.map = new Map_1.default();
            this.map.grid[3][3] = 3;
            this.map.print();
            var confTank = {
                width: 116,
                height: 227,
                sprite: this.app.sprites['tank'],
                rotationSpeed: 0.02,
                maxSpeed: 4,
                backwardMaxSpeed: 2,
                acceleration: 0.1,
                waitForNextShot: 1,
                nextShotSpeedRecovery: 2,
                maxLife: 10
            };
            this.tank = new Tank_1.default(this.app, confTank);
        }
        return DrawPageState;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = DrawPageState;
});

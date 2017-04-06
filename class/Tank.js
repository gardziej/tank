define(["require", "exports", "../system/system", "./Turret"], function (require, exports, system_1, Turret_1) {
    "use strict";
    var Tank = (function () {
        function Tank(app, options) {
            this.position = system_1.default.Vector2.zero;
            this.origin = system_1.default.Vector2.zero;
            this.rotation = Math.PI / 2;
            this.moveSpeed = 0;
            this.direction = true;
            this.canShot = true;
            this.toNextShot = 0;
            this.rotateRight = function (speed) {
                if (speed === void 0) { speed = this.rotationSpeed; }
                if (this.direction) {
                    this.rotation += speed;
                    this.turret.rotation += speed;
                }
                else {
                    this.rotation -= speed;
                    this.turret.rotation -= speed;
                }
            };
            this.rotateLeft = function (speed) {
                if (speed === void 0) { speed = this.rotationSpeed; }
                if (this.direction) {
                    this.rotation -= speed;
                    this.turret.rotation -= speed;
                }
                else {
                    this.rotation += speed;
                    this.turret.rotation += speed;
                }
            };
            this.increaseSpeed = function (d) {
                if (this.moveSpeed < this.maxSpeed && this.moveSpeed > this.backwardMaxSpeed * -1) {
                    this.moveSpeed += this.acceleration * d;
                }
                else {
                    this.decreaseSpeed();
                }
            };
            this.decreaseSpeed = function () {
                if (this.moveSpeed != 0)
                    this.moveSpeed /= 1.04;
            };
            this.shot = function () {
                if (!this.canShot)
                    return false;
                this.canShot = false;
                this.toNextShot = this.waitForNextShot;
                var rotation = this.rotation % (Math.PI * 2);
                var turretRotation = this.turret.rotation % (Math.PI * 2);
                var diff = Math.abs(rotation - turretRotation);
                if (diff < Math.PI / 2 || diff > Math.PI * 1.5) {
                    if (diff > Math.PI * 1.5) {
                        diff = Math.abs(Math.PI * 2 - diff);
                    }
                    this.moveSpeed += -2 * Math.abs(Math.PI / 2 - diff);
                }
                else {
                    diff = Math.abs(diff - Math.PI);
                    this.moveSpeed += 2 * Math.abs(Math.PI / 2 - diff);
                }
            };
            this.update = function (delta) {
                if (this.toNextShot > 0) {
                    this.toNextShot -= delta * this.nextShotSpeedRecovery;
                }
                if (this.toNextShot < 0) {
                    this.toNextShot = 0;
                    this.canShot = true;
                }
                this.position.y += Math.sin(this.rotation - Math.PI / 2) * this.moveSpeed;
                this.position.x += Math.cos(this.rotation - Math.PI / 2) * this.moveSpeed;
                this.turret.position = new system_1.default.Vector2(this.position.x, this.position.y);
                this.turret.update(delta);
            };
            this.drawLifeBar = function () {
                var barSize = new system_1.default.Vector2(50, 10);
                var condition = (this.maxLife - (this.maxLife - this.life)) / this.maxLife;
                if (condition < 0)
                    condition = 0;
                this.app.canvas.drawRectangle(this.position.x - barSize.x / 2, this.position.y - 20, barSize.x, 6, "yellow", null, null);
                this.app.canvas.drawRectangle(this.position.x - barSize.x / 2, this.position.y - 20, barSize.x * condition, 6, "green", null, null);
            };
            this.drawShotBar = function () {
                var barSize = new system_1.default.Vector2(50, 10);
                this.app.canvas.drawRectangle(this.position.x - barSize.x / 2, this.position.y - 10, barSize.x, 6, "yellow", null, null);
                this.app.canvas.drawRectangle(this.position.x - barSize.x / 2, this.position.y - 10, barSize.x * (this.waitForNextShot - this.toNextShot), 6, "grey", null, null);
            };
            this.drawBody = function () {
                this.app.canvas.drawImage(this.sprite, this.position, this.rotation, this.origin, new system_1.default.Rectangle(0, 0, this.width, this.height), this.shadow);
            };
            this.draw = function () {
                this.drawBody();
                this.turret.draw();
                this.drawShotBar();
                this.drawLifeBar();
            };
            this.reset = function () {
                this.turret.reset();
            };
            this.app = app;
            this.width = options.width;
            this.height = options.height;
            this.sprite = options.sprite;
            this.rotationSpeed = options.rotationSpeed;
            this.maxSpeed = options.maxSpeed;
            this.backwardMaxSpeed = options.backwardMaxSpeed;
            this.acceleration = options.acceleration;
            this.waitForNextShot = options.waitForNextShot;
            this.nextShotSpeedRecovery = options.nextShotSpeedRecovery;
            this.maxLife = options.maxLife;
            this.life = this.maxLife;
            this.position = new system_1.default.Vector2(200, 300);
            this.origin = new system_1.default.Vector2(this.width / 2, this.height / 2);
            this.turret = new Turret_1.default(this.app, this.app.sprites['turret'], this);
        }
        return Tank;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Tank;
});

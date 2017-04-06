import system from '../system/system';
import Turret from './Turret';

export default class Tank
{
    app;
    sprite;
    position = system.Vector2.zero;
    width : number;
    height : number;
    origin = system.Vector2.zero;
    rotation = Math.PI/2;
    rotationSpeed : number;
    shadow;
    moveSpeed = 0;
    maxSpeed : number;
    backwardMaxSpeed : number;
    acceleration : number;
    direction : boolean = true;
    waitForNextShot : number;
    canShot : boolean = true;
    toNextShot : number = 0;
    nextShotSpeedRecovery : number;
    maxLife : number;
    life : number;
    turret;


    constructor(app, options : iTank)
    {
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
        this.position = new system.Vector2(200,300);
        this.origin = new system.Vector2(this.width/2, this.height/2);
        this.turret = new Turret(this.app, this.app.sprites['turret'], this);
    }

    rotateRight = function (speed = this.rotationSpeed) {
        if (this.direction)
            {
                this.rotation += speed;
                this.turret.rotation += speed;
            }
            else
            {
                this.rotation -= speed;
                this.turret.rotation -= speed;
            }
	}

	rotateLeft = function (speed = this.rotationSpeed) {
        if (this.direction)
            {
                this.rotation -= speed;
                this.turret.rotation -= speed;
            }
            else
            {
                this.rotation += speed;
                this.turret.rotation += speed;
            }
	}

    increaseSpeed = function (d) {
        if (this.moveSpeed < this.maxSpeed && this.moveSpeed > this.backwardMaxSpeed * -1)
            {
                this.moveSpeed += this.acceleration * d;
            }
            else
            {
                this.decreaseSpeed();
            }
    }

    decreaseSpeed = function () {
        if (this.moveSpeed  != 0) this.moveSpeed /= 1.04;
    }

    shot = function () {
        if (!this.canShot) return false;
        this.canShot = false;
        this.toNextShot = this.waitForNextShot;
        let rotation = this.rotation % (Math.PI*2);
        let turretRotation = this.turret.rotation % (Math.PI*2);
        let diff = Math.abs(rotation - turretRotation);

        if (diff < Math.PI / 2 || diff > Math.PI * 1.5)
            {
                if (diff > Math.PI * 1.5) { diff = Math.abs(Math.PI * 2 - diff); }
                this.moveSpeed += -2 * Math.abs(Math.PI / 2 - diff);
            }
            else
            {
                diff = Math.abs(diff - Math.PI);
                this.moveSpeed += 2 * Math.abs(Math.PI / 2 - diff);
            }
    }

    update = function (delta) {
        if (this.toNextShot > 0)
            {
                this.toNextShot -= delta * this.nextShotSpeedRecovery;
            }
        if (this.toNextShot < 0)
            {
                this.toNextShot = 0;
                this.canShot = true;
            }

        this.position.y += Math.sin(this.rotation - Math.PI /2) * this.moveSpeed;
        this.position.x += Math.cos(this.rotation - Math.PI /2) * this.moveSpeed;

        this.turret.position = new system.Vector2(this.position.x, this.position.y);
        this.turret.update(delta);

    };

    drawLifeBar = function () {
        let barSize = new system.Vector2(50,10);
        let condition = (this.maxLife - (this.maxLife - this.life)) / this.maxLife;
        if (condition < 0) condition = 0;
        this.app.canvas.drawRectangle (this.position.x - barSize.x/2, this.position.y - 20, barSize.x, 6, "yellow", null, null);
        this.app.canvas.drawRectangle (this.position.x - barSize.x/2, this.position.y - 20, barSize.x * condition, 6, "green", null, null);
    }
    drawShotBar = function () {
        let barSize = new system.Vector2(50,10);
        this.app.canvas.drawRectangle (this.position.x - barSize.x/2, this.position.y - 10, barSize.x, 6, "yellow", null, null);
        this.app.canvas.drawRectangle (this.position.x - barSize.x/2, this.position.y - 10, barSize.x * (this.waitForNextShot - this.toNextShot), 6, "grey", null, null);
    }

    drawBody = function () {
        this.app.canvas.drawImage (this.sprite,
            this.position,
            this.rotation,
            this.origin,
            new system.Rectangle(0, 0, this.width, this.height),
            this.shadow);
    };

    draw = function () {
        this.drawBody();
        this.turret.draw();
        this.drawShotBar();
        this.drawLifeBar();
    };

    reset = function () {
        this.turret.reset();
    };


}

import system from '../system/system';

export default class Turret
{
    app;
    sprite;
    tank;
    position = system.Vector2.zero;
    width = 64;
    height = 163;
    origin = system.Vector2.zero;
    rotation = Math.PI/2;
    rotationSpeed = 0.03;
    shadow;
    direction : boolean = true;

    constructor(app, sprite, tank)
    {
        this.app = app;
        this.sprite = sprite;
        this.tank = tank;
        this.origin = new system.Vector2(this.width/2, this.height/1.3);
    }

    rotateRight = function () {
        if (this.direction)
            {
                this.rotation += this.rotationSpeed;
            }
            else
            {
                this.rotation -= this.rotationSpeed;
            }
	}

	rotateLeft = function () {
        if (this.direction)
            {
                this.rotation -= this.rotationSpeed;
            }
            else
            {
                this.rotation += this.rotationSpeed;
            }
	}

    update = function (delta) {
    };

    draw = function () {
        this.app.canvas.drawImage (this.sprite,
			this.position,
			this.rotation,
			this.origin,
			new system.Rectangle(0, 0, this.width, this.height),
			this.shadow);
    };

    reset = function () {

    };


}

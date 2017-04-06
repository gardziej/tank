import Tank from '../Tank';
import Map from '../Map';
import system from '../../system/system';

export default class DrawPageState
{
    app;
    tank;
    map : Map;

    constructor(app)
    {
        this.app = app;

        this.map = new Map();
        this.map.grid[3][3] = 3;
        this.map.print();

        let confTank = {
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

        this.tank = new Tank(this.app, confTank);
    }

    handleInput = function (delta) {

        if (this.app.keyboard.pressed(system.Key.space))
    		{
                console.log('shot');
                this.tank.shot();
    		}

        if (this.app.keyboard.down(system.Key.left))
    		{
                this.tank.rotateLeft();
    		}

        if (this.app.keyboard.down(system.Key.right))
            {
                this.tank.rotateRight();
            }

        if (this.app.keyboard.down(system.Key.up) && this.app.keyboard.down(system.Key.down))
            {
                this.tank.decreaseSpeed();
            }
        else if (this.app.keyboard.down(system.Key.up))
            {
                this.tank.direction = true;
                this.tank.increaseSpeed(1);
            }
        else if (this.app.keyboard.down(system.Key.down))
            {
                this.tank.direction = false;
                this.tank.increaseSpeed(-1);
            }
        else
            {
                this.tank.decreaseSpeed();
            }

        if (this.app.keyboard.down(system.Key.A))
    		{
                this.tank.turret.rotateLeft();
    		}

        if (this.app.keyboard.down(system.Key.D))
    		{
                this.tank.turret.rotateRight();
    		}

    };

    update = function (delta) {
        this.tank.update(delta);
    };

    draw = function () {
        this.tank.draw();
    };

    reset = function () {
        this.tank.reset();
    };


}

import ButtonState from './ButtonState';
import Vector2 from './Vector2';

export default class Mouse {
    canvas;
    position;
    wheel;
    left;
    middle;
    right;
    mouse = {
        left: {down: false},
        right: {down: false},
        middle: {down: false},
    };

    constructor(canvas) {
        this.canvas = canvas;
        this.position = Vector2.zero;
        this.wheel = 100;
        this.left = new ButtonState();
        this.middle = new ButtonState();
        this.right = new ButtonState();
        document.onmousemove = this.handleMouseMove.bind(this);
        document.onmousedown = this.handleMouseDown.bind(this);
        document.onmouseup = this.handleMouseUp.bind(this);
        document.onwheel = this.handleMouseWheel.bind(this);
    }

    handleMouseMove = function (evt, canvas) {
        if (typeof canvas === 'undefined' || typeof canvas.offset === 'undefined') return;
        var canvasOffset = canvas.offset;
        var mx = (evt.pageX - canvasOffset.x) ;
        var my = (evt.pageY - canvasOffset.y) ;
        this.mouse.position = new Vector2(mx, my);
        if (this.mouse.left.down) this.mouse.move = true;
    }

    handleMouseWheel = function (evt) {
        this.mouse.wheel += evt.deltaY;
        evt.preventDefault();
        return false;
    }

    handleMouseDown = function (evt) {
        this.handleMouseMove(evt);
        if (evt.which === 1)
            {
                if (!this.mouse.left.down) this.mouse.left.pressed = true;
                this.mouse.left.down = true;
            }
        else if (evt.which === 2)
            {
                if (!this.mouse.middle.down) this.mouse.middle.pressed = true;
                this.mouse.middle.down = true;
            }
        else if (evt.which === 3)
            {
                if (!this.mouse.right.down) this.mouse.right.pressed = true;
                this.mouse.right.down = true;
            }
    }

    handleMouseUp = function (evt) {
        this.handleMouseMove(evt);

        if (evt.which === 1)
            this.mouse.left.down = false;
        else if (evt.which === 2)
            this.mouse.middle.down = false;
        else if (evt.which === 3)
            this.mouse.right.down = false;

        this.mouse.move = false;
    }


    reset = function () {
        this.left.pressed = false;
        this.middle.pressed = false;
        this.right.pressed = false;
    };

    containsMouseDown = function (rect) {
        return this.left.down && rect.contains(this.position);
    };

    containsMousePress = function (rect) {
        return this.left.pressed && rect.contains(this.position);
    };

}

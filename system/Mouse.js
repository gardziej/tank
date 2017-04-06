define(["require", "exports", './ButtonState', './Vector2'], function (require, exports, ButtonState_1, Vector2_1) {
    "use strict";
    var Mouse = (function () {
        function Mouse(canvas) {
            this.mouse = {
                left: { down: false },
                right: { down: false },
                middle: { down: false },
            };
            this.handleMouseMove = function (evt, canvas) {
                if (typeof canvas === 'undefined' || typeof canvas.offset === 'undefined')
                    return;
                var canvasOffset = canvas.offset;
                var mx = (evt.pageX - canvasOffset.x);
                var my = (evt.pageY - canvasOffset.y);
                this.mouse.position = new Vector2_1.default(mx, my);
                if (this.mouse.left.down)
                    this.mouse.move = true;
            };
            this.handleMouseWheel = function (evt) {
                this.mouse.wheel += evt.deltaY;
                evt.preventDefault();
                return false;
            };
            this.handleMouseDown = function (evt) {
                this.handleMouseMove(evt);
                if (evt.which === 1) {
                    if (!this.mouse.left.down)
                        this.mouse.left.pressed = true;
                    this.mouse.left.down = true;
                }
                else if (evt.which === 2) {
                    if (!this.mouse.middle.down)
                        this.mouse.middle.pressed = true;
                    this.mouse.middle.down = true;
                }
                else if (evt.which === 3) {
                    if (!this.mouse.right.down)
                        this.mouse.right.pressed = true;
                    this.mouse.right.down = true;
                }
            };
            this.handleMouseUp = function (evt) {
                this.handleMouseMove(evt);
                if (evt.which === 1)
                    this.mouse.left.down = false;
                else if (evt.which === 2)
                    this.mouse.middle.down = false;
                else if (evt.which === 3)
                    this.mouse.right.down = false;
                this.mouse.move = false;
            };
            this.reset = function () {
                this.left.pressed = false;
                this.middle.pressed = false;
                this.right.pressed = false;
            };
            this.containsMouseDown = function (rect) {
                return this.left.down && rect.contains(this.position);
            };
            this.containsMousePress = function (rect) {
                return this.left.pressed && rect.contains(this.position);
            };
            this.canvas = canvas;
            this.position = Vector2_1.default.zero;
            this.wheel = 100;
            this.left = new ButtonState_1.default();
            this.middle = new ButtonState_1.default();
            this.right = new ButtonState_1.default();
            document.onmousemove = this.handleMouseMove.bind(this);
            document.onmousedown = this.handleMouseDown.bind(this);
            document.onmouseup = this.handleMouseUp.bind(this);
            document.onwheel = this.handleMouseWheel.bind(this);
        }
        return Mouse;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Mouse;
});

define(["require", "exports", "./ButtonState"], function (require, exports, ButtonState_1) {
    "use strict";
    var Keyboard = (function () {
        function Keyboard() {
            this.keyStates = [];
            this.handleKeyDown = function (evt) {
                var code = evt.keyCode;
                if (code < 100)
                    evt.preventDefault();
                if (code < 0 || code > 255)
                    return;
                if (!this.keyStates[code].down)
                    this.keyStates[code].pressed = true;
                this.keyStates[code].down = true;
            };
            this.handleKeyUp = function (evt) {
                var code = evt.keyCode;
                if (code < 0 || code > 255)
                    return;
                this.keyStates[code].down = false;
            };
            this.reset = function () {
                for (var i = 0; i < 256; ++i)
                    this.keyStates[i].pressed = false;
            };
            this.getA = function () {
                for (var i = 0; i < 256; ++i) {
                    if (this.keyStates[i].pressed && this.isAllowed(i))
                        return i;
                }
            };
            this.isAllowed = function (code) {
                if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code == 32))
                    return true;
                return false;
            };
            this.pressed = function (key) {
                return this.keyStates[key].pressed;
            };
            this.down = function (key) {
                return this.keyStates[key].down;
            };
            for (var i = 0; i < 256; ++i)
                this.keyStates.push(new ButtonState_1.default());
            document.onkeydown = this.handleKeyDown.bind(this);
            document.onkeyup = this.handleKeyUp.bind(this);
        }
        return Keyboard;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Keyboard;
});

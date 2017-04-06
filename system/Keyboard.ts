import ButtonState from './ButtonState';

export default class Keyboard {
    private keyStates = [];

    constructor ()
    {
        for (var i = 0; i < 256; ++i)
            this.keyStates.push(new ButtonState());
        document.onkeydown = this.handleKeyDown.bind(this);
        document.onkeyup = this.handleKeyUp.bind(this);
    }

    handleKeyDown = function (evt) {
        var code = evt.keyCode;
        if (code < 100) evt.preventDefault();
        if (code < 0 || code > 255)
            return;
        if (!this.keyStates[code].down)
            this.keyStates[code].pressed = true;
        this.keyStates[code].down = true;
    }

    handleKeyUp = function (evt) {
        var code = evt.keyCode;
        if (code < 0 || code > 255)
            return;
        this.keyStates[code].down = false;
    }

    reset = function () {
        for (var i = 0; i < 256; ++i)
            this.keyStates[i].pressed = false;
    }

    getA = function () {
        for (var i = 0; i < 256; ++i)
            {
                if (this.keyStates[i].pressed && this.isAllowed(i)) return i;
            }
    }

    isAllowed = function (code) {
        if ((code >= 48 && code <=57) || (code >= 65 && code <=90) || (code == 32))
            return true;
        return false;
    }

    pressed = function (key) {
        return this.keyStates[key].pressed;
    }

    down = function (key) {
        return this.keyStates[key].down;
    }

}

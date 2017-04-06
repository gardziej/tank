define(["require", "exports"], function (require, exports) {
    "use strict";
    var ButtonState = (function () {
        function ButtonState() {
            this.down = false;
            this.pressed = false;
        }
        return ButtonState;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ButtonState;
});

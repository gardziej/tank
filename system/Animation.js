define(["require", "exports"], function (require, exports) {
    "use strict";
    var Animation = (function () {
        function Animation(parent, sprite, looping, frameTimeMax, onlyOneframe, range) {
            this.position = {};
            this.frame = {
                start: 0,
                current: 0,
                end: 0
            };
            this.frameSize = {};
            this.ended = false;
            this.rectCorrect = [0, 0, 0, 0];
            this.update = function (delta, position, rectCorrect) {
                if (typeof position !== 'undefined') {
                    this.position = position;
                }
                if (typeof rectCorrect !== 'undefined') {
                    this.rectCorrect = rectCorrect;
                }
                if (this.frame.start !== this.frame.end) {
                    this.frameTime -= delta;
                    if (this.frameTime < 0) {
                        this.frame.current++;
                        this.frameTime = this.frameTimeMax;
                        if (this.frame.current > this.frame.end) {
                            if (this.looping) {
                                this.frame.current = this.frame.start;
                            }
                            else {
                                this.ended = true;
                            }
                        }
                    }
                }
            };
            this.parent = parent;
            this.sprite = sprite;
            this.frameTimeMax = typeof frameTimeMax != 'undefined' ? frameTimeMax : 0.1;
            this.frameTime = this.frameTimeMax;
            this.looping = looping;
            if (typeof onlyOneframe !== 'undefined' && onlyOneframe !== false && !isNaN(onlyOneframe)) {
                this.frame.start = onlyOneframe;
                this.frame.end = onlyOneframe;
            }
            else if (typeof range !== 'undefined' && (range instanceof Array)) {
                this.frame.start = range[0];
                this.frame.end = range[1];
            }
            else {
                this.frame.start = 0;
                this.frame.end = this.sprite.cols - 1;
            }
            this.frame.current = this.frame.start;
            this.frameSize = {
                width: this.sprite.img.width / this.sprite.cols,
                height: this.sprite.img.height
            };
        }
        Object.defineProperty(Animation.prototype, "isEnded", {
            get: function () {
                return this.ended;
            },
            enumerable: true,
            configurable: true
        });
        return Animation;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Animation;
});

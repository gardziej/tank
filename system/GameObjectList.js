define(["require", "exports"], function (require, exports) {
    "use strict";
    var GameObjectList = (function () {
        function GameObjectList(parent) {
            this.gameObjects = [];
            this.add = function (gameobject) {
                this.gameObjects.push(gameobject);
                gameobject.parent = this;
            };
            this.remove = function (gameobject) {
                for (var i = 0, len = this.gameObjects.length; i < len; i++) {
                    if (gameobject === this.gameObjects[i]) {
                        this.gameObjects.splice(i, 1);
                        gameobject.parent = null;
                        return;
                    }
                }
                ;
            };
            this.at = function (index) {
                if (index < 0 || index >= this.gameObjects.length)
                    return null;
                return this.gameObjects[index];
            };
            this.clear = function () {
                for (var i = 0, len = this.gameObjects.length; i < len; i++)
                    this.gameObjects[i].parent = null;
                this.gameObjects = [];
            };
            this.find = function (id) {
                for (var i = 0, len = this.gameObjects.length; i < len; i++) {
                    if (this.gameObjects[i].id === id)
                        return this.gameObjects[i];
                }
                return null;
            };
            this.update = function (delta) {
                for (var i = 0, len = this.gameObjects.length; i < len; i++)
                    if (typeof this.gameObjects[i] !== "undefined")
                        this.gameObjects[i].update(delta);
            };
            this.draw = function () {
                for (var i = 0, len = this.gameObjects.length; i < len; i++)
                    if (typeof this.gameObjects[i] !== "undefined")
                        this.gameObjects[i].draw();
            };
            this.reset = function () {
                for (var i = 0, len = this.gameObjects.length; i < len; i++)
                    this.gameObjects[i].reset();
            };
            this.parent = parent;
        }
        Object.defineProperty(GameObjectList.prototype, "length", {
            get: function () {
                return this.gameObjects.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObjectList.prototype, "count", {
            get: function () {
                return this.gameObjects.length;
            },
            enumerable: true,
            configurable: true
        });
        return GameObjectList;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = GameObjectList;
});

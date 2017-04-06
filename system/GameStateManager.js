define(["require", "exports"], function (require, exports) {
    "use strict";
    var GameStateManager = (function () {
        function GameStateManager() {
            this.gameStates = {};
            this.currentGameState = null;
            this.lastGameStateId = 0;
            this.currentGameStateId = 0;
            this.lastMasterStateId = 0;
            this.add = function (id, gamestate, master) {
                this.gameStates[id] = { state: gamestate };
                if (typeof master !== "undefined" && master === true) {
                    this.gameStates[id].type = 'master';
                }
                this.currentGameState = gamestate;
                this.currentGameStateId = id;
            };
            this.switchTo = function (id) {
                if (typeof this.gameStates[id] !== "undefined") {
                    this.currentGameState = this.gameStates[id].state;
                    if (this.currentGameStateId !== id) {
                        this.lastGameStateId = this.currentGameStateId;
                    }
                    this.currentGameStateId = id;
                    if (this.gameStates[id].type === "master") {
                        this.lastMasterStateId = id;
                    }
                    return this;
                }
            };
            this.escape = function () {
                if (this.lastMasterStateId !== null)
                    this.switchTo(this.lastMasterStateId);
            };
            this.getCurrentGameStateId = function () {
                if (this.currentGameStateId !== null)
                    return this.currentGameStateId;
                return false;
            };
            this.getLastMasterStateId = function () {
                if (this.lastMasterStateId !== null)
                    return this.lastMasterStateId;
                return false;
            };
            this.handleInput = function (delta) {
                if (this.currentGameState !== null)
                    this.currentGameState.handleInput(delta);
            };
            this.update = function (delta) {
                if (this.currentGameState !== null)
                    this.currentGameState.update(delta);
            };
            this.draw = function () {
                if (this.currentGameState !== null)
                    this.currentGameState.draw();
            };
            this.reset = function () {
                if (this.currentGameState !== null)
                    this.currentGameState.reset();
            };
        }
        return GameStateManager;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = GameStateManager;
});

export default class GameStateManager {

	gameStates = {};
    currentGameState = null;
	lastGameStateId = 0;
	currentGameStateId = 0;
	lastMasterStateId = 0;


    add = function (id, gamestate, master) {
        this.gameStates[id] = {state : gamestate};
		if (typeof master !== "undefined" && master === true)
			{
				this.gameStates[id].type = 'master';
			}
        this.currentGameState = gamestate;
		this.currentGameStateId = id;
    };

    switchTo = function (id) {
        if (typeof this.gameStates[id] !== "undefined")
			{
        	this.currentGameState = this.gameStates[id].state;
			if (this.currentGameStateId !== id)
			{
				this.lastGameStateId = this.currentGameStateId;
			}
			this.currentGameStateId = id;
			if (this.gameStates[id].type === "master")
				{
					this.lastMasterStateId = id;
				}
			return this;
			}
    };

    escape = function () {
        if (this.lastMasterStateId !== null)
            this.switchTo(this.lastMasterStateId);
    };

    getCurrentGameStateId = function () {
        if (this.currentGameStateId !== null)
            return this.currentGameStateId;
		return false;
    };

	getLastMasterStateId = function () {
		if (this.lastMasterStateId !== null)
			return this.lastMasterStateId;
		return false;
	};

    handleInput = function (delta) {
        if (this.currentGameState !== null)
            this.currentGameState.handleInput(delta);
    };

    update = function (delta) {
        if (this.currentGameState !== null)
            this.currentGameState.update(delta);
    };

    draw = function () {
        if (this.currentGameState !== null)
            this.currentGameState.draw();
    };

    reset = function () {
        if (this.currentGameState !== null)
            this.currentGameState.reset();
    };
}

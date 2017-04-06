import $ = require('jquery');
import system from '../system/system';

import DrawPageState from './states/DrawPageState';

export default class App
{

    spritesStillLoading : number = 0;
    totalSprites : number = 0;
	canvas;
    mouse;
    sprites;
    keyboard;

    constructor(){
        this.canvas = new system.Canvas('canvas', 'gameArea', false);
        this.mouse = new system.Mouse(this.canvas);
        this.sprites = system.sprites;
        this.keyboard = new system.Keyboard();
        this.loadSprites();
        this.loadSounds();
        this.assetLoadingLoop();

    }

    loadSprites() {
        this.sprites['tank']	= this.prepareSprite('./assets/sprites/tanks/tank1.png');
        this.sprites['turret']	= this.prepareSprite('./assets/sprites/tanks/turret1.png');
    }

    loadSounds = function () {
    }

    prepareSprite = function (imageName) {
        let pathSplit = imageName.split('/');
        let fileName = pathSplit[pathSplit.length - 1];
        let fileSplit = fileName.split("/")[0].split(".")[0].split("@");
        let colRow = fileSplit[fileSplit.length - 1].split("x");
        let sheetRows = 1;
        let sheetColumns = parseInt(colRow[0]);
        if (isNaN(sheetColumns)) sheetColumns = 1;
        if (colRow.length === 2) sheetRows = parseInt(colRow[1]);

        return {
            img : this.loadSprite(imageName),
            cols : sheetColumns,
            rows : sheetRows
        };
    };

    loadSprite = function (imageName) {
        let image = new Image();
        image.src = imageName;
        this.spritesStillLoading += 1;
        this.totalSprites += 1;
        image.onload = function () {
            this.spritesStillLoading -= 1;
        }.bind(this);
        return image;
    };

    assetLoadingLoop = function () {
        this.canvas.clear();
        this.canvas.drawText('loading' + ' ' + Math.round((this.totalSprites - this.spritesStillLoading) /
        this.totalSprites * 100) + "%", new system.Vector2(250,250));
        if (this.spritesStillLoading > 0)
            requestAnimationFrame(this.assetLoadingLoop.bind(this));
        else {
            this.canvas.clear();
            this.initialize();
        }
    };

    initialize = function () {
        this.appStateManager = new system.GameStateManager();
        this.appStateManager.add('app_draw_page', new DrawPageState(this), true);
        this.appStateManager.switchTo('app_draw_page').reset();

        window.onresize = this.reset.bind(this);

        requestAnimationFrame(this.mainLoop.bind(this));
        };


    reset = function () {
        this.canvas.resize();
        this.appStateManager.reset();
    };

    handleInput = function (type) {
    };

    mainLoop = function () {

        var delta = 1 / 60;
        this.canvas.clear();
        this.appStateManager.handleInput(delta);
        this.appStateManager.update(delta);
        this.appStateManager.draw();
        this.keyboard.reset();
        this.mouse.reset();

        var	that = this;
        requestAnimationFrame(that.mainLoop.bind(that));

    };


}

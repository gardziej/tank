define(["require", "exports", "../system/system", "./states/DrawPageState"], function (require, exports, system_1, DrawPageState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App() {
            this.spritesStillLoading = 0;
            this.totalSprites = 0;
            this.loadSounds = function () {
            };
            this.prepareSprite = function (imageName) {
                var pathSplit = imageName.split('/');
                var fileName = pathSplit[pathSplit.length - 1];
                var fileSplit = fileName.split("/")[0].split(".")[0].split("@");
                var colRow = fileSplit[fileSplit.length - 1].split("x");
                var sheetRows = 1;
                var sheetColumns = parseInt(colRow[0]);
                if (isNaN(sheetColumns))
                    sheetColumns = 1;
                if (colRow.length === 2)
                    sheetRows = parseInt(colRow[1]);
                return {
                    img: this.loadSprite(imageName),
                    cols: sheetColumns,
                    rows: sheetRows
                };
            };
            this.loadSprite = function (imageName) {
                var image = new Image();
                image.src = imageName;
                this.spritesStillLoading += 1;
                this.totalSprites += 1;
                image.onload = function () {
                    this.spritesStillLoading -= 1;
                }.bind(this);
                return image;
            };
            this.assetLoadingLoop = function () {
                this.canvas.clear();
                this.canvas.drawText('loading' + ' ' + Math.round((this.totalSprites - this.spritesStillLoading) /
                    this.totalSprites * 100) + "%", new system_1.default.Vector2(250, 250));
                if (this.spritesStillLoading > 0)
                    requestAnimationFrame(this.assetLoadingLoop.bind(this));
                else {
                    this.canvas.clear();
                    this.initialize();
                }
            };
            this.initialize = function () {
                this.appStateManager = new system_1.default.GameStateManager();
                this.appStateManager.add('app_draw_page', new DrawPageState_1.default(this), true);
                this.appStateManager.switchTo('app_draw_page').reset();
                window.onresize = this.reset.bind(this);
                requestAnimationFrame(this.mainLoop.bind(this));
            };
            this.reset = function () {
                this.canvas.resize();
                this.appStateManager.reset();
            };
            this.handleInput = function (type) {
            };
            this.mainLoop = function () {
                var delta = 1 / 60;
                this.canvas.clear();
                this.appStateManager.handleInput(delta);
                this.appStateManager.update(delta);
                this.appStateManager.draw();
                this.keyboard.reset();
                this.mouse.reset();
                var that = this;
                requestAnimationFrame(that.mainLoop.bind(that));
            };
            this.canvas = new system_1.default.Canvas('canvas', 'gameArea', false);
            this.mouse = new system_1.default.Mouse(this.canvas);
            this.sprites = system_1.default.sprites;
            this.keyboard = new system_1.default.Keyboard();
            this.loadSprites();
            this.loadSounds();
            this.assetLoadingLoop();
        }
        App.prototype.loadSprites = function () {
            this.sprites['tank'] = this.prepareSprite('./assets/sprites/tanks/tank1.png');
            this.sprites['turret'] = this.prepareSprite('./assets/sprites/tanks/turret1.png');
        };
        return App;
    }());
    exports.default = App;
});

define(["require", "exports"], function (require, exports) {
    "use strict";
    var Map = (function () {
        function Map() {
            this.grid = [];
            this.numrows = 10;
            this.numcols = 10;
            this.initial = 0;
            this.print = function () {
                for (var i = 0; i < this.numrows; ++i) {
                    console.log(i, this.grid[i].join());
                }
            };
            for (var i = 0; i < this.numrows; ++i) {
                var columns = [];
                for (var j = 0; j < this.numcols; ++j) {
                    columns[j] = this.initial;
                }
                this.grid[i] = columns;
            }
        }
        return Map;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Map;
});

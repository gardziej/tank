import system from '../system/system';

export default class Map
{
    grid = [];
    numrows : number = 10;
    numcols : number = 10;
    initial : number = 0;


    constructor()
    {
        for (var i = 0; i < this.numrows; ++i)
            {
                var columns = [];
                for (var j = 0; j < this.numcols; ++j)
                    {
                        columns[j] = this.initial;
                    }
                this.grid[i] = columns;
            }
    }

    print = function () {
        for (var i = 0; i < this.numrows; ++i)
            {
                console.log(i, this.grid[i].join());
            }
	}


}

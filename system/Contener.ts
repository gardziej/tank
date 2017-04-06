export default class Contener
{
	tiles = [];

	get length()
	{
		return this.tiles.length;
	}

	get count()
	{
		return this.tiles.length;
	}

	val = function (k) {
		return this.tiles[k];
	};

	add = function (i) {
		if (!this.exists(i)) this.tiles.push(i);
	};

	exists = function (i) {
		if (this.tiles.indexOf(i) !== -1)
			{
				return true;
			}
		return false;
	};

	remove = function (i) {
		var index = this.tiles.indexOf(i);
		if (index > -1)
			{
			    this.tiles.splice(index, 1);
			}

	};
}

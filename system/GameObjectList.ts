export default class GameObjectList
{
	public parent;
	public gameObjects = [];

	constructor (parent)
	{
		this.parent = parent;
	}

	get length()
	{
		return this.gameObjects.length;
	}

	get count()
	{
		return this.gameObjects.length;
	}

	add = function (gameobject) {
	  this.gameObjects.push(gameobject);
	  gameobject.parent = this;
	};

	remove = function (gameobject) {
	  	for (var i = 0, len = this.gameObjects.length; i<len; i++)
		{
			if (gameobject === this.gameObjects[i])
	    		{
	    		this.gameObjects.splice(i, 1);
	    		gameobject.parent = null;
				return;
				}
		};
	};


	at = function (index) {
	  if (index < 0 || index >= this.gameObjects.length)
	      return null;
	  return this.gameObjects[index];
	};

	clear = function () {
	  for (var i = 0, len = this.gameObjects.length; i<len; i++)
	      this.gameObjects[i].parent = null;
	  this.gameObjects = [];
	};

	find = function (id) {
	  for (var i = 0, len = this.gameObjects.length; i<len; i++)
	  {
		  if (this.gameObjects[i].id === id)
	          return this.gameObjects[i];
	  }
	  return null;
	};

	update = function (delta) {
	  for (var i = 0, len = this.gameObjects.length; i<len; i++)
	      if (typeof this.gameObjects[i] !== "undefined") this.gameObjects[i].update(delta);
	};

	draw = function () {
	  for (var i = 0, len = this.gameObjects.length; i<len; i++)
	      if (typeof this.gameObjects[i] !== "undefined") this.gameObjects[i].draw();
	};

	reset = function () {
	  	for (var i = 0, len = this.gameObjects.length; i<len; i++)
	    	this.gameObjects[i].reset();
	};



}

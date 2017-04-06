import Vector2 from './Vector2';
import Color from './Color';
import Rectangle from './Rectangle';

export default class Canvas
{
	id;
	div;
	fullScreen;
	canvasOffset = Vector2.zero;
	canvas;
	ctx;

	constructor (id, div, fullScreen = false)
	{
		this.id = id;
		this.div = document.getElementById(div);
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext("2d");
		this.fullScreen = fullScreen;
        this.resize();
	}

	get offset()
	{
		return this.canvasOffset;
	}

	get cursor()
	{
		return this.canvas.style.cursor;
	}

    setCursor = function (type)
	{
		if (this.canvas.style.cursor !== type)
			{
				this.canvas.style.cursor = type;
			}
	}

    resize = function ()
	{
		if (this.fullScreen)
			{
		        this.canvas.width = window.innerWidth;
		        this.canvas.height = window.innerHeight;
			}
			else
			{
				this.canvas.width = this.div.getAttribute('width');
				this.canvas.height = this.div.getAttribute('height');

				this.canvasOffset.x = this.div.offsetLeft;
				this.canvasOffset.y = this.div.offsetTop;
			}



		this.width = this.canvas.width;
		this.height = this.canvas.height;

		this.canvas.style.cursor = "default";
    };

    setSize = function (x, y)
	{
		this.width = this.canvas.width = x;
		this.height = this.canvas.height = y;
    };

    clear = function ()
	{
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    drawCircle = function (position, radius, color, lineColor, lineWidth) {
        this.ctx.save();

		this.ctx.fillStyle = color || "none";
		this.ctx.strokeStyle = lineColor || "none";
		this.ctx.beginPath();
		this.ctx.arc(position.x, position.y, radius, 0, Math.PI*2);

		this.ctx.fill();
		if (typeof lineColor !== "undefined")
			{
				this.ctx.stroke();
			}
        this.ctx.restore();
    };

    drawRectangle = function (x, y, width, height, color, lineColor, lineWidth) {
        this.ctx.save();
		this.ctx.fillStyle = color || "yellow";
        this.ctx.fillRect(x, y, width, height);

		if (lineColor)
			{
				this.ctx.strokeStyle = lineColor || "yellow";
				this.ctx.lineWidth = lineWidth || 1;
				this.ctx.strokeRect(x, y, width, height);
			}
        this.ctx.restore();
    };

	drawImage = function (sprite, position, rotation, origin, sourceRect, shadow) {
		position = typeof position !== 'undefined' ? position : Vector2.zero;
		rotation = typeof rotation !== 'undefined' ? rotation : 0;
		origin = typeof origin !== 'undefined' ? origin : Vector2.zero;
		sourceRect = typeof sourceRect !== 'undefined' ? sourceRect : new Rectangle(0, 0, sprite.img.width, sprite.img.height);

		this.ctx.save();

		this.ctx.translate(position.x, position.y);
		this.ctx.rotate(rotation);

		if (shadow)
			{
				this.ctx.shadowColor = shadow.color;
				this.ctx.shadowBlur = shadow.blur;
				this.ctx.shadowOffsetX = shadow.offsetX;
				this.ctx.shadowOffsetY = shadow.offsetY;
			}

		this.ctx.drawImage(sprite.img, sourceRect.x, sourceRect.y,
			sprite.img.width, sprite.img.height,
			-origin.x, -origin.y,
			sourceRect.width, sourceRect.height);

		this.ctx.restore();
	};

	drawText = function (text, position, origin?, color?, textAlign?, fontname?, fontsize?) {
		position = typeof position !== 'undefined' ? position : Vector2.zero;
		origin = typeof origin !== 'undefined' ? origin : Vector2.zero;
		color = typeof color !== 'undefined' ? color : Color.black;
		textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
		fontname = typeof fontname !== 'undefined' ? fontname : "Courier New";
		fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";

		this.ctx.save();
		this.ctx.translate(position.x - origin.x, position.y - origin.y);
		this.ctx.textBaseline = 'top';
		this.ctx.font = fontsize + " " + fontname;
		this.ctx.fillStyle = color.toString();
		this.ctx.textAlign = textAlign;
		this.ctx.fillText(text, 0, 0);
		this.ctx.restore();
	};

	measureText = function (text, fontname, fontsize) {
		fontname = typeof fontname !== 'undefined' ? fontname : "Courier New";
		fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";

		this.ctx.save();
		this.ctx.font = fontsize + " " + fontname;
		var len = this.ctx.measureText(text);
		this.ctx.restore();
		return len;
	};

	getImageData = function (a,b,c,d) {
		return this.ctx.getImageData(a,b,c,d);
	};

}

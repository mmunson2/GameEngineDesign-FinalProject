/********************************************************************************      
 * ShapeGen.js
 * 
 * A class with helpful functions for creating shapes on a tilemap.
 * 
 ********************************************************************************/


/********************************************************************************      
 * ShapeGen Constructor
 * 
 * @param {TileMap} tileMap | The tilemap to generate shape onto 
 * 
 ********************************************************************************/
function ShapeGen(tileMap)
{
    this.tileMap = tileMap;
}

/******************************************************************************** 
 * Rectangle
 * 
 * Creates a rectangle of simple Renderables with a given color
 * 
 * @param {Integer} x      | Left bound X
 * @param {Integer} y      | Bottom bound Y
 * @param {Integer} height | Determines top bound
 * @param {Integer} width  | Determines right bound
 * @param {Vec4} color     | The rectangle's color
 * 
 ********************************************************************************/
ShapeGen.prototype.rectangle = function (x, y, height, width, color)
{
    for(var i = 0; i < width; i++)
    {
        for(var j = 0; j < height; j++)
        {
            var renderable = new Renderable();
            renderable.setColor(color);
           
            this.tileMap.addTile(x + i, y + j, renderable);
        }
    }
};

/******************************************************************************** 
 * TexturedRectangle
 * 
 * Creates a rectangle of a given texture
 * 
 * 
 * @param {Integer} x      | Left bound X
 * @param {Integer} y      | Bottom bound Y
 * @param {Integer} height | Determines top bound
 * @param {Integer} width  | Determines right bound
 * @param {Integer} texture| The texture to be applied 
 * @param {Vec4}    color  | The rectangle's color
 * @param {Vec4}    UVArray| The texture's UV coordinates
 * 
 ********************************************************************************/
ShapeGen.prototype.texturedRectangle = function (x, y, height, width, texture, color, UVArray)
{
    for(var i = 0; i < width; i++)
    {
        for(var j = 0; j < height; j++)
        {
            var renderable = new SpriteRenderable(texture);
            renderable.setElementUVCoordinate(UVArray[0], UVArray[1], UVArray[2], UVArray[3]);
            renderable.setColor(color);
           
            this.tileMap.addTile(x + i, y + j, renderable);
        }
    }
};

/******************************************************************************** 
 * Triangle
 * 
 * Draws a simple equilateral triangle
 * 
 * @param {Integer} x      | Left bound X
 * @param {Integer} y      | Bottom bound Y
 * @param {Integer} width  | The triangle's base width
 * @param {Vec4}    color  | The triangle's color
 * 
 ********************************************************************************/
ShapeGen.prototype.triangle = function (x, y, width, color)
{
    for(var i = 0; i < width; i++)
    {
        for(var j = i; j < width - i; j++)
        {
            var renderable = new Renderable();
            renderable.setColor(color);
           
            this.tileMap.addTile(x + j, y + i, renderable);
        }
    }
};


/******************************************************************************** 
 * Circle
 * 
 * Draws a circle of a given radius
 * 
 * @param {Integer} xc    | The X position of the circle's center
 * @param {Integer} yc    | The Y position of the circle's center
 * @param {Integer} r     | The circle's radius
 * @param {Vec4}    color | The circle's color
 * @param {Boolean} fill  | Whether or not the circle should be filled
 * 
 * Utilizes Bresenham’s circle drawing algorithm
 ********************************************************************************/
ShapeGen.prototype.circle = function (xc, yc, r, color, fill)
{
    var x = 0;
    var y = r; 
    var d = 3 - 2 * r; 
    this._drawCircle(xc, yc, x, y, color); 
    while (y >= x) 
    {  
        x++; 
        if (d > 0) 
        { 
            y--;  
            d = d + 4 * (x - y) + 10; 
        } 
        else
            d = d + 4 * x + 6; 
        this._drawCircle(xc, yc, x, y, color);
    }
    if (fill && r > 0) this.circle(xc, yc, r - 1, color, fill);
};


/////////////////////////////////////////////////////////////////////////////////
// Private Methods:
/////////////////////////////////////////////////////////////////////////////////


/******************************************************************************** 
 * drawCircle
 * 
 * Private method for generating portions of the circle
 ********************************************************************************/
ShapeGen.prototype._drawCircle = function (xc, yc, x, y, color)
{
    if (xc + x >= 0 && yc + y >= 0 && xc + x < this.tileMap.getWidth() && yc + y < this.tileMap.getHeight())
    {
        var renderable = new Renderable();
        renderable.setColor(color);
        this.tileMap.addTile(xc + x, yc + y, renderable);
    }
    
    if (xc - x >= 0 && yc + y >= 0 && xc - x < this.tileMap.getWidth() && yc + y < this.tileMap.getHeight())
    {
        renderable = new Renderable();
        renderable.setColor(color);
        this.tileMap.addTile(xc - x, yc + y, renderable);
    }

    if (xc + x >= 0 && yc - y >= 0 && xc + x < this.tileMap.getWidth() && yc - y < this.tileMap.getHeight())
    {
        renderable = new Renderable();
        renderable.setColor(color);
        this.tileMap.addTile(xc + x, yc - y, renderable);
    }

    if (xc - x >= 0 && yc - y >= 0 && xc - x < this.tileMap.getWidth() && yc - y < this.tileMap.getHeight())
    {
        renderable = new Renderable();
        renderable.setColor(color);
        this.tileMap.addTile(xc - x, yc - y, renderable);
    }

    if (xc + y >= 0 && yc + x >= 0 && xc + y < this.tileMap.getWidth() && yc + x < this.tileMap.getHeight())
    {
        renderable = new Renderable();
        renderable.setColor(color);
        this.tileMap.addTile(xc + y, yc + x, renderable);
    }

    if (xc - y >= 0 && yc + x >= 0 && xc - y < this.tileMap.getWidth() && yc + x < this.tileMap.getHeight())
    {
        renderable = new Renderable();
        renderable.setColor(color);
        this.tileMap.addTile(xc - y, yc + x, renderable);
    }

    if (xc + y >= 0 && yc - x >= 0 && xc + y < this.tileMap.getWidth() && yc - x < this.tileMap.getHeight())
    {
        renderable = new Renderable();
        renderable.setColor(color);
        this.tileMap.addTile(xc + y, yc - x, renderable);
    }

    if (xc - y >= 0 && yc - x >= 0 && xc - y < this.tileMap.getWidth() && yc - x < this.tileMap.getHeight())
    {
        renderable = new Renderable();
        renderable.setColor(color);
        this.tileMap.addTile(xc - y, yc - x, renderable);
    }
};

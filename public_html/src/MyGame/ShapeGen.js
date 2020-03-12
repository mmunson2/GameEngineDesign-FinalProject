/* 
 * TerrainGen.js
 * 
 * Adds tiles to the tile map in many ways
 * 
 */

function ShapeGen(tileMap)
{
    this.tileMap = tileMap;
}

ShapeGen.prototype.rectangle = function (x, y, height, width, color)
{
    for(var i = 0; i < height; i++)
    {
        for(var j = 0; j < width; j++)
        {
            var renderable = new Renderable();
            renderable.setColor(color);
           
            this.tileMap.addTile(x + i, y + j, renderable);
        }
    }
};

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



// Bresenham’s circle drawing algorithm
ShapeGen.prototype.circle = function (xc, yc, r, color, fill)
{
    var x = 0;
    var y = r; 
    var d = 3 - 2 * r; 
    this.drawCircle(xc, yc, x, y, color); 
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
        this.drawCircle(xc, yc, x, y, color);
    }
    if (fill && r > 0) this.circle(xc, yc, r - 1, color, fill);
};

ShapeGen.prototype.drawCircle = function (xc, yc, x, y, color)
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

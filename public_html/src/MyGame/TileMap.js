/* 
 * TileMap.js
 * 
 * Stores a uniform grid of renderables
 * 
 */

function TileMap(xPos, yPos, tileWidth, width, height)
{
    this.xPos = xPos - tileWidth / 2;
    this.yPos = yPos - tileWidth / 2;
    
    this.tileWidth = tileWidth;
    
    this.width = width;
    this.height = height;
    
    this.tiles = [];
    
    this.initialize();
}

TileMap.prototype.getWCHeight = function () {return this.height * this.tileWidth;};
TileMap.prototype.getWCWidth = function () {return this.width * this.tileWidth;};
TileMap.prototype.getWidth = function () {return this.width;};
TileMap.prototype.getHeight = function () {return this.height;};
TileMap.prototype.getXPos = function () {return this.xPos;};
TileMap.prototype.getYPos = function () {return this.yPos;};


TileMap.prototype.initialize = function () 
{
    for(var i = 0; i < this.width; i++)
    {
        var column = [];
        
        for(var j = 0; j < this.height; j++)
        {
            column[j] = 0;
        }
        
        this.tiles[i] = column;
    }
};

TileMap.prototype.addTile = function(tileX, tileY, renderable)
{
    renderable.getXform().setXPos(tileX * this.tileWidth + this.xPos + this.tileWidth / 2);
    renderable.getXform().setYPos(tileY * this.tileWidth + this.yPos + this.tileWidth / 2);
    
    renderable.getXform().setSize(this.tileWidth, this.tileWidth);
    
    this.tiles[tileX][tileY] = renderable;
};

TileMap.prototype.draw = function (camera)
{
    for(var i = 0; i < this.width; i++)
    {        
        for(var j = 0; j < this.height; j++)
        {
            if(this.tiles[i][j] !== 0)
            {
               this.tiles[i][j].draw(camera);
            }
        }
    }
};

TileMap.prototype.isTileAt = function (xPos, yPos)
{
    return (this.tiles[xPos][yPos] !== 0);
};





TileMap.prototype.update = function ()
{
    
};
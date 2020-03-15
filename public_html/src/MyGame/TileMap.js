/******************************************************************************** 
 * TileMap.js
 * 
 * A grid of tiles on which terrain can be placed. This wasn't the main
 * focus of our assignment so some functionality may be missing here.
 * Performance is good though!
 * 
 ********************************************************************************/

/******************************************************************************** 
 * TileMap Constructor
 * 
 * @param {Integer} xPos      | The WC position of the left boundary
 * @param {Integer} yPos      | The WC position of the bottom boundary
 * @param {Double } tileWidth | The WC width of a single tile
 * @param {Integer} width     | The number of columns in the tileMap
 * @param {Integer} height    | The number of rows in the tileMap
 * 
 ********************************************************************************/
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

/******************************************************************************** 
 * Getters
 ********************************************************************************/
TileMap.prototype.getWCHeight = function () {return this.height * this.tileWidth;};
TileMap.prototype.getWCWidth = function () {return this.width * this.tileWidth;};
TileMap.prototype.getWidth = function () {return this.width;};
TileMap.prototype.getHeight = function () {return this.height;};
TileMap.prototype.getXPos = function () {return this.xPos;};
TileMap.prototype.getYPos = function () {return this.yPos;};

/******************************************************************************** 
 * Initialize
 * 
 * Called in the constructor, no need to call this for setup! Use this to
 * clear all tiles if necessary.
 *  
 ********************************************************************************/
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

/******************************************************************************** 
 * addTile
 * 
 * Add a single tile to the tileMap
 * 
 * @param {Integer}    tileX      | The column of the added tile
 * @param {Integer}    tileY      | The row of the added tile
 * @param {Renderable} renderable | The renderable to draw to the tile
 * 
 ********************************************************************************/
TileMap.prototype.addTile = function(tileX, tileY, renderable)
{
    if(tileX >= 0 && tileX < this.width && tileY >= 0 && tileY < this.height)
    {
        renderable.getXform().setXPos(tileX * this.tileWidth + this.xPos + this.tileWidth / 2);
        renderable.getXform().setYPos(tileY * this.tileWidth + this.yPos + this.tileWidth / 2);
    
        renderable.getXform().setSize(this.tileWidth, this.tileWidth);
    
        this.tiles[tileX][tileY] = renderable;
        
        return true;
    }
    
    return false;
  
};

/******************************************************************************** 
 * removeTile
 * 
 * Removes a tile from the tileMap
 * 
 * @param {Integer}    tileX      | The column of the removed tile
 * @param {Integer}    tileY      | The row of the removed tile
 * 
 ********************************************************************************/
TileMap.prototype.removeTile = function(tileX, tileY)
{
    if(tileX >= 0 && tileX < this.width && tileY >= 0 && tileY < this.height)
    {
        this.tiles[tileX][tileY] = 0;
        return true;
    }
    
    return false;
};

/******************************************************************************** 
 * Draw
 * 
 * Draws the tilemap to the given viewport. Only the visible tiles are
 * drawn to screen.
 * 
 * @param {Camera} camera | The camera to draw to
 * 
 ********************************************************************************/
TileMap.prototype.draw = function (camera)
{
    var xMin = camera.getWCCenter()[0] - (camera.getWCWidth() / 2);
    var xMax = camera.getWCCenter()[0] + (camera.getWCWidth() / 2);
    var yMax = camera.getWCCenter()[1] + (camera.getWCHeight() / 2);
    var yMin = camera.getWCCenter()[1] - (camera.getWCHeight() / 2);
    
    var tileMinX = Math.floor((xMin - this.xPos) / this.tileWidth) - 1;
    var tileMaxX = Math.ceil((xMax - this.xPos) / this.tileWidth) + 1;

    var tileMinY = Math.ceil((yMin - this.yPos) / this.tileWidth) - 1;
    var tileMaxY = Math.ceil((yMax - this.yPos) / this.tileWidth) + 1;
   
    for(var i = tileMinX; i < tileMaxX; i++)
    {        
        if(i >= this.width || i < 0)
        {
            continue;
        }
        
        for(var j = tileMinY; j < tileMaxY; j++)
        {
            if(j >= this.height || j < 0) 
            {
                continue;
            }
            
            if(this.tiles[i][j] !== 0)
            {
               this.tiles[i][j].draw(camera);
            }
        }
    }     
};

/******************************************************************************** 
 * isTileAt
 * 
 * Checks whether there's a tile a given x and y.
 * 
 * @param {Integer} xPos | The column to check for a tile
 * @param {Integer} yPos | The row to check for a tile
 * 
 * @returns {Boolean} Whether or not a tile exists  
 * 
 ********************************************************************************/
TileMap.prototype.isTileAt = function (xPos, yPos)
{
    if(xPos >= 0 && xPos < this.width && yPos >= 0 && yPos < this.height)
    {
        return (this.tiles[xPos][yPos] !== 0);
    }
    
    return false;
};



TileMap.prototype.getBounds = function (xPos, yPos)
{
    if(xPos >= 0 && xPos < this.width && yPos >= 0 && yPos < this.height)
    {
        var leftBound = this.xPos + this.tileWidth * xPos - this.tileWidth;
        var rightBound = this.xPos + this.tileWidth * xPos;
        
        var topBound = this.yPos + this.tileWidth * yPos;
        var bottomBound = this.yPos + this.tileWidth * yPos - this.tileWidth;

        return [topBound, bottomBound, leftBound, rightBound];
    }
    
    return null;
};

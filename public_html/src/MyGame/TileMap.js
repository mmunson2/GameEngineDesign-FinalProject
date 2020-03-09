/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function TileMap(xPos, yPos, tileWidth, width, height)
{
    this.xPos = xPos;
    this.yPos = yPos;
    this.tileWidth = tileWidth;
    
    this.width = width;
    this.height = height;
    
    this.tiles = [];
    
    
    this.initialize();
    
}


TileMap.prototype.initialize = function () 
{
    for(var i = 0; i < this.width; i++)
    {
        var col = [];
        
        for(var j = 0; j < this.height; j++)
        {
            col[j] = 0;
        }
        
        this.tiles[i] = col;
    }
 
};

TileMap.prototype.addTile = function(tileX, tileY, textureRenderable)
{
    textureRenderable.getXform().setXPos(tileX * this.tileWidth + this.xPos);
    textureRenderable.getXform().setYPos(tileY * this.tileWidth + this.yPos);
    
    textureRenderable.getXform().setSize(this.tileWidth, this.tileWidth);
    
    this.tiles[tileX][tileY] = textureRenderable;  
    
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

TileMap.prototype.update = function ()
{
    
    
};
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function TerrainGenerator( tileMap, startX, endX )
{
    this.tileMap = tileMap;
    this.startX = startX;
    this.endX = endX;
    
    this.shapeGen = new ShapeGen(this.tileMap);
}


TerrainGenerator.prototype.generateHills = function ()
{
    this.shapeGen.rectangle(0,0, this.tileMap.getWidth(), 10,  [0.2, 1, 0.2, 1]);
    
    for(var i = this.startX + 5; i < this.endX - 5; i++)
    {
        this.shapeGen.circle(i, Math.round(Math.random() * 8 - 4) + 10, Math.round(Math.random()) * 5, [0.2, 1, 0.2, 1], true);
    }
};

TerrainGenerator.prototype.setTexture = function ( startY, endY, texture, UVArray )
{
    for(var i = this.startX; i < this.endX; i++)
    {
        for(var j = startY; j < endY; j++)
        {
            if(this.tileMap.isTileAt(i, j))
            {
                var renderable = new SpriteRenderable(texture);
                renderable.setElementUVCoordinate(UVArray[0], UVArray[1], UVArray[2], UVArray[3]);
           
                this.tileMap.addTile(i, j, renderable);
                
            } 
        }
    }
    
    
};
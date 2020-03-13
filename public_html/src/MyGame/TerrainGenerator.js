/******************************************************************************** 
 * TerrainGenerator.js
 * 
 * The primary class within our API. Provides numerous functions for the
 * creation of realistic terrain. Utilizes ShapeGen for lower level functions.
 * 
 ********************************************************************************/


/******************************************************************************** 
 * TerrainGenerator Constructor
 * 
 * @param {TileMap} tileMap | The tilemap to generate onto
 * @param {Integer} startX  | The X Position on the tilemap where generation begins
 * @param {Integer} endX    | The X Position on the tilemap where generation ends
 * 
 ********************************************************************************/
function TerrainGenerator( tileMap, startX, endX )
{
    this.tileMap = tileMap;
    this.startX = startX;
    this.endX = endX;
    
    this.shapeGen = new ShapeGen(this.tileMap);
}

/******************************************************************************** 
 * generateBumps
 * 
 * 
 * 
 ********************************************************************************/
TerrainGenerator.prototype.generateBumps = function (yLevel)
{
    this.shapeGen.rectangle(0,0, this.tileMap.getWidth(), yLevel + 2,  [0.2, 1, 0.2, 1]);
    
    for(var i = this.startX; i < this.endX; i++)
    {
        this.shapeGen.circle(i, Math.round(Math.random() * 8 - 4) + yLevel, Math.round(Math.random() * 3) + 2, [0.2, 1, 0.2, 1], true);
    }
};

/******************************************************************************** 
 * setTexture
 * 
 ********************************************************************************/
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

/******************************************************************************** 
 * addTopTiles
 * 
 ********************************************************************************/
TerrainGenerator.prototype.addTopTiles = function (texture, UVArray)
{
    for (var x = 0; x < this.tileMap.getWidth(); x++)
    {
        for (var y = this.tileMap.getHeight() - 2; y >= 0; y--)
        {
            if (this.tileMap.isTileAt(x, y))
            {
                var renderable = new SpriteRenderable(texture);
                renderable.setElementUVCoordinate(UVArray[0], UVArray[1], UVArray[2], UVArray[3]);
                this.tileMap.addTile(x, y + 1, renderable);
                break;
            }
        }
    }
};
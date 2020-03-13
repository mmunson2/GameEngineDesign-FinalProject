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
    this._generateBumps(this.startX, this.endX, yLevel);
};

TerrainGenerator.prototype.generateFlat = function (height)
{
    this.shapeGen.rectangle(0,0, height, this.tileMap.getWidth(), [0.2, 1, 0.2, 1]);
};


TerrainGenerator.prototype._generateBumps = function (startX, endX, yLevel)
{    
    for(var i = startX; i < endX; i++)
    {
        //this.shapeGen.circle(i, Math.round(Math.random() * 8 - 4) + yLevel, Math.round(Math.random() * 3) + 2, [0.2, 1, 0.2, 1], true);
        this.shapeGen.circle(i, Math.round(Math.random() * 8 - 4) + yLevel, 5, [0.2, 1, 0.2, 1], true);
    }
};

TerrainGenerator.prototype.generateHills = function (yLevel, frequency, scale, steepness)
{
    //this.generateBumps(yLevel);
   
    var hillWidth = 0;
   
    
    for(var i = this.startX; i < this.endX; i++)
    {
        //If we're not currently making a hill, do a randomized check to see if we should start one
        
        //If we're making a hill, check the hillIndex and see where we're at in the hill
            //At width / 2, the height should be approaching yMax
            //Everywhere else should be a percentage of that
            
        if(Math.random() < frequency)
        {
            hillWidth = Math.random() * (scale + 2) - 4;
            
            for(var j = yLevel; j < scale; j++)
            {
                this._generateBumps(i + Math.floor(j / steepness), (i + hillWidth) - Math.floor(j / steepness), j);
            }
        }
    }
    
    
    
    
}






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


TerrainGenerator.prototype.addTree = function (x, y, height, wood, leaves)
{
    if (y + height > this.tileMap.getHeight()) return;
    
    for (var i = y; i < y + height - 2; i++)
    {
        var renderable = new SpriteRenderable(wood);
        renderable.setElementUVCoordinate(0, 1, 0, 1);
        this.tileMap.addTile(x, i, renderable);
    }
    
    this.shapeGen.rectangleTexture(x - 1, y + height - 2, 3, 3, leaves, [0.42, 0.67, 0.26, 0.8], [0,1,0,1]);
};

TerrainGenerator.prototype.generateTrees = function (minHeight, maxHeight, frequency, wood, leaves)
{
    for (var x = this.startX + 1; x < this.endX - 1; x++)
    {
        for (var y = this.tileMap.getHeight() - 2; y >= 0; y--)
        {
            if (this.tileMap.isTileAt(x, y))
            {
                if (Math.random() < frequency)
                {
                    this.addTree(x, y, Math.round(Math.random() * (maxHeight - minHeight)) + minHeight, wood, leaves);
                    x ++;
                }
                break;
            }
        }
    }
};
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
 * @param {Integer} yLevel | The tile Y position where the bumps will center
 * 
 ********************************************************************************/
TerrainGenerator.prototype.generateBumps = function ( yLevel )
{
    this._generateBumps(this.startX, this.endX, yLevel);
};

/******************************************************************************** 
 * generateFlat
 * 
 * @param {Integer} startY | The lower bound of the generated rectangle
 * @param {Integer} endY   | The upper bound of the generated rectangle
 * 
 ********************************************************************************/
TerrainGenerator.prototype.generateFlat = function ( startY, endY )
{
    this.shapeGen.rectangle(this.startX, startY, endY, this.endX, [0.2, 1, 0.2, 1]);
};

/******************************************************************************** 
 * generateHills
 * 
 * @param {Integer} yLevel    | The tile Y position where the hills will center
 * @param {Double}  frequency | How frequently hills appear
 * @param {Integer} scale     | The magnitude factor, affects width and height
 * @param {Integer} steepness | How quickly the hills reaches its maximum height
 * 
 ********************************************************************************/
TerrainGenerator.prototype.generateHills = function (yLevel, frequency, scale, steepness)
{   
    var hillWidth = 0;
      
    for(var i = this.startX; i < this.endX; i++)
    {            
        if(Math.random() < frequency)
        {
            hillWidth = Math.random() * (scale + 2) - 4;
            
            for(var j = yLevel; j < scale; j++)
            {
                //Utilize private generateBumps call which allows Xpos setting
                this._generateBumps(i + Math.floor(j / steepness), //StartX
                                   (i + hillWidth) - Math.floor(j / steepness), //EndX
                                   j); //Height
            }
        }
    }
};

/******************************************************************************** 
 * setTexture
 * 
 * Applies a texture to a horizontal band of tiles in the TileMap
 * 
 * @param {Integer} startY  | The lower bound of the texture band
 * @param {Integer} endY    | The upper bound of the texture band
 * @param {Texture} texture | The texture to be applied
 * @param {Vec4}    UVArray | The UV coordinates of the texture
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
 * Adds a single layer of tiles on top of the currently generated terrain
 * 
 * @param {Texture} texture | The texture to be applied
 * @param {Vec4}    UVArray | The UV coordinates of the texture
 * @param {Boolean} flip    | Enable to make the tiles "fall upwards"
 * 
 ********************************************************************************/
TerrainGenerator.prototype.addTopTiles = function (texture, UVArray, flip)
{
    if(flip === true)
    {
        for (var x = 0; x < this.tileMap.getWidth(); x++)
        {
            for (var y = this.tileMap.getHeight() - 1; y >= 0 ; y--)
            {
                if (!this.tileMap.isTileAt(x, y))
                {
                    var renderable = new SpriteRenderable(texture);
                    renderable.setElementUVCoordinate(UVArray[0], UVArray[1], UVArray[2], UVArray[3]);
                    this.tileMap.addTile(x, y, renderable);
                    break;
                }
            }
        }
    }
    else
    {
        for (var x = 0; x < this.tileMap.getWidth(); x++)
        {
            for (var y = 0; y < this.tileMap.getHeight(); y++)
            {
                if (!this.tileMap.isTileAt(x, y))
                {
                    var renderable = new SpriteRenderable(texture);
                    renderable.setElementUVCoordinate(UVArray[0], UVArray[1], UVArray[2], UVArray[3]);
                    this.tileMap.addTile(x, y, renderable);
                    break;
                }
            }
        }
    }
};

/******************************************************************************** 
 * addTree
 * 
 * Adds a single tree to a given location
 * 
 * @param {Integer} x           | The X position of the trunk
 * @param {Integer} y           | The Y position of the bottom of the trunk
 * @param {Integer} height      | The height of the tree
 * @param {Texture} woodTexture | The trunk's texture
 * @param {Vec4}    woodUV      | The trunk texture's UV coordinates
 * @param {Texture} leafTexture | The leaf texture
 * @param {Vec4}    leafUV      | The leaf texture's UV coordinates
 * 
 ********************************************************************************/
TerrainGenerator.prototype.addTree = function (x, y, height, woodTexture, woodUV, leafTexture, leafUV)
{
    if (y + height > this.tileMap.getHeight()) return;
    
    for (var i = y; i < y + height - 2; i++)
    {
        var renderable = new SpriteRenderable(woodTexture);
        renderable.setElementUVCoordinate(woodUV[0], woodUV[1], woodUV[2], woodUV[3]);
        this.tileMap.addTile(x, i, renderable);
    }
    
    //this.shapeGen.texturedRectangle(x - 1, y + height - 2, 3, 3, leafTexture, [0.42, 0.67, 0.26, 0.8], leafUV);
    //this.shapeGen.texturedTriangle(x - 2, y + height - 2, 5, leafTexture, [0.42, 0.67, 0.26, 0.8], leafUV);
    this.shapeGen.texturedCircle(x, y + height - 2, 2, leafTexture, [0.42, 0.67, 0.26, 0.8], leafUV, true);
    //ShapeGen.prototype.texturedCircle = function (xc, yc, r, texture, color, UVArray, fill)
};

/******************************************************************************** 
 * generateTrees
 * 
 * Randomly places trees across the map
 * 
 * @param {Integer} minHeight   | The lowest Y coordinate trees will generate
 * @param {Integer} maxHeight   | The highest Y coordinate trees will generate
 * @param {Double}  frequency   | How often trees generate (0 - 1)
 * @param {Texture} woodTexture | The trunk's texture
 * @param {Vec4}    woodUV      | The trunk texture's UV coordinates
 * @param {Texture} leafTexture | The leaf texture
 * @param {Vec4}    leafUV      | The leaf texture's UV coordinates
 * 
 ********************************************************************************/
TerrainGenerator.prototype.generateTrees = function (minHeight, maxHeight, frequency, woodTexture, woodUV, leafTexture, leafUV)
{
    for (var x = this.startX + 1; x < this.endX - 1; x++)
    {
        for (var y = this.tileMap.getHeight() - 2; y >= 0; y--)
        {
            if (this.tileMap.isTileAt(x, y))
            {
                if (Math.random() < frequency)
                {
                    this.addTree(x, 
                                 y, 
                                 Math.round(Math.random() * (maxHeight - minHeight)) + minHeight, 
                                 woodTexture, 
                                 woodUV, 
                                 leafTexture, 
                                 leafUV);
                    x ++;
                }
                break;
            }
        }
    }
};


/////////////////////////////////////////////////////////////////////////////////
// Private Methods:
/////////////////////////////////////////////////////////////////////////////////



/******************************************************************************** 
 * generateBumps (Private overlaod)
 * 
 * The user is not intended to change the X positions within a Terrain
 * Generator Object, create a new TerrainGenerator instead!
 * 
 * @param {Integer} startX | The left bound of the bump generation 
 * @param {Integer} endX   | The right bound of the bump generation
 * @param {Integer} yLevel | The tile Y position where the bumps will center
 * 
 ********************************************************************************/
TerrainGenerator.prototype._generateBumps = function (startX, endX, yLevel)
{    
    for(var i = startX; i < endX; i++)
    {
        //this.shapeGen.circle(i, Math.round(Math.random() * 8 - 4) + yLevel, Math.round(Math.random() * 3) + 2, [0.2, 1, 0.2, 1], true);
        this.shapeGen.circle(i, Math.round(Math.random() * 8 - 4) + yLevel, 5, [0.2, 1, 0.2, 1], true);
    }
};

TerrainGenerator.prototype.getSurfaceCollision = function ( flip )
{
    collisionArray = [];
    
    if(flip === true)
    {
        for (var x = 0; x < this.tileMap.getWidth(); x++)
        {
            for (var y = this.tileMap.getHeight() - 2; y >= 0 ; y--)
            {
                if (!this.tileMap.isTileAt(x, y))
                {
                    collisionArray[x] = this.tileMap.getBounds(x, y + 1);
                    break;
                }
            }
        }
    }
    else
    {
        for (var x = 0; x < this.tileMap.getWidth(); x++)
        {
            for (var y = 1; y < this.tileMap.getHeight(); y++)
            {
                if (!this.tileMap.isTileAt(x, y))
                {
                    collisionArray[x] = this.tileMap.getBounds(x, y - 1);
                    break;
                }
            }
        }
    }  
    
    console.log("Collision Array Length: " + collisionArray.length);
    
    for(var i = 0 ; i < collisionArray.length; i++)
    {
        if(collisionArray[i] === null)
        {
            console.log("Got a null!");
        }
    }
    
    
    
    return collisionArray;
};

/******************************************************************************** 
 * MyGame.js
 * 
 * This used to be the main scene, its been moved to Scene1
 * 
 ********************************************************************************/

"use strict";  // Operate in Strict mode such that variables must be declared before used!


/******************************************************************************** 
 * MyGame Constructor
 ********************************************************************************/
function MyGame()
{
    this.mCamera = null;

    // sprite sheet and uv coords of its constents
    this.spriteSheet = "assets/terrain_tileset.png";
    this.stoneUV = [97 / 256, 127 / 256, 0 / 128, 31 / 128];
    this.dirtUV = [97 / 256, 127 / 256, 65 / 128, 96 / 128];
    this.darkDirtUV = [(97 + 32) / 256, (127 + 32) / 256, 65 / 128, 96 / 128];
    this.darkStoneUV = [(97 + 32) / 256, (127 + 32) / 256, 0 / 128, 31 / 128];
    this.grassUV = [97 / 256, 127 /256, 32 / 128, 64 / 128];
    
    this.stone = "assets/stone.png";
    this.dirt = "assets/dirt.png";
    this.grass = "assets/grass.png";
    this.wood = "assets/wood.png";
    this.leaves = "assets/leaves.png";
    this.defaultUV = [0,1,0,1];

    this.tileMap = null;
    
    this.shapes = null;
    
    this.shapeGen = null;
    
    this.terrainGen = null;
    
    this.cameraSpeed = 1;
    this.boundedCamera = true;
    
    this.xPos = 0;
    this.yPos = 0;

    this.background = new MountainBackground();
}
gEngine.Core.inheritPrototype(MyGame, Scene);


/******************************************************************************** 
 * initialize 
 ********************************************************************************/
MyGame.prototype.initialize = function () 
{
    gEngine.Textures.loadTexture(this.spriteSheet);
    gEngine.Textures.loadTexture(this.stone);
    gEngine.Textures.loadTexture(this.dirt);
    gEngine.Textures.loadTexture(this.grass);
    gEngine.Textures.loadTexture(this.wood);
    gEngine.Textures.loadTexture(this.leaves);
    
    this.background.loadTextures();
    
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                   // width of camera
        [0, 0, 1000, 500]       // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.1, 0.8, 1]);
    this.mCamera.configInterpolation(1, 1);
    
    this.background.setWidth(this.mCamera.getWCWidth());
    this.background.setHeight(this.mCamera.getWCHeight());
    
    this.tileMap = new TileMap(-50, -25, 2, 300, 300);
   
    this.terrainGen = new TerrainGenerator(this.tileMap, 0, this.tileMap.getWidth());
    
    this.terrainGen.generateFlat(6);
    this.terrainGen.generateBumps(4);
    
    this.terrainGen.generateHills(6, 0.01, 120, 2);
    
    this.terrainGen.setTexture(0, 300, this.stone, this.defaultUV);
    
    for (var i = 0; i < 7; i++)
    {
        this.terrainGen.addTopTiles(this.dirt, this.defaultUV);
    }
    
    this.terrainGen.addTopTiles(this.grass, this.defaultUV);
    
    this.terrainGen.generateTrees(5, 15, 0.05, this.wood, this.leaves);
    
    //this.basicTerrain();
    
    this.background.initialize();
    
    
};


MyGame.prototype.loadScene = function () 
{
    this.initialize();
};

MyGame.prototype.unloadScene = function ()
{
    this.background.unloadTextures();
    
};


/******************************************************************************** 
 * draw
 ********************************************************************************/
MyGame.prototype.draw = function ()
{
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    this.mCamera.setupViewProjection();
    
    this.background.draw(this.mCamera);

 
    this.tileMap.draw(this.mCamera);
};


/******************************************************************************** 
 * update
 ********************************************************************************/
MyGame.prototype.update = function ()
{
    this.background.update(this.xPos, this.yPos);
    
    this.moveCamera();
    
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Z))
    {
        
    }
};


/******************************************************************************** 
 * moveCamera
 ********************************************************************************/
MyGame.prototype.moveCamera = function ()
{
   var cameraX = this.mCamera.getWCCenter()[0];
   var cameraY = this.mCamera.getWCCenter()[1];
   var cameraHeight = this.mCamera.getWCHeight();
   var cameraWidth = this.mCamera.getWCWidth();
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W))
   {
       cameraY += this.cameraSpeed;
   }
   if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S))
   {
       cameraY -= this.cameraSpeed;
   }
   if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A))
   {
       cameraX -= this.cameraSpeed;
   }
   if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
   {
       cameraX += this.cameraSpeed;
   }
   
   if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
   {
       console.log("Height: " + cameraHeight);
       console.log("Width: " + cameraWidth);
       
       console.log("Tile Height: " + this.tileMap.getHeight());
       console.log("Tile Width: " + this.tileMap.getWCWidth());
   }
   
   if(this.boundedCamera)
   {
       if(cameraY + cameraHeight / 2 > this.tileMap.getYPos() + this.tileMap.getWCHeight())
       {
           cameraY = this.tileMap.getYPos() + this.tileMap.getWCHeight() - cameraHeight / 2;
       }
       if(cameraY - cameraHeight / 2 < this.tileMap.getYPos())
       {
           cameraY = this.tileMap.getYPos() + cameraHeight / 2;
       }
       if(cameraX + cameraWidth / 2 > this.tileMap.getXPos() + this.tileMap.getWCWidth())
       {
           cameraX = this.tileMap.getXPos() + this.tileMap.getWCWidth() - cameraWidth / 2;
       }
       if(cameraX - cameraWidth / 2 < this.tileMap.getXPos())
       {
           cameraX = this.tileMap.getXPos() + cameraWidth / 2;
       }   
   }
   
   
   this.mCamera.setWCCenter(cameraX, cameraY);
   this.xPos = cameraX;
   this.yPos = cameraY;
   this.mCamera.update(); 
};

/******************************************************************************** 
 * basicTerrain
 * 
 * Test function that creates flat terrain
 ********************************************************************************/
MyGame.prototype.basicTerrain = function()
{
    //Stone layer
    for(var i = 0; i < 20; i++)
    {
        for(var j = 0; j < 2; j++)
        {
            var renderable = new SpriteRenderable(this.spriteSheet);
            renderable.setElementUVCoordinate(this.stone[0], this.stone[1], this.stone[2], this.stone[3]);
           
            this.tileMap.addTile(i, j, renderable);
        }
    }
    
    //Dirt layer
    for(var i = 0; i < 20; i++)
    {
        for(var j = 2; j < 4; j++)
        {
            var renderable = new SpriteRenderable(this.spriteSheet);
            renderable.setElementUVCoordinate(this.dirt[0], this.dirt[1], this.dirt[2], this.dirt[3]);
           
            this.tileMap.addTile(i, j, renderable);
        }
    }
    
    //Grass layer 
    for(var i = 0; i < 20; i++)
    {
        for(var j = 4; j < 5; j++)
        {
            var renderable = new SpriteRenderable(this.spriteSheet);
            renderable.setElementUVCoordinate(this.grass[0], this.grass[1], this.grass[2], this.grass[3]);
           
            this.tileMap.addTile(i, j, renderable);
        }
    }
    
    // sky layer
    for(var i = 0; i < 20; i++)
    {
        for(var j = 0; j < 10; j++)
        {
            if(!this.tileMap.isTileAt(i,j))
            {
                var sky = new Renderable();
                sky.setColor([0.5, 0.5, j/10, 1]);

                this.tileMap.addTile(i,j,sky);
            }
        } 
    }
};
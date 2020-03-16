


function Scene4()
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
    
    
    this.bedrock = "assets/blocks/bedrock.png";
    this.coal = "assets/blocks/coal_block.png";
    this.cobblestone = "assets/blocks/cobblestone.png";
    this.mossyCobblestone = "assets/blocks/cobblestone_mossy.png";
    this.cactus = "assets/blocks/cactus_side.png";
    this.sand = "assets/blocks/sand.png";
    this.snowDirt = "assets/blocks/grass_side_snowed.png";
    this.snow = "assets/blocks/snow.png";
    this.defaultUV = [0,1,0,1];

    this.tileMap = null;
    
    this.shapes = null;
    
    this.shapeGen = null;
    
    this.terrainGen = null;
    
    this.cameraSpeed = 1;
    this.boundedCamera = true;
    
    this.xPos = 0;
    this.yPos = 0;
}

Scene4.prototype.initialize = function ()
{};


Scene4.prototype.loadScene = function ()
{
    gEngine.Textures.loadTexture(this.spriteSheet);
    gEngine.Textures.loadTexture(this.stone);
    gEngine.Textures.loadTexture(this.dirt);
    gEngine.Textures.loadTexture(this.grass);
    gEngine.Textures.loadTexture(this.wood);
    gEngine.Textures.loadTexture(this.leaves);
    
    gEngine.Textures.loadTexture(this.bedrock);
    gEngine.Textures.loadTexture(this.coal);
    gEngine.Textures.loadTexture(this.snowDirt);
    gEngine.Textures.loadTexture(this.snow);
    gEngine.Textures.loadTexture(this.cobblestone);
    gEngine.Textures.loadTexture(this.mossyCobblestone);
    gEngine.Textures.loadTexture(this.cactus);
    gEngine.Textures.loadTexture(this.sand);
        
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                   // width of camera
        [0, 0, 1000, 500]       // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.1, 0.8, 1]);
    this.mCamera.configInterpolation(1, 1);
    
    this.tileMap = new TileMap(-50, -25, 2, 100, 100);
    
   
    this.terrainGen = new TerrainGenerator(this.tileMap, 0, this.tileMap.getWidth());
    
    this.terrainGen.generateFlat(0, 6);
    this.terrainGen.generateBumps(1);
        
    this.terrainGen.setTexture(0, 300, this.stone, this.defaultUV);
    
    for (var i = 0; i < 7; i++)
    {
        this.terrainGen.addTopTiles(this.sand, this.defaultUV);
    }
   
    this.terrainGen.generateTrees(5, 8, 0.03, this.cactus, [1,0,1,0], null, [0,0,0,0]);
       
    this.tileBackground();
    
};

Scene4.prototype.unloadScene = function ()
{
    gEngine.Textures.unloadTexture(this.spriteSheet);
    gEngine.Textures.unloadTexture(this.stone);
    gEngine.Textures.unloadTexture(this.dirt);
    gEngine.Textures.unloadTexture(this.grass);
    gEngine.Textures.unloadTexture(this.wood);
    gEngine.Textures.unloadTexture(this.leaves);
    
    gEngine.Textures.unloadTexture(this.bedrock);
    gEngine.Textures.unloadTexture(this.coal);
    gEngine.Textures.unloadTexture(this.snowDirt);
    gEngine.Textures.unloadTexture(this.snow);
    gEngine.Textures.unloadTexture(this.cobblestone);
    gEngine.Textures.unloadTexture(this.mossyCobblestone);
    gEngine.Textures.unloadTexture(this.cactus);
    gEngine.Textures.unloadTexture(this.sand);
};


Scene4.prototype.draw = function ()
{
   gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    this.mCamera.setupViewProjection();
     
    this.tileMap.draw(this.mCamera); 
};

Scene4.prototype.tileBackground = function ()
{
    for(var i = 0; i < this.tileMap.width; i++)
    {
        for(var j = 0; j < this.tileMap.width; j++)
        {
            if(!this.tileMap.isTileAt(i, j))
            {
                var renderable = new Renderable();
                renderable.setColor([1 - (j + 20) / this.tileMap.getHeight(), 0.1, (j + 20) / this.tileMap.getHeight(), 1]);

                this.tileMap.addTile(i, j, renderable);
            }
        }
    }
};

Scene4.prototype.update = function ()
{    
    this.moveCamera();
    
    this.sceneSwitch();
};

Scene4.prototype.sceneSwitch = function ()
{
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One))
    {
        gEngine.Core.startScene(new Scene1());
    } 
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two))
    {
        gEngine.Core.startScene(new Scene2());
    } 
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Three))
    {
        gEngine.Core.startScene(new Scene3);
    } 
};




/******************************************************************************** 
 * moveCamera
 ********************************************************************************/
Scene4.prototype.moveCamera = function ()
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







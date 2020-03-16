


function Scene2()
{
    this.mCamera = null;

    // sprite sheet and uv coords of its constents
    this.spriteSheet = "assets/terrain_tileset.png";
    this.heroSpriteSheet = "assets/SpriteSheet.png"
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

    this.background = new CaveBackground();
    
    this.scene3 = null;
}

Scene2.prototype.initialize = function ()
{};


Scene2.prototype.loadScene = function ()
{
    gEngine.Textures.loadTexture(this.spriteSheet);
    gEngine.Textures.loadTexture(this.stone);
    gEngine.Textures.loadTexture(this.dirt);
    gEngine.Textures.loadTexture(this.grass);
    gEngine.Textures.loadTexture(this.wood);
    gEngine.Textures.loadTexture(this.leaves);
    
        gEngine.Textures.loadTexture(this.heroSpriteSheet);
    
    this.background.loadTextures();
    
    this.mCamera = new Camera(
        vec2.fromValues(0, 15), // position of the camera
        100,                   // width of camera
        [0, 0, 1000, 500]       // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.1, 0.8, 1]);
    this.mCamera.configInterpolation(1, 1);
    
    this.background.setWidth(this.mCamera.getWCWidth());
    this.background.setHeight(this.mCamera.getWCHeight());
    
    this.tileMap = new TileMap(-50, -25, 2, 300, 50);
   
    this.terrainGen = new TerrainGenerator(this.tileMap, 0, this.tileMap.getWidth());
    
    this.terrainGen.generateFlat(0, 6);
    this.terrainGen.generateBumps(4);
    
    this.terrainGen.generateBumps(34);
    this.terrainGen.generateFlat(34, 40);
    
    this.terrainGen.setTexture(0, 300, this.spriteSheet, this.darkStoneUV);
    
    this.terrainGen.addTopTiles(this.stone, this.defaultUV, true);
    
        
    this.background.initialize();
    
    this.scene3 = new Scene3();
    
    this.bottomArray = this.terrainGen.getSurfaceCollision();
    this.topArray = this.terrainGen.getSurfaceCollision(true);
    
    this.collisionArray = this.bottomArray.concat(this.topArray);
    
    this.hero = new Hero(this.heroSpriteSheet);
    
};

Scene2.prototype.unloadScene = function ()
{
    this.background.unloadTextures();
    gEngine.Textures.unloadTexture(this.spriteSheet);
    gEngine.Textures.unloadTexture(this.stone);
    gEngine.Textures.unloadTexture(this.dirt);
    gEngine.Textures.unloadTexture(this.grass);
    gEngine.Textures.unloadTexture(this.wood);
    gEngine.Textures.unloadTexture(this.leaves);
    gEngine.Textures.unloadTexture(this.heroSpriteSheet);
};


Scene2.prototype.draw = function ()
{
   gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    this.mCamera.setupViewProjection();
    
    this.background.draw(this.mCamera);

 
    this.tileMap.draw(this.mCamera); 
    
    this.hero.draw(this.mCamera);
};

Scene2.prototype.update = function ()
{
    this.background.update(this.xPos, this.yPos);
    
    this.moveCamera();
     
    this.hero.update(this.mCamera, this.collisionArray);
    
    this.sceneSwitch();
      
};

Scene2.prototype.sceneSwitch = function ()
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
}


/******************************************************************************** 
 * moveCamera
 ********************************************************************************/
Scene2.prototype.moveCamera = function ()
{
   var cameraX = this.mCamera.getWCCenter()[0];
   var cameraY = this.mCamera.getWCCenter()[1];
   var cameraHeight = this.mCamera.getWCHeight();
   var cameraWidth = this.mCamera.getWCWidth();
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W))
   {
       //cameraY += this.cameraSpeed;
   }
   if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S))
   {
       //cameraY -= this.cameraSpeed;
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



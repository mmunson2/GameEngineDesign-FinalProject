/******************************************************************************** 
 * 
 ********************************************************************************/
function Scene2()
{
    this.mCamera = null;

    // sprite sheet and uv coords of its constents
    this.spriteSheet = "assets/terrain_tileset.png";
    this.heroSpriteSheet = "assets/SpriteSheet.png";
    this.darkStoneUV = [(97 + 32) / 256, (127 + 32) / 256, 0 / 128, 31 / 128];

    this.tileMap = null;
        
    this.terrainGen = null;
    
    this.cameraSpeed = 1;
    this.boundedCamera = true;
    
    this.xPos = 0;
    this.yPos = 0;

    this.background = new CaveBackground();
    
}

/******************************************************************************** 
 * 
 ********************************************************************************/
Scene2.prototype.initialize = function ()
{};


/******************************************************************************** 
 * 
 ********************************************************************************/
Scene2.prototype.loadScene = function ()
{
    gEngine.Textures.loadTexture(this.spriteSheet);
    
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
        
    this.background.initialize();
    
    this.generateTerrain();
    
    //Set up Collisions for top and bottom of the cave
    this.bottomArray = this.terrainGen.getSurfaceCollision();
    this.topArray = this.terrainGen.getSurfaceCollision(true);
    
    this.collisionArray = this.bottomArray.concat(this.topArray);
    
    this.hero = new Hero(this.heroSpriteSheet);
    
};

/******************************************************************************** 
 * 
 ********************************************************************************/
Scene2.prototype.generateTerrain = function ()
{
    this.tileMap = new TileMap(-50, -25, 2, 300, 50);
   
    this.terrainGen = new TerrainGenerator(this.tileMap, 0, this.tileMap.getWidth());
    
    this.terrainGen.generateFlat(0, 6);
    this.terrainGen.generateBumps(4);
    
    this.terrainGen.generateBumps(34);
    this.terrainGen.generateFlat(34, 40);
    
    this.terrainGen.setTexture(0, 300, this.spriteSheet, this.darkStoneUV);
};

/******************************************************************************** 
 * 
 ********************************************************************************/
Scene2.prototype.unloadScene = function ()
{
    this.background.unloadTextures();
    gEngine.Textures.unloadTexture(this.spriteSheet);
    gEngine.Textures.unloadTexture(this.heroSpriteSheet);
};

/******************************************************************************** 
 * 
 ********************************************************************************/
Scene2.prototype.draw = function ()
{
   gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    this.mCamera.setupViewProjection();
    
    this.background.draw(this.mCamera);

 
    this.tileMap.draw(this.mCamera); 
    
    this.hero.draw(this.mCamera);
};

/******************************************************************************** 
 * 
 ********************************************************************************/
Scene2.prototype.update = function ()
{
    this.background.update(this.xPos, this.yPos);
    
    this.moveCamera();
     
    this.hero.update(this.mCamera, this.collisionArray);
    
    this.sceneSwitch();
      
};

/******************************************************************************** 
 * 
 ********************************************************************************/
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
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Four))
    {
        gEngine.Core.startScene(new Scene4());
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Five))
    {
        gEngine.Core.startScene(new Scene5());
    }
};


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



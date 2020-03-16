/******************************************************************************** 
 * 
 ********************************************************************************/
function Scene4()
{
    this.mCamera = null;
    
    this.stone = "assets/stone.png";    
    this.bedrock = "assets/blocks/bedrock.png";
    this.cactus = "assets/blocks/cactus_side.png";
    this.sand = "assets/blocks/sand.png";
    this.sandstone = "assets/blocks/sandstone_normal.png";
    
    this.defaultUV = [0,1,0,1];

    this.tileMap = null;
    
    this.terrainGen = null;
    
    this.cameraSpeed = 1;
    this.boundedCamera = true;
    
    this.xPos = 0;
    this.yPos = 0;
}

/******************************************************************************** 
 * 
 ********************************************************************************/
Scene4.prototype.initialize = function ()
{};


/******************************************************************************** 
 * 
 ********************************************************************************/
Scene4.prototype.loadScene = function ()
{
    gEngine.Textures.loadTexture(this.stone);    
    gEngine.Textures.loadTexture(this.bedrock);
    gEngine.Textures.loadTexture(this.cactus);
    gEngine.Textures.loadTexture(this.sand);
    gEngine.Textures.loadTexture(this.sandstone);
        
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                   // width of camera
        [0, 0, 1000, 500]       // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.1, 0.8, 1]);
    this.mCamera.configInterpolation(1, 1);
    
    this.generateTerrain();
};

/******************************************************************************** 
 * 
 ********************************************************************************/
Scene4.prototype.generateTerrain = function ()
{
    this.tileMap = new TileMap(-50, -25, 2, 100, 100);
    
    this.terrainGen = new TerrainGenerator(this.tileMap, 0, this.tileMap.getWidth());
    
    this.terrainGen.generateFlat(0, 6);
    this.terrainGen.generateBumps(1);
    
    this.terrainGen.setTexture(0, 1, this.bedrock, this.defaultUV);
    this.terrainGen.setTexture(1, 300, this.stone, this.defaultUV);
    
    this.terrainGen.addTopTiles(this.sandstone, this.defaultUV);
    this.terrainGen.addTopTiles(this.sandstone, this.defaultUV);
    
    for (var i = 0; i < 5; i++)
    {
        this.terrainGen.addTopTiles(this.sand, this.defaultUV);
    }
   
    this.terrainGen.generateTrees(5, 8, 0.03, this.cactus, [0.99,0.01,1,0], null, [0,0,0,0]);
       
    this.tileBackground();  
};

/******************************************************************************** 
 * 
 ********************************************************************************/
Scene4.prototype.unloadScene = function ()
{
    gEngine.Textures.unloadTexture(this.stone);   
    gEngine.Textures.unloadTexture(this.bedrock);
    gEngine.Textures.unloadTexture(this.cactus);
    gEngine.Textures.unloadTexture(this.sand);
    gEngine.Textures.unloadTexture(this.sandstone);
};

/******************************************************************************** 
 * 
 ********************************************************************************/
Scene4.prototype.draw = function ()
{
   gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    this.mCamera.setupViewProjection();
     
    this.tileMap.draw(this.mCamera); 
};

/******************************************************************************** 
 * 
 ********************************************************************************/
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

/******************************************************************************** 
 * 
 ********************************************************************************/
Scene4.prototype.update = function ()
{    
    this.moveCamera();
    
    this.sceneSwitch();
};

/******************************************************************************** 
 * 
 ********************************************************************************/
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







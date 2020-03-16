/******************************************************************************** 
 * Scene5.js
 ********************************************************************************/
function Scene5()
{
    this.mCamera = null;
       
    this.mossyCobblestone = "assets/blocks/cobblestone_mossy.png";
    this.mobspawner = "assets/blocks/mob_spawner.png";
    this.dispenser = "assets/blocks/dispenser_front_horizontal.png";
    this.defaultUV = [0,1,0,1];

    this.tileMap = null;
        
    this.terrainGen = null;
    
    this.cameraSpeed = 1;
    this.boundedCamera = true;
    
    this.xPos = 0;
    this.yPos = 0;
}

/******************************************************************************** 
 * initialize
 ********************************************************************************/
Scene5.prototype.initialize = function ()
{};


/******************************************************************************** 
 * loadScene
 ********************************************************************************/
Scene5.prototype.loadScene = function ()
{
    gEngine.Textures.loadTexture(this.mossyCobblestone);
    gEngine.Textures.loadTexture(this.mobspawner);
    gEngine.Textures.loadTexture(this.dispenser);
    
        
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                   // width of camera
        [0, 0, 1000, 500]       // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0, 0.4, 0, 1]);
    this.mCamera.configInterpolation(1, 1);
       
    this.generateTerrain();
    this.tileBackground();
};

/******************************************************************************** 
 * generateTerrain
 ********************************************************************************/
Scene5.prototype.generateTerrain = function ()
{
    this.tileMap = new TileMap(-50, -25, 2, 100, 100);
    
    this.terrainGen = new TerrainGenerator(this.tileMap, 0, this.tileMap.getWidth());
    
    this.terrainGen.generateFlat(0, 6);
    
    this.terrainGen.generateHills(6, 0.1, 10, 100);
        
    this.terrainGen.setTexture(0, 100, this.mossyCobblestone, this.defaultUV);

    this.terrainGen.generateTrees(10, 20, 0.1, null, [0,0,0,0], this.mobspawner, this.defaultUV);
   
    this.terrainGen.generateTrees(4, 4, 0.05, this.dispenser, this.defaultUV, null, this.defaultUV);
  
};

/******************************************************************************** 
 * unloadScene
 ********************************************************************************/
Scene5.prototype.unloadScene = function ()
{
    gEngine.Textures.unloadTexture(this.mossyCobblestone);
    gEngine.Textures.loadTexture(this.mobspawner);
    gEngine.Textures.loadTexture(this.dispenser);
};

/******************************************************************************** 
 * draw
 ********************************************************************************/
Scene5.prototype.draw = function ()
{
   gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    this.mCamera.setupViewProjection();
     
    this.tileMap.draw(this.mCamera); 
};

/******************************************************************************** 
 * tileBackground
 ********************************************************************************/
Scene5.prototype.tileBackground = function ()
{
    for(var i = 0; i < this.tileMap.width; i++)
    {
        for(var j = 0; j < this.tileMap.width; j++)
        {
            if(!this.tileMap.isTileAt(i, j))
            {
                var renderable = new Renderable();
                renderable.setColor([0.1, j / 200, 0.1, 1]);

                this.tileMap.addTile(i, j, renderable);
            }
        }
    }
};

/******************************************************************************** 
 * update
 ********************************************************************************/
Scene5.prototype.update = function ()
{    
    this.moveCamera();
    
    this.sceneSwitch();
};

/******************************************************************************** 
 * sceneSwitch
 ********************************************************************************/
Scene5.prototype.sceneSwitch = function ()
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
Scene5.prototype.moveCamera = function ()
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







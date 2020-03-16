/******************************************************************************** 
 * Scene4.js
 * 
 * A desert scene demonstrating creative uses of the generateTrees() method.
 * A gradient background of tiles is applied to give the appearance of a
 * setting sun.
 ********************************************************************************/
function Scene4(camera)
{
    this.mCamera = camera;
    this.mCamera.setWCCenter(0,0);
    this.mCamera.update();
    
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
    
    document.getElementById("info").innerHTML = "Use keys 1-5 to change scenes | Current Scene: 4 | Use WASD to move camera";
}

/******************************************************************************** 
 * initialize
 * 
 * Nothing to see here! Our engine throws an error if this isn't included :(
 ********************************************************************************/
Scene4.prototype.initialize = function ()
{};


/******************************************************************************** 
 * loadScene
 ********************************************************************************/
Scene4.prototype.loadScene = function ()
{
    gEngine.Textures.loadTexture(this.stone);    
    gEngine.Textures.loadTexture(this.bedrock);
    gEngine.Textures.loadTexture(this.cactus);
    gEngine.Textures.loadTexture(this.sand);
    gEngine.Textures.loadTexture(this.sandstone);
        
    this.mCamera.setBackgroundColor([0.8, 0.1, 0.8, 1]);
    this.mCamera.configInterpolation(1, 1);
    
    this.generateTerrain();
};

/******************************************************************************** 
 * generateTerrain
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
 * unloadScene
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
 * draw
 ********************************************************************************/
Scene4.prototype.draw = function ()
{
   gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    this.mCamera.setupViewProjection();
     
    this.tileMap.draw(this.mCamera); 
};

/******************************************************************************** 
 * tileBackground
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
 * update
 ********************************************************************************/
Scene4.prototype.update = function ()
{    
    this.moveCamera();
    
    this.sceneSwitch();
};

/******************************************************************************** 
 * sceneSwitch
 ********************************************************************************/
Scene4.prototype.sceneSwitch = function ()
{
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One))
    {
        gEngine.Core.startScene(new Scene1(this.mCamera));
    } 
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two))
    {
        gEngine.Core.startScene(new Scene2(this.mCamera));
    } 
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Three))
    {
        gEngine.Core.startScene(new Scene3(this.mCamera));
    } 
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Four))
    {
        gEngine.Core.startScene(new Scene4(this.mCamera));
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Five))
    {
        gEngine.Core.startScene(new Scene5(this.mCamera));
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







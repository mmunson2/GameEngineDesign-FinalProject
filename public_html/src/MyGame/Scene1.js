/******************************************************************************** 
 * Scene1.js
 * 
 * The goal of our TerrainGenerator - create world similar to what we've
 * all experienced in Minecraft and Terraria! A world featuring snowy mountains
 * and forested plains.
 ********************************************************************************/
function Scene1(camera)
{
    this.mCamera = camera;
    this.mCamera.setWCCenter(0,0);
    this.mCamera.update();
    
    this.stone = "assets/stone.png";
    this.dirt = "assets/dirt.png";
    this.grass = "assets/grass.png";
    this.wood = "assets/wood.png";
    this.leaves = "assets/leaves.png";
    this.bedrock = "assets/blocks/bedrock.png";
    this.snowDirt = "assets/blocks/grass_side_snowed.png";
   
    this.defaultUV = [0,1,0,1];

    this.tileMap = null;
   
    this.terrainGen = null;
    
    this.cameraSpeed = 1;
    this.boundedCamera = true;
    
    this.xPos = 0;
    this.yPos = 0;

    this.background = new MountainBackground();
    
    document.getElementById("info").innerHTML = "Use keys 1-5 to change scenes | Current Scene: 1 | Use WASD to move camera";
    
}

/******************************************************************************** 
 * initialize
 * 
 * Nothing to see here! Our engine throws an error if this isn't included :(
 ********************************************************************************/
Scene1.prototype.initialize = function ()
{};


/******************************************************************************** 
 * loadScene
 * 
 *********************************************************************************/
Scene1.prototype.loadScene = function ()
{
    //Load in textures
    gEngine.Textures.loadTexture(this.stone);
    gEngine.Textures.loadTexture(this.dirt);
    gEngine.Textures.loadTexture(this.grass);
    gEngine.Textures.loadTexture(this.wood);
    gEngine.Textures.loadTexture(this.leaves);
    
    gEngine.Textures.loadTexture(this.bedrock);
    gEngine.Textures.loadTexture(this.snowDirt);
    
    //Load parallax background
    this.background.loadTextures();
    
    this.mCamera.setBackgroundColor([0.8, 0.1, 0.8, 1]);
    this.mCamera.configInterpolation(1, 1);
    
    this.background.setWidth(this.mCamera.getWCWidth());
    this.background.setHeight(this.mCamera.getWCHeight());
    
    this.tileMap = new TileMap(-50, -25, 2, 300, 300);
        
    this.generateTerrain();    
        
    this.background.initialize();
};

/******************************************************************************** 
 * generateTerrain
 ********************************************************************************/
Scene1.prototype.generateTerrain = function ()
{
    this.terrainGen = new TerrainGenerator(this.tileMap, 0, this.tileMap.getWidth());
    
    this.terrainGen.generateFlat(0, 6);
    this.terrainGen.generateBumps(4);
    
    this.terrainGen.generateHills(6, 0.01, 120, 2);
    
    this.terrainGen.setTexture(0, 1, this.bedrock, this.defaultUV);
    this.terrainGen.setTexture(1, 300, this.stone, this.defaultUV);
    
    for (var i = 0; i < 7; i++)
    {
        this.terrainGen.addTopTiles(this.dirt, this.defaultUV);
    }
    
    this.terrainGen.addTopTiles(this.grass, this.defaultUV, 0, 74, false);
    this.terrainGen.addTopTiles(this.snowDirt, this.defaultUV, 75, this.tileMap.getHeight() - 1, false);
    
    this.terrainGen.generateTrees(5, 15, 0.05, this.wood, [1,0,1,0], this.leaves, [1,0,1,0]);
};

/******************************************************************************** 
 * unloadScene
 ********************************************************************************/
Scene1.prototype.unloadScene = function ()
{
    this.background.unloadTextures();
    gEngine.Textures.unloadTexture(this.stone);
    gEngine.Textures.unloadTexture(this.dirt);
    gEngine.Textures.unloadTexture(this.grass);
    gEngine.Textures.unloadTexture(this.wood);
    gEngine.Textures.unloadTexture(this.leaves);
    
    gEngine.Textures.unloadTexture(this.bedrock);
    gEngine.Textures.unloadTexture(this.snowDirt);
};

/******************************************************************************** 
 * draw
 ********************************************************************************/
Scene1.prototype.draw = function ()
{
   gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    this.mCamera.setupViewProjection();
    
    this.background.draw(this.mCamera);

 
    this.tileMap.draw(this.mCamera); 
};

/******************************************************************************** 
 * update
 ********************************************************************************/
Scene1.prototype.update = function ()
{
    this.background.update(this.xPos, this.yPos);
    
    this.moveCamera();
    
    this.sceneSwitch();
};

/******************************************************************************** 
 * sceneSwitch
 ********************************************************************************/
Scene1.prototype.sceneSwitch = function ()
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
Scene1.prototype.moveCamera = function ()
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







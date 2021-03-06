/******************************************************************************** 
 * Scene3.js
 * 
 * A mezmerizing demonstration of how the terrain generator works step by
 * step. Generation settings are very similar to Scene1 but camera 
 * movement is restricted.
 ********************************************************************************/
function Scene3(camera)
{
    this.mCamera = camera;
    this.mCamera.setWCCenter(0,0);
    this.mCamera.update();
    
    this.stone = "assets/stone.png";
    this.dirt = "assets/dirt.png";
    this.grass = "assets/grass.png";
    this.wood = "assets/wood.png";
    this.leaves = "assets/leaves.png";
    
    this.defaultUV = [0,1,0,1];

    this.tileMap = null;
        
    this.terrainGen = null;
    
    this.cameraSpeed = 1;
    this.boundedCamera = true;
    
    this.xPos = 0;
    this.yPos = 0;

    this.background = new MountainBackground();
    
    this.step = 0;
    this.frame = 0;
    
    document.getElementById("info").innerHTML = "Use keys 1-5 to change scenes | Current Scene: 3 | Looping terrain generation";
}

/******************************************************************************** 
 * initialize
 * 
 * Nothing to see here! Our engine throws an error if this isn't included :(
 ********************************************************************************/
Scene3.prototype.initialize = function ()
{};


/******************************************************************************** 
 * loadScene
 ********************************************************************************/
Scene3.prototype.loadScene = function ()
{
    gEngine.Textures.loadTexture(this.stone);
    gEngine.Textures.loadTexture(this.dirt);
    gEngine.Textures.loadTexture(this.grass);
    gEngine.Textures.loadTexture(this.wood);
    gEngine.Textures.loadTexture(this.leaves);
        
    this.background.loadTextures();
    
    this.mCamera.setBackgroundColor([0.8, 0.1, 0.8, 1]);
    this.mCamera.configInterpolation(1, 1);
    
    this.background.setWidth(this.mCamera.getWCWidth());
    this.background.setHeight(this.mCamera.getWCHeight());
    
    this.tileMap = new TileMap(-50, -25, 1, 102, 52);
   
    this.terrainGen = new TerrainGenerator(this.tileMap, 0, this.tileMap.getWidth());
    
    this.background.initialize();
};

/******************************************************************************** 
 * unloadScene
 ********************************************************************************/
Scene3.prototype.unloadScene = function ()
{
    this.background.unloadTextures();
    gEngine.Textures.unloadTexture(this.stone);
    gEngine.Textures.unloadTexture(this.dirt);
    gEngine.Textures.unloadTexture(this.grass);
    gEngine.Textures.unloadTexture(this.wood);
    gEngine.Textures.unloadTexture(this.leaves);
};

/******************************************************************************** 
 * draw
 ********************************************************************************/
Scene3.prototype.draw = function ()
{
   gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    this.mCamera.setupViewProjection();
    
    this.background.draw(this.mCamera);

 
    this.tileMap.draw(this.mCamera); 
};

/******************************************************************************** 
 * doStep
 ********************************************************************************/
Scene3.prototype.doStep = function ()
{
    if (this.step === 0)
    {
        this.terrainGen.generateFlat(0, 6);
    }
    if (this.step === 1)
    {
        this.terrainGen.generateBumps(4);
    }
    if (this.step === 2)
    {
        this.terrainGen.generateHills(6, 0.02, 80, 2);
    }
    if (this.step === 3)
    {
        this.terrainGen.setTexture(0, 52, this.stone, this.defaultUV);
    }
    if (this.step >= 4 && this.step <= 10)
    {
        this.terrainGen.addTopTiles(this.dirt, this.defaultUV);
        this.frame += 30;
    }
    if (this.step === 11)
    {
        this.terrainGen.addTopTiles(this.grass, this.defaultUV);
    }
    if (this.step === 12)
    {
        this.terrainGen.generateTrees(5, 15, 0.05, this.wood, [1,0,1,0], this.leaves, [1,0,1,0]);
    }
    if (this.step === 13)
    {
        this.tileMap.clearMap();
        this.step = -1;
    }
    this.step++;
};

/******************************************************************************** 
 * update
 ********************************************************************************/
Scene3.prototype.update = function ()
{
    this.background.update(this.xPos, this.yPos);
    
    if (this.frame >= 45)
    {
        this.frame = 0;
        this.doStep();
    }
    else
    {
        this.frame++;
    }
        
    this.sceneSwitch();
    
};

/******************************************************************************** 
 * sceneSwitch
 ********************************************************************************/
Scene3.prototype.sceneSwitch = function ()
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

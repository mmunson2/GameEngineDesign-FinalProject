


function Scene1()
{
    this.mCamera = null;

    this.spriteSheet = "assets/terrain_tileset.png";

    this.tileMap = null;
    
    this.shapes = null;
    
    this.shapeGen = null;
    
    this.terrainGen = null;
    
    this.cameraSpeed = 1;
    this.boundedCamera = true;
    
    this.xPos = 0;
    this.yPos = 0;
    
    this.stone = [97 / 256, 127 / 256, 0 / 128, 31 / 128];
    this.dirt = [97 / 256, 127 / 256, 65 / 128, 96 / 128];
    this.darkDirt = [(97 + 32) / 256, (127 + 32) / 256, 65 / 128, 96 / 128];
    this.darkStone = [(97 + 32) / 256, (127 + 32) / 256, 0 / 128, 31 / 128];
    this.grass = [97 / 256, 127 /256, 32 / 128, 64 / 128];
    
    this.background = new MountainBackground();
}

Scene1.prototype.loadScene = function ()
{
    gEngine.Textures.loadTexture(this.spriteSheet);
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
    
    
    this.tileMap = new TileMap(-50, -25, 3, 300, 300);
   
    this.terrainGen = new TerrainGenerator(this.tileMap, 0, this.tileMap.getWidth());
    this.terrainGen.generateBumps(6);
    
    this.terrainGen.setTexture(0, 25, this.spriteSheet, this.darkStone);
    //this.terrainGen.setTexture(12, 20, this.spriteSheet, this.dirt);
    
    this.terrainGen.addTopTiles(this.spriteSheet, this.stone);
    
    for (var i = 0; i < 7; i++)
    {
        this.terrainGen.addTopTiles(this.spriteSheet, this.stone);
    }
    
    this.terrainGen.addTopTiles(this.spriteSheet, this.grass);
    
    
    //this.basicTerrain();
    
    this.background.initialize();
};

Scene1.prototype.unloadScene = function ()
{
    this.background.unloadTextures();
    gEngine.Textures.unloadTexture(this.spriteSheet);
};


Scene1.prototype.draw = function ()
{
    
    
    
};

Scene1.prototype.update = function ()
{
    
    
};








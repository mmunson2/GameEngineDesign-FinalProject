/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame()
{
    this.mCamera = null;

    this.spriteSheet = "assets/terrain_tileset.png";

    this.tileMap = null;
    
    this.shapes = null;
    this.shapeGen = null;
    
    this.test = null;
    this.testShape = null;

    this.stone = [97 / 256, 127 / 256, 0 / 128, 31 / 128];
    this.dirt = [97 / 256, 127 / 256, 65 / 128, 96 / 128];
    this.grass = [97 / 256, 127 /256, 32 / 128, 64 / 128];
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.initialize = function () 
{
    gEngine.Textures.loadTexture(this.spriteSheet);
    
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                   // width of camera
        [0, 0, 1000, 500]       // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    this.tileMap = new TileMap(-50, -25, 5, 20, 10);
    
    this.shapes = new TileMap(-50, -25, 1, 100, 50);
    
    // generating the terrain
    this.basicTerrain();
    
    // generating the house and sun
    this.shapeGen = new ShapeGen(this.shapes);
    this.shapeGen.rectangle(20, 25, 15, 10, [1, 0, 0, 1]);
    this.shapeGen.rectangle(22, 25, 3, 5, [0, 0, 1, 1]);
    this.shapeGen.rectangle(24, 27, 1, 1, [0, 1, 0, 1]);
    this.shapeGen.rectangle(28, 28, 5, 5, [0, 0, 1, 1]);
    this.shapeGen.rectangle(30, 28, 1, 5, [1, 0, 0, 1]);
    this.shapeGen.rectangle(28, 30, 5, 1, [1, 0, 0, 1]);
    this.shapeGen.triangle(20, 35, 15, [0, 1, 0, 1]);
    this.shapeGen.circle(85, 40, 6, [1, .8, 0, .8], true);
    
    // limit testing
    this.test = new TileMap(-50, -25, .05, 2000, 1000);
    this.testShape = new ShapeGen(this.test);
    this.testShape.circle(1000, 500, 400, [1, 0, 0, 1], true);
};

MyGame.prototype.draw = function ()
{
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    this.mCamera.setupViewProjection();

    this.tileMap.draw(this.mCamera);
    
    this.shapes.draw(this.mCamera);
    
    this.test.draw(this.mCamera);
};

MyGame.prototype.update = function ()
{
   
};

// test functions
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
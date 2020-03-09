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

function MyGame() {
    // The camera to view the scene
    this.mCamera = null;

    this.spriteSheet = "assets/terrain_tileset.png";

    this.tileMap = new TileMap(-50, -50 / 1.33333333, 7.5, 15, 10);
    
    gEngine.Textures.loadTexture(this.spriteSheet);
    
    this.stoneCoords = [96 / 256, 127 / 256, 0 / 128, 31 / 128];
    this.dirtCoords = [96 / 256, 127 / 256, 65 / 128, 97 / 128];
    this.grassCoords = [96 / 256, 127 /256, 32 / 128, 64 / 128];

}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                       // width of camera
        [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray

    /*
    for(var i = 0; i < 10; i++)
    {
        for(var j = 0; j < 10; j++)
        {
            var test = new Renderable();
            test.setColor([i/10, j/10, i/10, 1]);
            
            this.tileMap.addTile(i,j, test);
        }
    }
    */
   
   //this.testRenderable = new TextureRenderable(this.spriteSheet);
   
   //this.grass = new SpriteRenderable(this.spriteSheet);
    
    //this.grass.setElementUVCoordinate(this.grassCoords[0], this.grassCoords[1], this.grassCoords[2], this.grassCoords[3]);
    //this.grass.setColor([0,0,0,1]);
    
    //console.log(this.grass);
    
    //this.dirt = new SpriteRenderable(this.spriteSheet);
    
    //this.dirt.setElementUVCoordinate(96 / 256, 127 / 256, 65 / 128, 97 / 128);
    //this.dirt.setColor([0,0,0,1]);
    
    
    //this.stone = new SpriteRenderable(this.stoneCoords[0], this.stoneCoords[1], this.stoneCoords[2], this.stoneCoords[3]);
    
    //this.stone.setElementUVCoordinate(96 / 256, 127 / 256, 0 / 128, 31 / 128);
    //this.stone.setColor([0,0,0,1]);




   
   //Stone layer
   for(var i = 0; i < 15; i++)
   {
       for(var j = 0; j < 2; j++)
       {
            var stone = new SpriteRenderable(this.spriteSheet);
            stone.setElementUVCoordinate(this.stoneCoords[0], this.stoneCoords[1], this.stoneCoords[2], this.stoneCoords[3]);
            
            this.tileMap.addTile(i, j, stone);
       }
   }
   
   //Dirt layer
   for(var i = 0; i < 15; i++)
   {
       for(var j = 2; j < 5; j++)
       {
           var dirt = new SpriteRenderable(this.spriteSheet);
            dirt.setElementUVCoordinate(this.dirtCoords[0], this.dirtCoords[1], this.dirtCoords[2], this.dirtCoords[3]);
            
            this.tileMap.addTile(i, j, dirt);
       }
   }
    
   
   //Grass layer 
   for(var i = 0; i < 15; i++)
   {
       for(var j = 5; j < 6; j++)
       {
           var grass = new SpriteRenderable(this.spriteSheet);
           grass.setElementUVCoordinate(this.grassCoords[0], this.grassCoords[1], this.grassCoords[2], this.grassCoords[3]);
            
           this.tileMap.addTile(i, j, grass);
       }
   }
   
   
   for(var i = 0; i < 15; i++)
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

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    this.tileMap.draw(this.mCamera);
    //this.testRenderable.draw(this.mCamera);
    
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function ()
{
   
};
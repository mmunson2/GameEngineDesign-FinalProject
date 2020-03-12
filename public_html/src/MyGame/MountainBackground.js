/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function MountainBackground(xPos, yPos, width, height)
{ 
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    
    this.bgTexture = "assets/background/background.png";
    this.cloudTexture = "assets/background/clouds.png";
    this.mountains1Texture = "assets/background/mountains1.png";
    this.mountains2Texture = "assets/background/mountains2.png";
    this.trees1Texture = "assets/background/trees1.png";
    this.trees2Texture = "assets/background/trees2.png";
   
    this.xPosition = 0;
}

MountainBackground.prototype.setXPos = function (xPos) {this.xPos = xPos;};
MountainBackground.prototype.setYPos = function (yPos) {this.yPos = yPos;};
MountainBackground.prototype.setPosition = function(xPos, yPos) {this.xPos = xPos; this.yPos = yPos;};
MountainBackground.prototype.setWidth = function (width) {this.width = width;};
MountainBackground.prototype.setHeight = function (height) {this.height = height;};


MountainBackground.prototype.loadTextures = function ()
{
    gEngine.Textures.loadTexture(this.bgTexture);
    gEngine.Textures.loadTexture(this.cloudTexture);
    gEngine.Textures.loadTexture(this.mountains1Texture);
    gEngine.Textures.loadTexture(this.mountains2Texture);
    gEngine.Textures.loadTexture(this.trees1Texture);
    gEngine.Textures.loadTexture(this.trees2Texture); 
};

MountainBackground.prototype.initialize = function ()
{
    this.background = new SpriteRenderable(this.bgTexture);
    this.background.setElementUVCoordinate(0, 1919/2048, 0, 1);
    this.background.getXform().setPosition(0, 0);
    //Adding an offset so that lerp doesn't show
    this.background.getXform().setHeight(100 / 2 + 5);
    this.background.getXform().setWidth(100 + 5);
    
    
    this.cloud = new SpriteRenderable(this.cloudTexture);
    this.cloud.setElementUVCoordinate(0, 1919/2048, 0, 1); 
    this.cloud.getXform().setPosition(0,16);
    this.cloud.getXform().setHeight(100 / 2 + 5);
    this.cloud.getXform().setWidth(100 + 5);
    
    
    this.mountains1 = new SpriteRenderable(this.mountains1Texture);
    this.mountains1.setElementUVCoordinate(0, 1919/2048, 0, 1);
    this.mountains1.getXform().setPosition(0,16);
    this.mountains1.getXform().setHeight(100 / 2 + 5);
    this.mountains1.getXform().setWidth(200 / 2 + 5);
    
    this.mountains2 = new SpriteRenderable(this.mountains2Texture);
    this.mountains2.setElementUVCoordinate(0, 1919/2048, 0, 1);
    this.mountains2.getXform().setPosition(0,16);
    this.mountains2.getXform().setHeight(100 / 2 + 5);
    this.mountains2.getXform().setWidth(200 / 2 + 5);
    
    this.trees1 = new SpriteRenderable(this.trees1Texture);
    this.trees1.setElementUVCoordinate(0, 1919/2048, 0, 1);
    this.trees1.getXform().setPosition(0,13);
    this.trees1.getXform().setHeight(100 / 2 + 5);
    this.trees1.getXform().setWidth(200 / 2 + 5);
    
    this.trees2 = new SpriteRenderable(this.trees2Texture);
    this.trees2.setElementUVCoordinate(0, 1919/2048, 0, 1);
    this.trees2.getXform().setPosition(0,14);
    this.trees2.getXform().setHeight(100 / 2 + 5);
    this.trees2.getXform().setWidth(200 / 2 + 5);
    
    
    
};


MountainBackground.prototype.draw = function ( camera )
{
    this.background.draw(camera);
        
    this._wrapTexture(camera, this.cloud);    
        
    this._wrapTexture(camera, this.mountains2);   
    
    this._wrapTexture(camera, this.mountains1);
    
    this._wrapTexture(camera, this.trees2);
    
    this._wrapTexture(camera, this.trees1);
   
    
    
    
    
    //this._wrapTexture(camera, this.mountain);
    
    //this._wrapTexture(camera, this.mountains);
    
    //this._wrapTexture(camera, this.trees1);
    
    //this._wrapTexture(camera, this.trees2);
};

MountainBackground.prototype._wrapTexture = function (camera, renderable)
{
    renderable.draw(camera);
    
    var width = renderable.getXform().getWidth();
    var height = renderable.getXform().getHeight();
    
    var startX = renderable.getXform().getPosition()[0];
    var startY = renderable.getXform().getPosition()[1];
    
    var worldLeftBound = this.xPos - this.width / 2;
    var worldRightBound = this.xPos + this.width / 2;
    
    var currentX = startX;
    
    while(currentX - (width / 2) > worldLeftBound)
    {
        currentX -= width;
        
        renderable.getXform().setPosition(currentX, startY);
        
        renderable.draw(camera);
    }
    
    renderable.getXform().setPosition(startX, startY);
    
    currentX = startX;
    
    while(currentX + (width /2) < worldRightBound)
    {
        currentX += width;
        
        renderable.getXform().setPosition(currentX, startY);
        
        renderable.draw(camera);
    }
    
    renderable.getXform().setPosition(startX, startY);
};

MountainBackground.prototype.update = function (camera)
{
    this.setPosition(camera.getWCCenter()[0], camera.getWCCenter()[1]);
    
    this.background.getXform().setXPos(this.xPos);
    
    this.mountains2.getXform().setXPos(this.xPos / 1.05);
    
    this.mountains1.getXform().setXPos(this.xPos / 1.08);
    
    this.cloud.getXform().setXPos(this.xPos / 1.04);
    
    this.trees1.getXform().setXPos(this.xPos / 1.18);
    
    this.trees2.getXform().setXPos(this.xPos / 1.12);

    
    this.xPosition++;
};
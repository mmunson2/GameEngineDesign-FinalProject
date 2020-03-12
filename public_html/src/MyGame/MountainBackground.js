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
    this.background = new SpriteRenderable(bgTexture);
    
    this.background.setElementPixelPositions(0, 1920, 0, 1024);
       
    this.background.getXform().setPosition(0, 0);
    this.background.getXform().setHeight(200 / 1.333333);
    this.background.getXform().setWidth(200);
};


MountainBackground.prototype.draw = function ( camera )
{
    //this.background.draw(camera);
    
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
    
    var worldLeftBound = -200 / 2;
    var worldRightBound = 200 / 2;
    
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

MountainBackground.prototype.update = function ()
{
    //this.mountain.getXform().setPosition(-this.xPosition / 10 % 200, 0);
    
    //this.mountains.getXform().setPosition(-this.xPosition / 7 % 200, -30);
    
    //this.trees1.getXform().setPosition(-this.xPosition / 4 % 200, -40);
    
    //this.trees2.getXform().setPosition(-this.xPosition * 2 % 200, -24);
    
    this.xPosition++;
};
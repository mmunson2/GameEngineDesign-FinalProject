/******************************************************************************** 
 * CaveBackground.js
 * 
 * A parallax background with a cavernous feel
 * 
 * Art credit: JonathanPalmerGD and PWL
 * 
 ********************************************************************************/

/******************************************************************************** 
 * MountainBackground Constructor 
 * 
 ********************************************************************************/
function CaveBackground(xPos, yPos, width, height)
{ 
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    
    this.bgTexture = "assets/background/CaveBack.png";
    this.far = "assets/background/CaveFar.png";
    this.mid = "assets/background/CaveMid.png";
    this.front = "assets/background/CaveFront.png";
}

CaveBackground.prototype.setXPos = function (xPos) {this.xPos = xPos;};
CaveBackground.prototype.setYPos = function (yPos) {this.yPos = yPos;};
CaveBackground.prototype.setPosition = function(xPos, yPos) {this.xPos = xPos; this.yPos = yPos;};
CaveBackground.prototype.setWidth = function (width) {this.width = width;};
CaveBackground.prototype.setHeight = function (height) {this.height = height;};


/******************************************************************************** 
 * LoadTextures
 * 
 ********************************************************************************/
CaveBackground.prototype.loadTextures = function ()
{
    gEngine.Textures.loadTexture(this.bgTexture);
    gEngine.Textures.loadTexture(this.far);
    gEngine.Textures.loadTexture(this.mid);
    gEngine.Textures.loadTexture(this.front); 
};

/******************************************************************************** 
 * UnloadTextures
 * 
 ********************************************************************************/
CaveBackground.prototype.unloadTextures = function ()
{
    gEngine.Textures.unloadTexture(this.bgTexture);
    gEngine.Textures.unloadTexture(this.far);
    gEngine.Textures.unloadTexture(this.mid);
    gEngine.Textures.unloadTexture(this.front);
};

/******************************************************************************** 
 * Initialize
 * 
 ********************************************************************************/
CaveBackground.prototype.initialize = function ()
{
    this.background = new SpriteRenderable(this.bgTexture);
    this.background.setElementUVCoordinate(0, 799/1024, 0, 799/1024);
    this.background.getXform().setPosition(0, 0);
    //Adding an offset so that lerp doesn't show
    this.background.getXform().setHeight(100 / 2 + 5);
    this.background.getXform().setWidth(100 + 5);
    
    
    this.far = new SpriteRenderable(this.far);
    this.far.setElementUVCoordinate(0, 799/1024, 0, 799/1024); 
    this.far.getXform().setPosition(0,0);
    this.far.getXform().setHeight(100 / 2 + 5);
    this.far.getXform().setWidth(100 + 5);
    
    
    this.mid = new SpriteRenderable(this.mid);
    this.mid.setElementUVCoordinate(0, 799/1024, 0, 799/1024);
    this.mid.getXform().setPosition(0,0);
    this.mid.getXform().setHeight(100 / 2 + 5);
    this.mid.getXform().setWidth(200 / 2 + 5);
    
    this.front = new SpriteRenderable(this.front);
    this.front.setElementUVCoordinate(0, 799/1024, 0, 799/1024);
    this.front.getXform().setPosition(0,0);
    this.front.getXform().setHeight(100 / 2 + 5);
    this.front.getXform().setWidth(200 / 2 + 5);    
};

/******************************************************************************** 
 * Draw
 * 
 ********************************************************************************/
CaveBackground.prototype.draw = function ( camera )
{
    this.background.draw(camera);
        
    this._wrapTexture(camera, this.far);    
        
    this._wrapTexture(camera, this.mid);   
    
    this._wrapTexture(camera, this.front);
};

/******************************************************************************** 
 * _wrapTexture
 * 
 ********************************************************************************/
CaveBackground.prototype._wrapTexture = function (camera, renderable)
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

/******************************************************************************** 
 * update
 * 
 ********************************************************************************/
CaveBackground.prototype.update = function (xPos, yPos)
{
    this.setPosition(xPos, yPos);
    
    this.background.getXform().setPosition(this.xPos, this.yPos);
    
    this.far.getXform().setPosition(this.xPos / 1.12, this.yPos / 1.9 + 4);
    
    this.mid.getXform().setPosition(this.xPos / 1.16, this.yPos / 1.9 + 4);
    
    this.front.getXform().setPosition(this.xPos / 1.2, this.yPos / 1.9 + 6);
};
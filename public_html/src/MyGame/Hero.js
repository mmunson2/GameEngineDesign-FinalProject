/******************************************************************************** 
 * Hero Class
 ********************************************************************************/

// Camden

function Hero(spriteSheet)
{
    this.spriteSheet = spriteSheet;
    
    this.spriteRenderable = new SpriteRenderable(this.spriteSheet);
    this.spriteRenderable.setElementUVCoordinate(0, 122 / 1024, (512 - 509) / 512, (512 - 334) / 512);
    this.spriteRenderable.getXform().setPosition(-20, 0);
    this.spriteRenderable.getXform().setSize(9, 12);
    
    this.interpolateX = new Interpolate(0, 120, 0.5);
    this.interpolateY = new Interpolate(0, 120, 0.5);
    
    this.showBoundingBox = false;
    
    this.shaker = null;
}

Hero.prototype.getRenderable = function() {return this.spriteRenderable;};
Hero.prototype.isShaking = function() {return this.shaker !== null;};

Hero.prototype.draw = function (camera)
{
    this.spriteRenderable.draw(camera);    
};

Hero.prototype.setShowBound = function (showBound)
{
    this.showBoundingBox = showBound;
};

Hero.prototype.checkCollision = function (boxA, boxB)
{
    //  checking top
    if (boxA[0] <= boxB[0] && boxA[0] >= boxB[1] && (( boxA[2] >= boxB[2] && boxA[2] <= boxB[3] ) || ( boxA[3] >= boxB[2] && boxA[3] <= boxB[3] ))) return 0;
    
    //  checking bottom
    if (boxA[1] <= boxB[0] && boxA[1] >= boxB[1] && (( boxA[2] >= boxB[2] && boxA[2] <= boxB[3] ) || ( boxA[3] >= boxB[2] && boxA[3] <= boxB[3] ))) return 1;
    
    //  checking left
    if (boxA[2] >= boxB[2] && boxA[2] <= boxB[3] && (( boxA[0] <= boxB[0] && boxA[0] >= boxB[1] ) || ( boxA[1] <= boxB[0] && boxA[1] >= boxB[1] ))) return 2;
    
    //  checking right
    if (boxA[3] >= boxB[2] && boxA[3] <= boxB[3] && (( boxA[0] <= boxB[0] && boxA[0] >= boxB[1] ) || ( boxA[1] <= boxB[0] && boxA[1] >= boxB[1] ))) return 3;
    
    // checking if one surrounds the other
    if (boxA[0] >= boxB[0] && boxA[1] <= boxB[1] && (( boxA[2] >= boxB[2] && boxA[2] <= boxB[3] ) || ( boxA[3] >= boxB[2] && boxA[3] <= boxB[3] ))) return 4;
   
    return -1;
};




Hero.prototype.update = function (camera, collisionArray)
{
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q))
    {
        this.startShake();
    }
        
    if (this.shaker !== null && !this.shaker.shakeDone())
    {
        var result = this.shaker.getShakeResults();
        this.spriteRenderable.getXform().setSize(9 + result[0], 12 + result[0] * 1.333);
    }
    
    if (this.shaker !== null && this.shaker.shakeDone()) this.shaker = null;
    
    var targetX = (gEngine.Input.getMousePosX() / 1000) * 100 - 50 + camera.getWCCenter()[0];
    var targetY = (gEngine.Input.getMousePosY() / 500) * 50 - 25 + camera.getWCCenter()[1];
    
    if (!(targetY > 75))
    {
        this.interpolateX.setFinalValue(targetX);
        this.interpolateY.setFinalValue(targetY);
    }
     
    this.interpolateX.updateInterpolation();
    this.interpolateY.updateInterpolation();
    
    var collided = false;
    
    for(var i = 0; i < collisionArray.length ; i++)
    {
        var result = this.checkCollision(this.spriteRenderable.getBoundingBox(), collisionArray[i]);
       
        switch (result)
        {
            case 0: 
            case 1:    
                this.spriteRenderable.getXform().setXPos(this.interpolateX.getValue());
                collided = true;
                break;
                
            case 2: 
            case 3:
                this.spriteRenderable.getXform().setYPos(this.interpolateY.getValue());
                collided = true;
                break;
        }
        if(collided) break;    
    }
    
    if(!collided)
    {
        this.spriteRenderable.getXform().setPosition(this.interpolateX.getValue(), this.interpolateY.getValue());
    }
    
};

Hero.prototype.startShake = function()
{
    this.shaker = new ShakePosition(4.5, 6, 4, 60);
};

Hero.prototype.getHandPos = function()
{
    var x = this.spriteRenderable.getXform().getXPos();
    var y = this.spriteRenderable.getXform().getYPos();
    
    return [x + 4.5, y + 4];
};
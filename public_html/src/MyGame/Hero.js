/******************************************************************************** 
 * Hero Class
 ********************************************************************************/

// Camden

function Hero(spriteSheet)
{
    this.spriteSheet = spriteSheet;
    
    this.spriteRenderable = new SpriteRenderable(this.spriteSheet);
    this.spriteRenderable.setElementUVCoordinate(0, 122 / 1024, (512 - 509) / 512, (512 - 334) / 512);
    this.spriteRenderable.getXform().setPosition(0, 10);
    this.spriteRenderable.getXform().setSize(9, 12);
    
    this.interpolateX = new Interpolate(0, 120, 0.5);
    this.interpolateY = new Interpolate(0, 120, 0.5);
}

Hero.prototype.getRenderable = function() {return this.spriteRenderable;};

Hero.prototype.draw = function (camera)
{
    this.spriteRenderable.draw(camera);    
};

// top bot left right
Hero.prototype.collide = function (hero, tile)
{
    // top
    if (hero[0] >= tile[1] && hero[1] <= tile[1] && ((hero[2] >= tile[2] && hero[2] <= tile[3]) || (hero[3] >= tile[2] && hero[3] <= tile[3]) || (hero[2] <= tile[2] && hero[3] >= tile[3]))) return true;
    
    // bot
    if (hero[1] <= tile[0] && hero[0] >= tile[0] && ((hero[2] >= tile[2] && hero[2] <= tile[3]) || (hero[3] >= tile[2] && hero[3] <= tile[3]) || (hero[2] <= tile[2] && hero[3] >= tile[3]))) return true;
    
    // left
    if (hero[2] <= tile[3] && hero[3] >= tile[2] && ((hero[0] >= tile[1] && hero[1] <= tile[1]) || (hero[1] <= tile[0] && hero[0] >= tile[1]) || (hero[0] >= tile[0] && hero[1] <= tile[1]))) return true;
    
    // right
    if (hero[3] >= tile[2] && hero[2] <= tile[3] && ((hero[0] >= tile[1] && hero[1] <= tile[1]) || (hero[1] <= tile[0] && hero[0] >= tile[1]) || (hero[0] >= tile[0] && hero[1] <= tile[1]))) return true;
};

Hero.prototype.getBoundingBox = function()
{
    var xform = this.spriteRenderable.getXform();
    // top bot left right
    var bounds = [xform.getYPos() + xform.getHeight() / 2, 
                  xform.getYPos() - xform.getHeight() / 2,
                  xform.getXPos() - xform.getWidth() / 2,
                  xform.getXPos() + xform.getWidth() / 2];
    return bounds;
};

Hero.prototype.update = function (camera, collisionArray)
{
    var targetX = (gEngine.Input.getMousePosX() / 1000) * 100 - 50 + camera.getWCCenter()[0];
    var targetY = (gEngine.Input.getMousePosY() / 500) * 50 - 25 + camera.getWCCenter()[1];
    
    this.interpolateX.setFinalValue(targetX);
    this.interpolateY.setFinalValue(targetY);
    
    this.interpolateX.updateInterpolation();
    this.interpolateY.updateInterpolation();
    
    this.spriteRenderable.getXform().setPosition(this.interpolateX.getValue(), this.interpolateY.getValue());
    
    var collided = false;
    
    for(var i = 0; i < collisionArray.length ; i++)
    {
        if (this.collide(this.getBoundingBox(), collisionArray[i]))
        {
            this.spriteRenderable.setColor([1, 0, 0, 0.5]);
            collided = true;
        }
        
        if(collided) break;    
    }
    
    if (!collided) this.spriteRenderable.setColor([0,0,0,0]);
};
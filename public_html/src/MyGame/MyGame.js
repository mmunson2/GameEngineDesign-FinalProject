/******************************************************************************** 
 * MyGame.js
 * 
 * The Main function that starts Scene1, the code you seek is there!
 * 
 ********************************************************************************/
function MyGame()
{
    this.mCamera = null;
}

gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.initialize = function () 
{
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                   // width of camera
        [0, 0, 1800, 900]       // viewport (orgX, orgY, width, height)
    );
    gEngine.Core.startScene(new Scene3(this.mCamera));
};

MyGame.prototype.draw = function ()
{};

MyGame.prototype.update = function ()
{};


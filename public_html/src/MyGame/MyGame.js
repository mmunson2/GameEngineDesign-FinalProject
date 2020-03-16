function MyGame()
{}

gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.initialize = function () 
{
    gEngine.Core.startScene(new Scene1());
};

MyGame.prototype.draw = function ()
{};

MyGame.prototype.update = function ()
{};


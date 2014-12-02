
//Run by: 
//1. sudo npm install beefy browserify -g
//2. beefy index.js --live


var PIXI = require('pixi.js');
var userStorage = require('./userstorage.js');

var renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.view);

var interactive = true;
var stage = new PIXI.Stage(0x000000, true);

// set the mousedown and touchstart callback..
var x,y;
stage.mousedown = stage.touchstart = function(data){
    var localCoordsPosition = data.getLocalPosition(stage);
    x = localCoordsPosition.x;
    y = localCoordsPosition.y;
    console.log("Mouse/touch position at x: "+x + " y: " + y);
    addFlower();
}

function draw() {
  renderer.render(stage);
  requestAnimationFrame(draw);
}

replantFlowers();
draw();

function replantFlowers() {
    var flowers = userStorage.retrive(); //just tries to see if there are any flowers saved...
    var i, sprite,spriteTexture;
    if (flowers!=null) {
        for (i=0;i<flowers.length;i++) {
            var xx = flowers[i].x;
            var yy = flowers[i].y;
            spriteTexture = PIXI.Texture.fromImage('boli.svg');
            sprite = new PIXI.Sprite(spriteTexture);
            sprite.position.x = xx;
            sprite.position.y = yy;
            addSpriteInteraction(sprite);
            stage.addChild(sprite);
        }
    }
}
        
function addFlower() {  
    spriteTexture = PIXI.Texture.fromImage('boli.svg');
    sprite = new PIXI.Sprite(spriteTexture);
    var imgx = x - sprite.width / 2;
    var imgy = y - sprite.height /2;
    sprite.position.x = imgx;
    sprite.position.y = imgy;
    addSpriteInteraction(sprite);
    stage.addChild(sprite);
    userStorage.store(imgx,imgy);
    draw();    
};   

function addSpriteInteraction(sprite) {

    sprite.interactive = true;

    // set the mousedown and touchstart callback..
    sprite.mousedown = sprite.touchstart = function(data){
        
        // this line will get the mouse coords relative to the sprites..
        var localCoordsPosition = data.getLocalPosition(sprite);
        console.log("Sprite position at x: "+localCoordsPosition.x + " y: " + localCoordsPosition.y);
        var parentCoordsPosition = data.getLocalPosition(sprite.parent);
        console.log("Sprite position at x: "+parentCoordsPosition.x + " y: " + parentCoordsPosition.y);
    }
}

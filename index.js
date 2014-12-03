
//Run by: 
//1. sudo npm install beefy browserify -g
//2. beefy index.js --live

var PIXI = require('pixi.js');
var userStorage = require('./userstorage.js');
var renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.view);
var stage = new PIXI.Stage(0x000000, true);

//Globals...
var x,y;
var stagetimer;
var interactionTimeThreshold = 500; //after this amount of millis we skip adding new stuff and instead removes stuff... 
var spriteTexture = PIXI.Texture.fromImage('tree.png');

stage.mousedown = stage.touchstart = function(data){
    var localCoordsPosition = data.getLocalPosition(stage);
    x = localCoordsPosition.x;
    y = localCoordsPosition.y;
    stagetimer = new Date().getTime();
    //console.log("Mouse/touch position at x: "+x + " y: " + y);
}
stage.mouseup = stage.touchend = function(data){
    var difftime = new Date().getTime() - stagetimer;
    if (difftime < interactionTimeThreshold) { //else, see sprite interaction handling.
        addStuff();
    }
}

function draw() {
  renderer.render(stage);
  requestAnimationFrame(draw);
}

fetchAndDrawOldStuff();
draw();

/*
Get old stuff from local storage and display it
*/
function fetchAndDrawOldStuff() {
    var Stuffs = userStorage.retrive(); //just tries to see if there are any Stuffs saved...
    var i, sprite;
    if (Stuffs!=null) {
        for (i=0;i<Stuffs.length;i++) {
            var xx = Stuffs[i].x;
            var yy = Stuffs[i].y;
            sprite = new PIXI.Sprite(spriteTexture);
            sprite.position.x = xx;
            sprite.position.y = yy;
            addSpriteInteraction(sprite);
            stage.addChild(sprite);
        }
    }
}

/*
Add new stuff and store in local storage
*/        
function addStuff() {  
    sprite = new PIXI.Sprite(spriteTexture);
    var imgx = Math.round(x - sprite.width / 2); 
    var imgy = Math.round(y - sprite.height /2);
    sprite.position.x = imgx;
    sprite.position.y = imgy;
    addSpriteInteraction(sprite);
    stage.addChild(sprite);
    userStorage.store(imgx,imgy);
    draw();    
};   

/*
Handles sprite interaction
*/
function addSpriteInteraction(sprite) {

    sprite.interactive = true;
    sprite.timer;
    sprite.mousedown = sprite.touchstart = function(data){
        sprite.timer = new Date().getTime();
        console.log(sprite.timer);
    }
    sprite.mouseup = sprite.touchend = function(data){
        //var parentCoordsPosition = data.getLocalPosition(sprite.parent);
        var bounds =  sprite.getBounds();
        var difftime = new Date().getTime() - sprite.timer;
        console.log(difftime);
        if (difftime >= interactionTimeThreshold) {
            stage.removeChild(sprite);
            userStorage.removeOne(bounds.x,bounds.y);
        }
    }
}


var PIXI = require('pixi.js');
var renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.view);

var interactive = true;
var stage = new PIXI.Stage(0x000000, true);

var spriteTexture = PIXI.Texture.fromImage('boli.svg');
var sprite = new PIXI.Sprite(spriteTexture);

var spriteTextureDown = PIXI.Texture.fromImage('tree.png');

sprite.interactive = true;

// set the mousedown and touchstart callback..
sprite.mousedown = sprite.touchstart = function(data){
    
    this.isdown = true;
    this.setTexture(spriteTextureDown);
    this.alpha = 1;
    // this line will get the mouse coords relative to the sprites..
    var localCoordsPosition = data.getLocalPosition(sprite);
 
    // this line will get the mouse coords relative to the sprites parent..
    var parentCoordsPosition = data.getLocalPosition(sprite.parent);
	
    console.log("Parent position at x: "+parentCoordsPosition.x + " y: " + parentCoordsPosition.y);
    console.log("Sprite position at x: "+localCoordsPosition.x + " y: " + localCoordsPosition.y);
}
// set the mousedown and touchstart callback..
stage.mousedown = stage.touchstart = function(data){
   
    var localCoordsPosition = data.getLocalPosition(stage);
    console.log("Mouse/touch position at x: "+localCoordsPosition.x + " y: " + localCoordsPosition.y);
}


sprite.position.x = window.innerWidth / 2 - 150;
sprite.position.y = window.innerHeight / 2 - 150;

stage.addChild(sprite);

function draw() {
  renderer.render(stage);
  requestAnimationFrame(draw);
}

draw();

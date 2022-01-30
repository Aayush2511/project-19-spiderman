var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bow , arrow,  background, redB, pinkB, greenB ,blueB ,arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var fake
var score =0;
var restart , restartimg
var gameover,gameoverimg
var web, webmp

function preload(){
  
  backgroundImage = loadImage("scene5.jpg");
  
  arrowImage = loadImage("web.png");
  bowImage = loadImage("spiderman1.png");
  red_balloonImage = loadImage("pngwing.com.png");
  green_balloonImage = loadImage("electro.png");
  pink_balloonImage = loadImage("goblin.png");
  blue_balloonImage = loadImage("octopus.png");
  
  restartimg = loadImage("restart.png")
  gameoverimg= loadImage("gameover.png")

  webmp .loadSound("WebShoot.wav")
}



function setup() {
  createCanvas(1280, 550);
  
  //creating background
  scene = createSprite(0,0,1280,550);
  scene.addImage(backgroundImage);
  scene.scale = 1
  
  // creating bow to shoot arrow
  bow = createSprite(90,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 0.16;
  
  restart = createSprite(670,410,20,20)
    restart.addImage (restartimg);
    restart.scale = 0.05
    restart.visible = false

    gameover = createSprite(690,240);
    gameover.addImage(gameoverimg)
    gameover.scale = 0.4
    gameover.visible = false

  score = 0  
  redB= new Group();
  greenB= new Group();
  blueB= new Group();
  pinkB= new Group();
  arrowGroup= new Group();
 
  
}

function draw() {
 background(0);
 if(gameState === PLAY){
   

  // moving ground
    scene.velocityX = -(12+9*score/10)

    if (scene.x < 0){
      scene.x = scene.width/2;
    }
  
  //moving bow
  bow.y = World.mouseY
  
   // release arrow when space key is pressed
  if (keyDown("space")) {
  createArrow();
    
  }
  
  //creating continous enemies
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 50 == 0) {
    switch(select_balloon ){
      case 1: redBalloon();
      break;
      case 2:blueBalloon();
      break;
      case 3:pinkBalloon();
      break;
      case 4:greenBalloon();
      break;
      default:break;
    }
  }

  if(bow.isTouching(greenB)){
    bow.destroy()
    gameState=END
  }
  
  if(bow.isTouching(blueB)){
    bow.destroy()
    gameState=END
  }
  if(bow.isTouching(pinkB)){
    bow.destroy()
    gameState=END
  }
  
  
  
 if (arrowGroup.isTouching(greenB)) {
  greenB.destroyEach();
  arrowGroup.destroyEach();
  score=score+3;
}



  if (arrowGroup.isTouching(blueB)) {
   blueB.destroyEach();
   arrowGroup.destroyEach();
   score=score+2;
 }

 if (arrowGroup.isTouching(redB)) {
  redB.destroyEach()
  blueB.destroyEach()
  pinkB.destroyEach()
  greenB.destroyEach()
  gameState=END
  bow.destroy()
  arrowGroup.destroyEach()
  
  
}
 



if (arrowGroup.isTouching(pinkB)) {
  pinkB.destroyEach();
  arrowGroup.destroyEach();
  score=score+1;
}
 }
  
  drawSprites();
  textSize(24)
  stroke("blue")
  text("Score: "+ score, 1000,50);

  if (gameState === END) {
   
    bow.destroy();
    scene.velocityX = 0;
restart.visible = true;
gameover.visible = true;
 redB.destroyEach()
  blueB.destroyEach()
  pinkB.destroyEach()
  greenB.destroyEach()
  reset()
  
 }


  }


function redBalloon() {
  var red = createSprite(1280,Math.round(random(20, 550)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX =  -(12+9*score/10);
  red.lifetime = 1000;
  red.scale = 0.12;
  redB.add(red);
}


function reset(){
if(mousePressedOver(restart)){
  score = 0
  gameState = PLAY

  restart.visible = false;
  gameover.visible = false
  
}

}




function blueBalloon() {
  var blue = createSprite(1280,Math.round(random(20,  550)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX =  -(12+9*score/10);
  blue.lifetime = 1000;
  blue.scale = 0.3;
  blueB.add(blue);
}

function greenBalloon() {
  var green = createSprite(1280,Math.round(random(20,  550)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX =  -(12+9*score/10);
  green.lifetime = 1000;
  green.scale = 0.3;
  greenB.add(green);
}

function pinkBalloon() {
  var pink = createSprite(1280,Math.round(random(20,  550)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = -(12+9*score/10);
  pink.lifetime = 1000;
  pink.scale = 0.09
  pinkB.add(pink);
}


// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = bow.x+50;
  arrow.y=bow.y-22 ;
  arrow.velocityX = 11;
  arrow.lifetime = 1000;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
   
}

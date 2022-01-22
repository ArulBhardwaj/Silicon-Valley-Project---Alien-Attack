var score=0;

var spaceship,alien,alien2,ground,space,gameover,reset;

var spaceshipImg,alienImg,alien2Img,groundImg,spaceImg,gameoverImg,resetImg;

var laser,blast;
var laserImg,blastImg;

var alienGroup,alien2Group,laserGroup;

var life = 3;
var gameState=1;

function preload() {
  spaceshipImg=loadImage("spaceship.png");
  alienImg=loadImage("alien.png");
  alien2Img=loadImage("alien2.png");
  groundImg=loadImage("ground.png");
  laserImg=loadImage("laser.png");
  blastImg=loadImage("blast.png");
  spaceImg=loadImage("space.png");
  gameoverImg=loadImage("gameover.png");
  resetImg=loadImage("reset.png");
}
function setup() {
  createCanvas(1200,800);

  ground=createSprite(600,800,1200,50)
  ground.addImage(groundImg);
  ground.scale=4
  ground.visible = false;

  space = createSprite(600,400,100,100);
  space.addImage(spaceImg);
  space.scale = 6;
  space.velocityY=4;

  spaceship=createSprite(600,700,50,50);
  spaceship.addImage(spaceshipImg);

  gameover=createSprite(600,400,50,50);
  gameover.addImage(gameoverImg);
  gameover.scale=4;
  gameover.visible=false;

  reset=createSprite(1100,75,50,50);
  reset.addImage(resetImg);
  reset.scale=0.5;

  Scoreboard=createElement();
  LifeCount=createElement();

  laserGroup=createGroup();
  alienGroup=createGroup();
  alien2Group=createGroup();
}

function draw() {
  background(0); 

  LifeCount.html("Life:"+life);
  LifeCount.style('color:white');
  LifeCount.position(150,20);

  Scoreboard.html("Score:"+score);
  Scoreboard.style('color:white');
  Scoreboard.position(700,20);

  if(gameState===1) {
    spaceship.x=mouseX;

    if(space.y>500) {
      space.y=400;
    }
  
    if(frameCount%80===0) {
      spawnAlien();
    }

    if(frameCount%100===0) {
      spawnAlien2();
    }
    
    if(keyDown("space")) {
      shootLaser();
    }
    
    if(alienGroup.collide(ground)) {
      gameOver(alienGroup);
    }

    if(alien2Group.collide(ground)) {
      gameOver(alien2Group);
    }

    if(alienGroup.collide(laserGroup)) {
      AlienCollision(alienGroup);
    }

    if(alien2Group.collide(laserGroup)) {
      AlienCollision(alien2Group);
    }

    if(mousePressedOver(reset)) {
      resetGame();
    }

  drawSprites();
}
}

function spawnAlien() {
  alien=createSprite(random(200,1000),100,50,50);
  alien.addImage(alienImg);
  alien.scale=0.5;
  alien.velocityY=7;
  alien.lifetime=400;
  alien.velocityY = (6+3*score/5);
  alienGroup.add(alien);
}

function spawnAlien2() {
  alien2=createSprite(random(200,1000),100,50,50);
  alien2.addImage(alien2Img);
  alien2.scale=0.2;
  alien2.velocityY=7;
  alien2.lifetime=400;
  alien2.velocityY = (6 + 3*score/5);
  alien2Group.add(alien2);
}

function shootLaser() {
  laser=createSprite(spaceship.x,spaceship.y-100,50,50);
  laser.addImage(laserImg);
  laser.velocityY=-5;
  laserGroup.add(laser);
}

function AlienCollision() {
  if(life >0) {
    score=score+1;
  }

  blast=createSprite(laser.x,laser.y,50,50);
  blast.addImage(blastImg);
  blast.scale=0.7;
  blast.life=20;
  alienGroup.destroyEach();
  alien2Group.destroyEach();
  laserGroup.destroyEach();
}

function gameOver() {
  life=life-1;
  alienGroup.destroyEach();
  alien2Group.destroyEach();
  
  if(life===0) {
    gameState=2;
    gameover.visible=true;
    spaceship.visible=false;
  }
}

function resetGame() {
  location.reload();
}
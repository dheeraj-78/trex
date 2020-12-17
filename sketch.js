/*var trex , trex_image

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground,ground_image
var  cloudgroup 
var cloud_image
var cactusgroup
var cactus_image
var Invisible_Ground
function preload() {
 trex_image = loadAnimation("trex1.png","trex3.png","trex4.png");
 ground_image = loadImage("ground2.png");
 cloud_image = loadImage("cloud.png");
 cactus_image1 = loadImage("obstacle1.png");
cactus_image2 = loadImage("obstacle2.png");
cactus_image3 = loadImage("obstacle3.png");
cactus_image4 = loadImage("obstacle4.png");
cactus_image5 = loadImage("obstacle5.png");
cactus_image6 = loadImage("obstacle6.png");
}
function setup() { 
  createCanvas(1520,750);
trex = createSprite(200,657, 50, 70);
trex.addAnimation ("YEET",trex_image);
ground = createSprite(500,700,3000,17);
ground.addImage("YEET2",ground_image);
cloudgroup = new Group();
cactusgroup = new Group();
Invisible_Ground = createSprite(500,710,3000,10);
Invisible_Ground.visible= false;
ground.x = ground.width/2
}
function draw() {
  background("white"); 
  console.log(ground.x);
  ground.velocityX =- 8;
  if (ground.x>150) {
   ground.x = ground.width/2
  }
  Clouds();
  cactus();
  if((keyDown("space")||keyDown("up"))&&trex.y>340){
    trex.velocityY= -12;}
    trex.velocityY= trex.velocityY+0.9;
    trex.collide(Invisible_Ground);
  drawSprites();
}
function Clouds (){
  if (frameCount%50==0) {
  var Cloud ;
  Cloud = createSprite(1500, 59, 20, 10);
Cloud.addImage("YEET3",cloud_image);
  cloudgroup.add (Cloud);
  Cloud.velocityX= -5;
  Cloud.y= Math.round(random(20,160));
  Cloud.lifetime= 304;
  }
}
function cactus (){
 if (frameCount%200==0) {
   var cactus;
   cactus = createSprite(1500,664,50,10)
  cactusgroup.add (cactus);
  cactus.velocityX = -5
 var r = Math.round(random(1,6))
  switch(r){case 1:
    cactus.addImage("Arjit4",cactus_image6);
     break;
  case 2:
    cactus.addImage("Arjit5",cactus_image1);
     break;
  case 3:
    cactus.addImage("Arjit6",cactus_image2);
     break;
  case 4:
    cactus.addImage("Arjit7",cactus_image3);
     break;
  case 5:
    cactus.addImage("Arjit8",cactus_image4);
     break;
  case 6:
    cactus.addImage("Arjit9",cactus_image5);
     break;
 }
 cactus.lifetime=304;
}
}
*/
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  trex.setCollider  ("rectangle",0,0,600,30)
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
       // gameState = END;
       trex.velocityY = -12
    }
  }

  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}


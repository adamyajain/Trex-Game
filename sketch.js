var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex,trexDraw,trexc;
var ground,groundImage;
var invisibleGround;
var cloudGroup,cloudImage;
var ob1,ob2,ob3,ob4,ob5,ob6,obstaclesGroup;
var count;
var restart,gameOver;

 
function preload(){
trexDraw = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  
  cloudImage = loadImage("cloud.png");
  
  gameOver1 = loadImage("gameOver.png");
  
  restart1 = loadImage("restart.png");
  trexc=loadAnimation("trex_collided.png");
  
}
function setup() {
  createCanvas(600, 200);
  trex = createSprite(60,165,10,10);
  trex.addAnimation("trex",trexDraw);
  //trex.addAnimation("trex",trexc);
  
  trex.scale = 0.5;
  
  ground = createSprite(300,175,600,2);
  ground.addImage("ground",groundImage);
  
  invisibleGround = createSprite(300,175,600,2);
  invisibleGround.visible = false;
  
  count = 0;
  
   gameOver = createSprite(300,100,100,100);
  gameOver.addImage("gameOver",gameOver1);
  gameOver.visible  = false;
  
  restart = createSprite(350,100,20,20);
  restart.addImage("restart",restart1);
  restart.visible = false;
  
  
  cloudGroup = new Group();
  obstaclesGroup = new Group();
  
}

function draw() {
  background("blue");
  textSize(20);
  fill("orange");
  text("SCORE:"+count,50,20);
  console.log(trex.y);
  trex.collide(invisibleGround);
  
  if(gameState === PLAY){
    count = count + Math.round(getFrameRate()/60);
   if(keyDown("space")&&trex.y>149){
   trex.velocityY = -15;   
}
    
    trex.velocityY = trex.velocityY + 1;
    
  ground.velocityX = -2;
    
  if(ground.x<0){
    ground.x = ground.width/2;
  }

    spawnClouds();
  spawnObstacles(); 
    
    if(obstaclesGroup.isTouching(trex)){
    gameState = END;
  }
}
  else if(gameState === END){
  gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.addAnimation("trex",trexc);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
     
   if(mousePressedOver(restart)) {
    reset();
  }
    
  }
   
  drawSprites();
}
  

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.addAnimation("trex",trexDraw);
  
  count = 0;
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 205;
     cloudGroup.add(cloud);
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1 : obstacle.addImage(ob1);
      break;
      case 2 : obstacle.addImage(ob2);
      break;
      case 3 : obstacle.addImage(ob3);
      break;
      case 4 : obstacle.addImage(ob4);
      break;
      case 5 : obstacle.addImage(ob5);
      break;
      case 6 : obstacle.addImage(ob6);
      break;
      default:break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
     obstaclesGroup.add(obstacle);
  }
}
  

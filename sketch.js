var background,backgroundImg;
var boy,boyImg;
var girl,girlImg;
var scoreboard,scoreboardImg;
var ball,ballImg;
var score1=0;
var score2=0;
var team,teamImg;
var gameover,gameoverImg;
var reset,resetImg;
var PLAY=1
var END=0
var gameState=PLAY;

function preload(){
backgroundImg =loadImage("background2.png");
boyImg =loadImage("boy.png");
girlImg =loadImage("girl.png");
scoreboardImg =loadImage("score.PNG");
ballImg =loadImage("ball.png");
teamImg =loadImage("team.png");
gameoverImg =loadImage("gameover.png");
hitsound =loadSound("hit.wav");
resetImg =loadImage("reset.png");
}

function setup(){
canvas = createCanvas(displayWidth,displayHeight)
 backgroundsprite = createSprite(700,380,20,20)
 backgroundsprite.addImage(backgroundImg)
 backgroundsprite.scale=1.3
 
 boysprite=createSprite(700,70,10,10)
 boysprite.addImage(boyImg)
 boysprite.scale=0.6

 girlsprite=createSprite(700,530,50,50)
 girlsprite.addImage(girlImg)
 girlsprite.scale=2.0

 ball=createSprite(700,280,10,10)
 ball.addImage(ballImg)
 ball.scale=0.06

 scoreboard=createSprite(1100,50,10,10)
 scoreboard.addImage(scoreboardImg)

 team=createSprite(1100,100,10,10)
 team.addImage(teamImg)

 gameoversprite=createSprite(displayWidth/2-100,displayHeight/2)
 gameoversprite.addImage(gameoverImg)
 gameoversprite.visible=false

 reset=createSprite(displayWidth/2+400,displayHeight/2+50)
 reset.addImage(resetImg)
 reset.visible=false
 reset.scale=0.5
}

function draw(){
background("white")

if(gameState===PLAY){
   if(keyDown("space")){
      ball.velocityX=Math.round(random(2,5))
      ball.velocityY=Math.round(random(5,8))
   }
   
   if(keyDown("left")){
      girlsprite.x=girlsprite.x-5
   }
   
   if(keyDown("right")){
       girlsprite.x=girlsprite.x+5
   }
    
   boysprite.x=ball.x
   console.log(ball.x)
   
   if(ball.x>990||ball.x<300){
      boysprite.x=700;
      boysprite.y=70;
      ball.x=700;
      ball.y=280;
   }
   
   if(ball.isTouching(girlsprite)){
      ball.bounceOff(girlsprite)
      score2=score2+1
      hitsound.play();
   }
   
   if(ball.isTouching(boysprite)){
      ball.bounceOff(boysprite)
      score1=score1+1
      hitsound.play();
   }
   
   if(score1>5||score2>5){
      girlsprite.destroy();
      boysprite.destroy();
      ball.destroy();
      gameoversprite.visible=true
      backgroundsprite.visible=false
      reset.visible=true
      hitsound.stop();
   }
}


   

   
if(mousePressedOver(reset)){
   restart();
}

drawSprites();
textSize(25)
fill("black")
text(score1,1050,150)
text(score2,1150,150)
}

function restart(){
gameState=PLAY
score1=0;
score2=0;
gameoversprite.destroy();
reset.destroy();
backgroundsprite.visible=true
girlsprite.visible=true
boysprite.visible=true
ball.visible=true

}

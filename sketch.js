var boy,boyimg,scene,sceneimg
var score=0
var bite=0
var gamestate="play"
function preload(){
	sceneimg=loadImage("source.gif")
	boyimg=loadImage("boy2.png")
	coinimg=loadImage("coin2.png")
	sharkimg=loadImage("shark.png")
	gameoverImage=loadImage("gameover.jpg")
	restartImg=loadImage("restart.png")
}
function setup(){
	createCanvas(windowWidth-30,windowHeight)
	scene=createSprite(windowWidth/2,windowHeight/2,windowWidth,1000)
	scene.addImage(sceneimg)
	scene.scale=3.2

	boy=createSprite(200,200)
	boy.addImage(boyimg)
    boy.scale=0.3
	//boy.debug=true
    boy.setCollider("rectangle",0,0,500,700)
	

	coingroup=new Group()

	sharkgroup=new Group()
	gameover= createSprite(790,310,20,20)
	gameover.addImage(gameoverImage)
	restart= createSprite(800,550,20,20)
	restart.addImage(restartImg)
	gameover.scale= 1.9
	restart.scale= 0.6
}
function draw(){
	background("lightblue")
	if(gamestate==="play"){
		restart.visible=false
		gameover.visible=false
    boy.x=mouseX
	boy.y=mouseY
	makecoins()	
	makeshark()
	if(sharkgroup.isTouching(boy)){
		gamestate="end"
		boy.visible=false
		score=0
		coingroup.setVelocityEach(0)
		coingroup.destroyEach()
		sharkgroup.destroyEach()
	}

	}
	
    drawSprites()
    fill("darkblue")
	textSize(30)
	text("SCORE-"+score,600,50)

	if(gamestate==="end"){
	//	fill("red")
	//	textSize(30)
		//text("GAME OVER",600,350)
		restart.visible=true
		gameover.visible=true
	}

	if(mousePressedOver(restart)){
		gamestate="play"
		score=0
		restart.visible=false
		gameover.visible=false
        boy.visible=true
	}

}




function makecoins(){
	if(frameCount % 60===0){
	var coin3=createSprite(Math.round(random(10,1000)),Math.round(random(10,1000)),50,50)
//	coin3.debug=true
	coin3.addImage(coinimg)
	coin3.velocityX=10
	coin3.scale=0.2
	coin3.lifetime=100
	coin3.setCollider("rectangle",0,0,550,650)
	coingroup.add(coin3)
	

	for (var i = 0; i < coingroup.length; i++) {
		if (coingroup.get(i).isTouching(boy)) {
			coingroup.get(i).destroy();
			score=score+2
		}
	}

	}
}
function makeshark(){
	if(frameCount % 160===0){
	var shark=createSprite(Math.round(random(100,1000)),Math.round(random(100,1000)),50,50)
	//shark.debug=true
	shark.addImage(sharkimg)
	shark.velocityX=7
	shark.scale=0.5
	shark.lifetime=200
	sharkgroup.add(shark)
	shark.setCollider("rectangle",0,0,150,150)

//	for (var i = 0; i < sharkgroup.length; i++) {
	//	if (sharkgroup.get(i).isTouching(boy)) {
		//	sharkgroup.get(i).destroy();
		//	bite=bite+2
	//	}
//	}

	}
}
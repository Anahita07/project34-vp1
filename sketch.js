//Create variables here
var dog, dogIMG, dogImg1;
var database;
var foodStock,foodS;

function preload()
{
  dogIMG = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();  
  createCanvas(500,500);   

    dog = createSprite(100, 200, 10,10);
    dog.addImage(dogIMG);
    dog.scale = 0.2;

    foodStock = database.ref('food');
    foodStock.on("value", readStock);
    textSize(20);
}

function draw() {  
    background(52,235,119);

   if(keyWentDown(UP_ARROW)){

      writeStock(foodS);
      dog.addImage(dogImg1);

   }
   
    drawSprites();
  
    //add styles here
    fill(6,7,56);
    stroke("black");
    text("Food Remaining : " + foodS,170,200);
    textSize(20);
    text("NOTE : Press UP arrow key to feed Archie milk!" ,50,100);
    
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
  x=x-1;    
  }

  database.ref('/').update({ 
    food : x
  })
}

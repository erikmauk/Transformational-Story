var locFly, locTad, dirTad, locFrog, frogFill;
var animate = false;
var rain;
var flyRWingR, flyLWingR, frogLRot, frogRRot;
var leftWingDown = false;
var rightWingDown = false;
var eatFly = false;
var growTongue = false;
var shrinkTongue = false;
var tadDone = false;
var toungeX, toungeY;

function setup()
{
   createCanvas(600, 400);
   locFly = createVector(2*width/3, height/4);
   
   locTad = createVector(width/3, 3*height/4);
   dirTad = createVector(1, 0);

   locFrog = createVector(5*width/6, 3*height/4);


   // start a new particle system
   rain = new PSys(300, 0, 150, 1);

   flyLWingR = PI/4;
   flyRWingR = -PI/4;

   frogLRot = -PI/5;
   frogRRot = PI/5;
   frogFill = color(50,150,30);

   toungeX = -5;
   toungeY = -5;

}

function draw()
{
   //background and setting elements
   background(83, 49, 22);
   fill(117, 148, 134, 150);
   rect(0, .45*height, width, height);
   for(var i = 0; i < 12; i++)
   {
      fill(83, 49, 22);
      ellipse(i*60, .45*height, 80);
   }
   noStroke();
   drawLilyPad(80, 300, 1.2, PI/3);
   drawLilyPad(330, 340, 1.35, -PI/8);
   drawLilyPad(520, 310, 1, -2*PI/3)
   
   if (locTad.x < 509){
      drawTadpole();
   }
   

   

   if (animate) 
   {
      animateFly();
      moveTadpole();
      rain.run();
      
      if (locTad.x == 510 && !tadDone){
         dirTad = 0;
         growTongue = true;
         shrinkTongue = false;
         tadDone = true;
      }

      if (tadDone) {
         drawFrog();
      }

      if (growTongue){
         push();
            stroke(255, 122, 215);
            strokeWeight(2);
            translate(locFrog.x, locFrog.y+20)
            line(0, 0, toungeX, toungeY);

               toungeX -= 4.3;

               toungeY -= 10;

            if (toungeY < -220){
               eatFly = true;
               growTongue = false;
            }
         pop();
      }


      if (eatFly){
         push();
            stroke(255, 122, 215);
            strokeWeight(2);
            translate(locFrog.x, locFrog.y+20);
            line(0, 0, toungeX, toungeY);


               toungeX += 4.3;               

               toungeY += 10; 


            if (toungeY > -5){
               eatFly = false;
            }

            locFly.x += 4.3
            locFly.y += 10


         pop();
      }
   }

   if (locFly.y < 300){
      drawFly();
   }
}


function mousePressed()
{
   animate = !animate;
}

function drawLilyPad(x, y, sc, rot)
{
   push();
      translate(x, y);
      scale(sc);
      rotate(rot);
      fill(63, 144, 3);
      arc(0, 0, 40, 40, 3*PI/4, PI/4);
   pop();
}


function Particle(x , y)
{

   this.accelY = 0.05; //gravity

   this.velY = random(.5, 1.3);

   this.maxVelY = 5;

 

   this.pcolorB = random(255);

   this.locX = x;

   this.locY = y;

   this.r = 8.0;

   this.life = 100;

 

   // a function to update the particle each frame

   this.updateP = function()

   {

      if (this.velY < this.maxVelY)

      {

         this.velY += this.accelY;        

      }

 

 

      this.locY += this.velY;

      this.life -= 1.0;

 

 

   };

 

   // function to draw a particle

   this.renderP = function()
   {

      noStroke();

      push();

         fill(0, 0, this.pcolorB, 100);

         translate(this.locX, this.locY);

         ellipse(0, 0, this.r/3, this.r);

      pop();
   };
} //end of particle object definition

 
// define a group of particles as a particleSys

function PSys(sX, sY, num, spawnRate)
{

   this.maxP = num;

   this.numP = 0;

   // the data - lots of particles

   this.particles = [];

   this.spawnRate = spawnRate;

 

 

   // function defining what to do each frame

   this.run = function()

   {

      for (var i=0; i < this.particles.length; i++)

      {

         //update each particle per frame

         this.particles[i].updateP();

         this.particles[i].renderP();

         if (this.particles[i].locY > height)

         {

            this.particles[i].locX = random(width);

            this.particles[i].locY = sY;

         }
      }

      if (this.numP < this.maxP)
      {
         this.spawn(min(this.spawnRate, this.maxP-this.numP));
      }
   }

   this.spawn = function(num_to_spawn)
   {
      for (var i=0; i < num_to_spawn; i++)
      {

         this.particles.push(new Particle(random(width), sY));

      }
      this.numP += num_to_spawn;
   }
}

 
function drawFly()
{
   push();
      translate(locFly.x,locFly.y);
      scale(.5);
      fill(255);
      stroke(0);
      strokeWeight(1);
      push();
         rotate(flyLWingR);
         ellipse(-20,-7,20,10);
      pop();
      push();
         rotate(flyRWingR);
         ellipse(20,-7,20,10);
      pop();
      fill(0);
      noStroke();
      ellipse(0,0,30,28);
      fill(255);
      ellipse(-8,-3,7);
      fill(255,0,0);
      ellipse(-8,-3,3);
      noFill();
      stroke(0);
      strokeWeight(2);
      for(var i=0;i<4;i++)
      {
          arc(0+5*i,10,15,20,3*PI/4,PI);
      }
      arc(-9,-8,8,25,3*PI/2,7*PI/4);
      arc(9,-8,8,25,PI/2,3*PI/2);

   pop();
}
 

function drawTadpole(x,y)
{
   noStroke();
   push();
      translate(locTad.x, locTad.y);
      scale(.25);
      rotate(PI);
      fill(50,150,30);
       beginShape();
         vertex(20,5);
         bezierVertex(20,5,60,30,90,15);
         bezierVertex(90,15,125,20,130,5);
         bezierVertex(130,5,60,-30,10,-15);
      endShape(CLOSE);

      fill(30,130,20);
      beginShape();
         vertex(20,5);
         bezierVertex(20,5,60,15,90,10);
         bezierVertex(90,10,95,8,100,5);
         bezierVertex(100,5,60,-20,10,-5);
      endShape(CLOSE);

      ellipse(0,0,60);
      fill(255);
      ellipse(-22,-20,18);
      ellipse(-22,20,18);
      fill(0);
      ellipse(-22,-20,10);
      ellipse(-22,20,10);
     

   pop();
}


function animateFly()
{
   // find out how much the left wing is rotated to decide which way to rotate
   // these constrain how much the wing moves up and down
   if (flyLWingR > PI/4)
   {
      leftWingDown = false;
   }
   if (flyLWingR < 0)
   {
      leftWingDown = true;
   }
   
   // depending on which way we need to rotate, do so
   if (leftWingDown == false)
   {
      flyLWingR -= PI/10;
   }
   else
   {
      flyLWingR += PI/10; 
   }


   // find out how much the right leg is rotated to decide which way to rotate
   // these constrain how much the leg moves forward and backward
   if (flyRWingR < -PI/4)
   {
      rightWingDown = false;
   }
   if (flyRWingR > 0)
   {
      rightWingDown = true;
   }
   
   // depending on which way we need to rotate, do so
   if (rightWingDown == false)
   {
      flyRWingR += PI/10;
   }
   else
   {
      flyRWingR -= PI/10; 
   }
}

function moveTadpole()
{
   locTad.add(dirTad)
}

function drawFrog()
{  
   noStroke();
      push();
      translate(locFrog.x, locFrog.y);
      scale(.4);
      fill(frogFill);
   
      ellipse(0,40,170,190);
   
      arc(-25,10,85,190,PI,0);
      arc(25,10,85,190,PI,0);
      
      //eye z
      fill(255);
      ellipse(-26,-40,53);
      ellipse(26,-40,53); 
      fill(0);
      ellipse(-13,-35,20);
      ellipse(13,-35,20);
      fill(255);
      ellipse(-10,-40,5);
      ellipse(16,-40,5);
   
      //smile
      fill(50);
      arc(0,50,20,25,0,PI);
   
      //nose
      ellipse(-12,10,3,5);
      ellipse(12,10,3,5);
      
      //leg
      push();
         rotate(frogLRot);
         fill(frogFill);
         ellipse(-120,10,40,150);
      pop();

      push();
         rotate(frogRRot);
         fill(frogFill);
         ellipse(120,10,40,150);
      pop();
         fill(frogFill);
         ellipse(-75,136,60,15);
         ellipse(75,136,60,15);
   pop();
}





// constant varaible named canvas
// hold reference to canvas tag in html
const canvas = document.getElementById('canvas1');

// can pass WEBGL here instead of 2d
// getContext only works if called on a variable that refers to a canvas element 
// getContext holds refrence to CanvasRenderingContext2D which is a built in CANVAS 2D drawing object that has default properties we can change
// this object is now held in the ctx variable, which holds all of CANVAS settings and drawing methods
const ctx = canvas.getContext('2d');

// correct scaling when page loads
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// create empty array
// when for loop is run it will use particle class to add one new particle object into this array 
const particleArray = [];

//use let because value will be changing 
// HSL, hue saturation lightness
let hue = 0;

// when you resize browser window it stretches and distorts the drawing
// add an event listener to deal with browser window resizing 
window.addEventListener("resize", function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
            // canvas background is black so we set background to white for whatever we are drawing
  //ctx.fillStyle = 'white';
            // can see all the methods and drawings under prototype in dev tools on 
            // x,y,width,height -> x and y is where it is on page, width and height is size of rectage
  //ctx.fillRect(10, 20, 150, 50);

  
});

// store mouse x and y coordinates
const mouse = {
  x: null,
  y: null,
}

//take x and y coordinates when the mouse is clicked and assingn them to custome mouse object from above making it globally available
canvas.addEventListener('click', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
            // calls the drawCircle method when mouse is clicked 
  //drawCircle();

  // creates ten particles on mouse click and adds them to particle array
  for (let i = 0; i < 5; i++){
    particleArray.push(new Particle());
  }
});

// creates a simple paintbrush that draws a circle when mouse is moved
canvas.addEventListener("mousemove", function(event){
  mouse.x = event.x;
  mouse.y = event.y;
  //drawCircle();
  for (let i = 0; i < 5; i++){
    particleArray.push(new Particle());
  }
});


// each particle will be one circle
// class is a blueprint where we define properties and behaviors of objects 
class Particle{
  constructor(){
        // each particle will start at mouse position
    this.x = mouse.x;
    this.y = mouse.y;

    // each particle will have a random size between 1 and 16 pixels
    this.size = Math.random() * 15 + 1;
    // these speeds will create a vector and allow particles to move in random directions from mouse position
    // random number between 1.5 and -1.5
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    // HSL, hue saturation lightness -> way to declare colors like rgba or hex
    // particles now remember the color they were created with creating a rainbow effect
    this.color = 'hsl(' + hue + ', 100%, 50%)';
  }
  // change x and y coordinates based on speed x and speed y 
  // update the x and y coordinates of the circle particle to move it 
  update(){
    // 2D movement vector 
    this.x += this.speedX;
    this.y += this.speedY;

    // if particles are greater tahn this size then shrink them
    if(this.size > 0.2) {
      this.size -= 0.1;
    }
  }
  //take values like coordinate and size and draw a circle on canvas representing that particle 
  draw(){
          // change color of drawing to red
          // HSL, hue saturation lightness -> way to declare colors like rgba or hex
    ctx.fillStyle = this.color;

    // Outline the shape 
    //ctx.strokeStyle = "red";

    // lineWidth changes the outline thickness
    // ctx.lineWidth = 5;

    // with shapes you can just call them but for lines you have to call beginPath()
    // this is like telling javascript to put paintbrush on the canvas to start the drawing
    ctx.beginPath();

    // ARC is not only for circles but for curved lines and semi circles
    // with shapes you can just call them but for lines you have to call beginPath()
    // x and y coordinate on the browser page, radius, start angle, end angle for a circle
    // mouse.x and mouse.y allow the circle to be drawn where the mouse clicks
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    // fills the path with color
    ctx.fill();

    // shows the shape as outline only
    //ctx.stroke();
  }
}



function handleParticles(){
  for(let i = 0; i < particleArray.length; i++){
    particleArray[i].update();
    particleArray[i].draw();

   
    // constellation effect 
    //compare every particle within the array to every other particle in that same array
    // calculate the distance and if they are in certain rang ethen we drag a line from that particle to another
    for (let j = i; j < particleArray.length; j++) {
      // to calculate distance between two points in canvas use pythagorean theorem 
      const dx = particleArray[i].x - particleArray[j].x;
      const dy = particleArray[i].y - particleArray[j].y;
      // pythagorean theorem 
      const distance = Math.sqrt(dx * dx + dy * dy)
      //draw a line between the two particles if below 100 in distance
      if (distance < 100){
        ctx.beginPath();
        ctx.strokeStyle = particleArray[i].color;
        ctx.lineWidth = 0.3;
        ctx.moveTo(particleArray[i].x, particleArray[i].y);
        ctx.lineTo(particleArray[j].x, particleArray[j].y);
        ctx.stroke();
      }
    }

     // if particle is smaller than 0.3 then delete it 
     if(particleArray[i].size <= 0.3){
      particleArray.splice(i, 1);
      i--;
    }
  }
}

function animate(){
        // clears the entire canvas, no old paint left
  ctx.clearRect(0,0, canvas.width, canvas.height);

        // LEAVE TRAILS by leaving the old paint on the canvas
        // leaves a transparent rectangle over the canvas over and over again by using rgba to use opacity
  //ctx.fillStyle = 'rgba(0,0,0,0.02)';
  //ctx.fillRect(0, 0, canvas.width, canvas.height);

  handleParticles();

  // HSL, hue saturation lightness
  // change how fast the colors change
  hue+=0.75;

  // calls function as an argument
  // creates a loop meaning it will constantly clear the canvas
  requestAnimationFrame(animate);
}

animate();




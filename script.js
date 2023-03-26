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
});

// creates a simple paintbrush that draws a circle when mouse is moved
canvas.addEventListener("mousemove", function(event){
  mouse.x = event.x;
  mouse.y = event.y;
  //drawCircle();
});


// each particle will be one circle
// class is a blueprint where we define properties and behaviors of objects 
class Particle{
  constructor(){
              // each particle will start at mouse position
    //this.x = mouse.x;
    //this.y = mouse.y;

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    // each particle will have a random size between 1 and 6 pixels
    this.size = Math.random() * 5 + 1;
    // these speeds will create a vector and allow particles to move in random directions from mouse position
    // random number between 1.5 and -1.5
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }
  // change x and y coordinates based on speed x and speed y 
  // update the x and y coordinates of the circle particle to move it 
  update(){
    // 2D movement vector 
    this.x += this.speedX;
    this.y += this.speedY;
  }
  //take values like coordinate and size and draw a circle on canvas representing that particle 
  draw(){
          // change color of drawing to red
    ctx.fillStyle = "blue";

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
    ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);

    // fills the path with color
    ctx.fill();

    // shows the shape as outline only
    //ctx.stroke();
  }
}

// create particles
function init(){
  for (let i = 0; i < 100; i++){
    // PUSH puts whatever we pass to it and push it to the end of the array 
    particleArray.push(new Particle());
  }
}
init();

function handleParticles(){
  for(let i = 0; i < particleArray.length; i++){
    particleArray[i].update();
    particleArray[i].draw();
  }
}

function animate(){
  // clears the entire canvas
  ctx.clearRect(0,0, canvas.width, canvas.height);
  handleParticles();
  // calls function as an argument
  // creates a loop meaning it will constantly clear the canvas
  requestAnimationFrame(animate);
}

animate();




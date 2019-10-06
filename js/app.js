
//canvas set up
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');


// Circle circle dot dot

//class
class Sphere{
	constructor(x, y, velocityX, velocityY, radius){
		this.x = Math.random() * 700;
		this.y = Math.random() * 700;
		this.velocityX = (Math.random() - 0.5) * 5;
		this.velocityY = (Math.random() - 0.5) * 5;
		this.radius = 5;
	}

	draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = '#ff0000';
		ctx.fill();
	}

	velocity(){

		// adding one to the x value every time the function runs. This creates movement. This is the velocity.Created a conditional that will check to see if x is greater than the width of the canvas then it will change velocity, else if x is less than the canvas (0) then it will also change velocity. Did the same thing with the y axis as well 
		
		if(this.x + this.radius > 700 || this.x - this.radius < 0){
			// this will change the velocity from positive to negative, which will change it's direction on the x axis
			this.velocityX = -this.velocityX
		} 
		if(this.y + this.radius > 700 || this.y - this.radius < 0){
			//changing velocity here 
			this.velocityY = -this.velocityY
		}

		// this will create movement to the right 
		this.x += this.velocityX
		this.y += this.velocityY
		this.draw();
	}
}


// <-------------------------------------------->




// //Since the animate function will continuelly generate an image in the same location due to the hard coded x and y values, creating a variable so that number can change is what i did here


// //generated a random x value within the 700px width of the canvas
// let x = Math.random() * 700;
// //generated a random y value within the 700px height of the canvas
// let y = Math.random() * 700;
// //created a random velocity, either positive or negative depending on if it's going right or left
// let velocityX = (Math.random() -0.5) * 5; // subtract becuase the highest number you can get with Math.random is 1
// let velocityY = (Math.random() -0.5) * 5;

// let radius = 5;

//this function will be used to generate movement
	
const game ={

	numSpheres: [],

	create(){
		for(let i = 0; i < 50; i++){
			this.numSpheres.push(new Sphere)
		}
	}

	
}

function animate(){
		requestAnimationFrame(animate);
		//this will clear the canvas each time the function runs. 700 numbers are the total width and height of the canvas itself
		ctx.clearRect(0,0, 700, 700); 
		// sphere.speed()
			for(let i = 0; i < game.numSpheres.length; i++){
			game.numSpheres[i].velocity()
			}
		}
game.create()
console.log(game.numSpheres);
animate()
// ----------------------------------------
// EVENT LISTENERS

// document.getElementById('start-game').addEventListener('click', (event) => {
// 	game.generateSpheres()
// })
// document.getElementById('movement').addEventListener('click', (event) => {
// 	animate()
// })
// document.getElementById('start-over').addEventListener('click', (event) => {
// 	game.clearCanvas();
// })




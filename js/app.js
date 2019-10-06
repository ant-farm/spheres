
//canvas set up
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');


// Circle circle dot dot

//class
class Sphere{
	constructor(){
		this.speed = 5;
	}

}


// <-------------------------------------------->

//Since the animate function will continuelly generate an image in the same location due to the hard coded x and y values, creating a variable so that number can change is what i did here
let x = 200;
let y = 200;
let velocityX = 5;
let radius = 5;

//this function will be used to generate movement
function animate(){

	requestAnimationFrame(animate);
	//this will clear the canvas each time the function runs. 700 numbers are the total width and height of the canvas itself
	ctx.clearRect(0,0, 700, 700);
	//created a circle
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2);
	ctx.fillStyle = '#ff0000';
	ctx.fill();
	// adding one to the x value every time the function runs. This creates movement. This is the velocity.Created a conditional that will check to see if x is greater than the width of the canvas then it will change velocity, else if x is less than the canvas (0) then it will also change velocity 
	
	if(x + radius > 700 || x - radius < 0){
		// this will change the velocity from positive to negative, which will change it's direction on the x axis
		velocityX = -velocityX
	} 
	// } else if(x < 0){
	// 	velocityX = 
	// }

	// this will create movement to the right 
	x += velocityX
	
}
const game ={


}

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




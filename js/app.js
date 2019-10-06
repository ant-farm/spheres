
//canvas set up
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');


// Circle circle dot dot

//class
class Sphere{
	constructor(){

	}

}


// <-------------------------------------------->

//Since the animate function will continuelly generate an image in the same location due to the hard coded x and y values, creating a variable so that number can change is what i did here
let x = 200;
let y = 200;
//this function will be used to generate movement
function animate(){

	requestAnimationFrame(animate);

	//created a circle
	ctx.beginPath();
	ctx.arc(x, y, 5, 0, Math.PI * 2);
	ctx.fillStyle = '#ff0000';
	ctx.fill();
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




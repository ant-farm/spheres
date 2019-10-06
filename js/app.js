
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


//this function will be used to generate movement
function animate(){

	requestAnimationFrame(animate);

	//created a circle
	ctx.beginPath();
	ctx.arc(100,100, 5, 0, Math.PI * 2);
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




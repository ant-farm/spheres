
//canvas set up
const canvas = document.getElementById('my-canvas');
console.log(canvas) // cool now we have the canvas

// the "context" is what you actually draw on -- you basically always need it
const ctx = canvas.getContext('2d');
console.log(ctx); // cool, our rendering context is set up


//class
class Sphere {
	constructor(){
		this.x = Math.floor(Math.random() * 600),
		this.y = Math.floor(Math.random() * 600),
		this.radius = 5,
		this.color = '#cc5500',
		this.speed = 10
	}
	draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
		ctx.fillStyle = this.color
		ctx.fill()
	}
	move(){

	}
}

// <-------------------------------------------->

const game ={
	//created a function that will generates spheres
	generateSpheres(){
		for(let i = 0; i < 50; i++){
			let spheres = new Sphere
			spheres.draw()
		}
	},

	clearCanvas(){
		ctx.clearRect(0, 0, canvas.width, canvas.height)
	}
}



// ----------------------------------------
// EVENT LISTENERS

document.getElementById('start-game').addEventListener('click', (event) => {
	game.generateSpheres();
})
document.getElementById('start-over').addEventListener('click', (event) => {
	game.clearCanvas();
})



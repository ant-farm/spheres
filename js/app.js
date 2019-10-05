// class Sphere {
// 	constructor(color) {
// 		this.width = 15;
// 		this.height = 15;
// 		this.colorOptions = ["blue", "red", "yellow"];
// 		this.color = this.colorOptions[Math.floor(Math.random()*this.colorOptions.length)]
// 	}
	
// 	draw() {
// 		// let $sphere1 = $('.sphere1')
// 		// $sphere1.css({ 
// 		// 	'width':  'px',
// 		// 	'height': 'px', 
// 		// 	'background-color': '#cc5500',
// 		// 	'bottom': '50px'
// 		}
	

// 	update() {
// 		let $sphere1 = $('.sphere1')
// 		$sphere1.css({'bottom': '100px'})
// 		// this.top = 50;
// 		// this.left = 50;
// 	}
// }



// let game = {

// 	newSphere: null,

// 	spheres: [],

// 	start() {
// 		//when start is clicked 
// 		this.newSphere = new Sphere()
// 		let $container = $('#container')
// 		$('.container').append(this.newSphere)

		
// 	}




// 	// startMoving(){
// 	// 	let interval = setInterval(() => {
// 	// 		let $sphere = $('.sphere1')
// 	// 		// $sphere.animate({
// 	// 		// 	right: '5px',
// 	// 		// 	bottom: '5px'
// 	// 		// }500);
// 	// 	}, 500);
// 	// }
// }
// game.start()

// const sphere1 = new Sphere()
// // sphere1.draw();
// console.log(sphere1);

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
}

// <-------------------------------------------->

const game ={
	//created a function that will generate a sphere
	generateSpheres(){
		for(let i = 0; i < 50; i++){
			let spheres = new Sphere
			spheres.draw()
		}
	}
}



// ----------------------------------------
// EVENT LISTENERS

// ('.startGame').on('click', (event) => {
// 	generateSphere()
// })
document.getElementById('start-game').addEventListener('click', (event) => {
	game.generateSpheres();
})




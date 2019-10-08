
//canvas set up
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

//class
class Sphere{


	constructor(){
		this.colors = ['#0077cc', '#cc0077', '#cc5500', '#00cc55'];
		this.x = Math.random() * 700;
		this.y = Math.random() * 700;
		this.velocityX = (Math.random() - 0.5) * 5;
		this.velocityY = (Math.random() - 0.5) * 5;
		this.radius = 5;
		this.color = this.colors[Math.floor(Math.random() * this.colors.length)]

	}

	draw(){
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = this.color
		ctx.fill();
	}

	// make spheres move, bouncing off walls if necessary
	changeDirAndMove(){
		
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

class MainSphere{

	constructor(color){
		this.x = 200;
		this.y = 200;
		this.radius = 10;
		this.color = color; // use color instead
		this.speed = 5;
		this.direction = {
			up: false,
			down: false,
			right: false,
			left: false
		}
	}

	draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2)
		ctx.fillStyle = this.color;
		ctx.fill()
	}
	setDirection(key){
		if(key == "ArrowUp") this.direction.up = true;
	    if(key == "ArrowLeft") this.direction.left = true;
	    if(key == "ArrowDown") this.direction.down = true;
	    if(key == "ArrowRight") this.direction.right = true;
	}
	unsetDirection(key){
		if(key == 'ArrowUp') this.direction.up = false;
		if(key == 'ArrowDown') this.direction.down = false;
		if(key == 'ArrowLeft') this.direction.left = false;
		if(key == 'ArrowRight') this.direction.right = false;
	}

	move(direction){
		if(this.direction.up) this.y -= this.speed;
		if(this.direction.down) this.y += this.speed; 
		if(this.direction.right) this.x += this.speed;
		if(this.direction.left) this.x -= this.speed;
		
	}
	checkCollision(sphere){
		if(this.x + this.radius > sphere.x && this.x < sphere.x + sphere.radius && sphere.y < this.y + this.radius && sphere.y + sphere.radius > this.y) {
			console.log(game.user.color);
			console.log(game.numSpheres.color);
			// if(game.user.color === game.numSpheres[i].color)
			// if sphere is same color as me
				// game.points += 1
		
			// else
				// points--
				 	

			return true;
		}
		else return false;
	}
}


// <-------------------------------------------->



const game = {

	numSpheres: [],

	points: 0,

	user: null,



	create(color){
		let sphereMain = new MainSphere(color)
		this.user = sphereMain
		console.log(this.user);
		for(let i = 0; i < 10; i++){
			this.numSpheres.push(new Sphere())
		}
	}, 

	score(){
		$('.points').text('Points: ' + this.points)

	},

	checkForCollisions(numSpheres){	
		for(let i = 0; i < this.numSpheres.length; i++){
			if(this.user.checkCollision(this.numSpheres[i])){
				if(this.user.color === this.numSpheres[i].color){
					this.numSpheres.splice(i, 1)
					game.points += 1;
				// console.log('hitting');
			} else{
				console.log('gameover');
				}
			}
				
			// if(this.user.color === game.numSpheres[i].color){
			// 	console.log('h');
			// }

		}
	},

	moveSpheres(){
		for(let i = 0; i < this.numSpheres.length; i++){
			this.numSpheres[i].changeDirAndMove()
		}
	},

	clearCanvas() {
		ctx.clearRect(0,0,700, 700)
	}

	
}

console.log(game.user);
function animate(){


	game.user.move()
	game.clearCanvas()
	game.user.draw()
	game.moveSpheres()
	game.checkForCollisions()
	game.score()
	

	requestAnimationFrame(animate);
}


// ----------------------------------------
// EVENT LISTENERS

// $('#start-game').on('click', (event) => {

// })

$('.color1').on('click', (event) => {
	game.create('#0077cc')
	animate()
})

$('.color2').on('click', (event) => {
	game.create('#cc0077')
	animate()
})

$('.color3').on('click', (event) => {
	game.create('#cc5500')
	animate()
})

$('.color4').on('click', (event) => {
	game.create('#00cc55')
	animate()
})
$('button').on('keydown', (event) => {
	game.user.setDirection(event.key);
})
$('button').on('keyup', (event) => {
	game.user.unsetDirection(event.key);
})




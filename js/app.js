
//canvas set up
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

//class
class Sphere{

	constructor(){
		// let color = ['#0077cc', '#ccbb00', '#ff0000'];
		this.x = Math.random() * 700;
		this.y = Math.random() * 700;
		this.velocityX = (Math.random() - 0.5) * 5;
		this.velocityY = (Math.random() - 0.5) * 5;
		this.radius = 5;
		this.color = '#ff0000';
		// Math.floor(Math.random() * this.color.length)
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

	constructor(){
		this.x = 200;
		this.y = 200;
		this.radius = 10;
		this.color = 'black';
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
		ctx.fillStyle = 'black';
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
		if(this.x + this.radius > sphere.x && this.x < sphere.x + sphere.radius && sphere.y < this.y + this.radius && sphere.y + sphere.radius > this.y){
			console.log('collision');
			return true;
		}
		else return false;
	}
}


// <-------------------------------------------->




let sphereMain = new MainSphere()

const game = {

	numSpheres: [],

	create(){
		for(let i = 0; i < 5; i++){
			this.numSpheres.push(new Sphere())
		}
	}, 

	clearCanvas() {
		ctx.clearRect(0,0,700, 700)
	},

	// check collision on the numspheres array do a loop?
	checkForCollisions(){	
		for(let i = 0; i < this.numSpheres.length; i++){
			sphereMain.checkCollision(this.numSpheres[i])
			
		}
	},


	moveSpheres(){
		for(let i = 0; i < this.numSpheres.length; i++){
			this.numSpheres[i].changeDirAndMove()
		}
	}

	
}
// let x = 0
function animate(){


	ctx.clearRect(0,0, 700, 700); 
	sphereMain.draw()
	sphereMain.move()	
	game.moveSpheres()
	game.checkForCollisions()

	// x++
	// if(x === 10) {
	// 	return
	

	requestAnimationFrame(animate);
}


// ----------------------------------------
// EVENT LISTENERS

$('#start-game').on('click', (event) => {
	game.create()
	animate()
})

document.getElementById('clear').addEventListener('click', (event) => {
	game.clearCanvas()
})

document.getElementById('move').addEventListener('keydown', (event) => {
	sphereMain.setDirection(event.key);
})
document.getElementById('move').addEventListener('keyup', (event) => {
	sphereMain.unsetDirection(event.key);
})




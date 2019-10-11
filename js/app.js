
//canvas set up
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');



//class
class Sphere{

	// contructor for the random spheres
	constructor(){
		
		this.colors = ['#0077cc', '#cc0077', '#cc5500', '#00cc55'];
		this.x = Math.random() * 800;
		this.y = Math.random() * 700;
		this.velocityX = (Math.random() - 0.5) * 5;
		this.velocityY = (Math.random() - 0.5) * 5;
		this.radius = 5;
		this.color = this.colors[Math.floor(Math.random() * this.colors.length)]

	}
	// draw function, also added radial gradients here 
	draw(){
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = this.color
		ctx.fill();

		let grad = ctx.createRadialGradient(this.x, this.y, this.radius, this.x , this.y , 2)
		grad.addColorStop(0, this.color)
		grad.addColorStop(1, '#000')

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2)
		ctx.fillStyle = grad;
		ctx.fill()

	}

	// this created a 'bouncing' effect. Made the spheres stay within the walls of the canvas
	changeDirAndMove(){
		
		if(this.x + this.radius > 800 || this.x - this.radius < 0){
			// this will change the velocity from positive to negative, which will change it's direction on the x axis
			this.velocityX = -this.velocityX
		} 
		if(this.y + this.radius > 700 || this.y - this.radius < 0){
			//changing velocity here as well but for the y access
			this.velocityY = -this.velocityY
		}

		// this will create movement to the right by adding the velcity number onto the x and y axis
		this.x += this.velocityX
		this.y += this.velocityY
		this.draw();
	}
}

class MainSphere{
	//contructor for the mainsphere
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
		ctx.fillStyle = this.color
		ctx.fill();

		let grad = ctx.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, 7)
		grad.addColorStop(0, this.color)
		grad.addColorStop(1, '#000')

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2)
		ctx.fillStyle = grad;
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
	//	checking for collision with the random spheres
	checkCollision(sphere){
		if(this.x + this.radius > sphere.x && this.x < sphere.x + sphere.radius && sphere.y < this.y + this.radius && sphere.y + sphere.radius > this.y) {
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

	play: true,

	numLevels: 3,

	currentLevel: 1,

	time: 120,

	endGame: 0,


	//begins by creating the mainsphere and the random spheres
	create(color){
		let sphereMain = new MainSphere(color)
		this.user = sphereMain

		for(let i = 0; i < 15; i++){
			this.numSpheres.push(new Sphere())
		}
		this.startTimer()
	}, 
	//updates the dom's points and level
	score(){
		$('.points').text('Points: ' + this.points)
		$('.levels').text('Level: ' + this.currentLevel)
		
	},
	//this updates the dom's timer
	startTimer(){
		let $timer = $('.timer')
		let interval = setInterval (() => {
			if(this.time === this.endGame){
				// this.time = 0;
				clearInterval(interval);
			} else{
				this.time -= 1
			}

			$timer.text(`Timer: ${this.time}s`)
		}, 1000)
		this.gameOver();
	},
	//runs the check collision method from the main sphere class, and if a collision is dectected and the color of that sphere is the same color as the main sphere then a point will be added and the random sphere will be removed. Else the game is over
	checkForCollisions(numSpheres){	
		for(let i = 0; i < this.numSpheres.length; i++){
			if(this.user.checkCollision(this.numSpheres[i])){
				if(this.user.color === this.numSpheres[i].color){
					this.numSpheres.splice(i, 1)
					this.points += 1;

				} else{
					// this.points -= 1;
					this.play = false;
					this.gameOver()
				}
			}
		}
	},
	
	// see if user has gotten all the colors that match, return true if so
	checkRemaining(){
		let remainingSpheres = this.numSpheres;
		let value = this.user;
		// after the loop this will be false if there are still any 
		// balls matching user color
		let shouldEnd = true // should only be true if no same colored spheres
		for(let i = 0; i < remainingSpheres.length; i++) {
			// if this ball is blue for example
			if(remainingSpheres[i].color === value.color) {
				shouldEnd = false;
				// change flag to false -- because we found a blue one
			} 
		}
		if(shouldEnd === true){
			this.levelUp();
			this.currentLevel += 1
			console.log('level up ')
		}
		// if we didn't find any (i.e all blue gone and round should end)
		this.gameOver()
	},

	// displays a level up picture each time the user moves onto a new level
	levelUp(){
	
		for(let i = 0; i < 15; i++){
			this.numSpheres.push(new Sphere())
		}
			$('.level').css('display','inline').fadeIn(2000).fadeOut(2000)
			this.startTimer()
	},

	gameOver(){
		if(this.points < 0){
			$('#hidden').css('display', 'block').fadeIn(900).fadeOut(900)
			$('canvas').css('height', '0')
			$('.stats').css('display','none')
			$('#clear-button').css('display','inline')
			$('.color-buttons').css('display','none')
			this.clearCanvas()
			console.log('gameover');
		} else if(this.currentLevel > this.numLevels){
			$('.hidden-winner').css('display', 'inline-block').fadeIn(2000).fadeOut(2000);
			$('.level').css('display','none')
			$('canvas').css('height', '0')
			$('.stats').css('display','none')
			$('#clear-button').css('display','inline')
			$('.color-buttons').css('display','none')
			console.log('You won!')
			this.clearCanvas()
		} else if(this.play === false){
			$('#hidden').css('display', 'block').fadeIn(900).fadeOut(900)
			$('canvas').css('height', '0')
			$('.stats').css('display','none')
			$('#clear-button').css('display','inline')
			$('.color-buttons').css('display','none')
			console.log('You lost!')
			this.clearCanvas()
		} else if(this.time === this.endGame){
			$('#hidden').css('display', 'block').fadeIn(900).fadeOut(900)
			$('canvas').css('height', '0')
			$('.stats').css('display','none')
			$('#clear-button').css('display','inline')
			$('.color-buttons').css('display', 'none')
			console.log('you lost')
		}
	},
	// calls the changeDirAndMove method on the spheres class
	moveSpheres(){
		for(let i = 0; i < this.numSpheres.length; i++){
			this.numSpheres[i].changeDirAndMove()
		}
	},
	//clears the canvas
	clearCanvas() {
		ctx.clearRect(0,0,800, 700)
	}

	
}



function animate(){


	game.user.move()
	game.clearCanvas()
	game.user.draw()
	game.moveSpheres()
	game.checkForCollisions()
	game.checkRemaining()
	game.score()
	

	requestAnimationFrame(animate);
}

// ----------------------------------------
// EVENT LISTENERS

$('.clear-button').on('click', (event) => {
	
})

$('.color1').on('click', (event) => {
	$('.stats').css('display','inline')
	$('.color-buttons').css('bottom','0')
	$('.logo').css('display','none');
	$('.logo-text').css('display','none')
	game.create('#0077cc')
	animate()
})

$('.color2').on('click', (event) => {
	$('.stats').css('display','inline')
	$('.color-buttons').css('bottom','0')
	$('.logo').css('display','none');
	$('.logo-text').css('display','none')
	game.create('#cc0077')
	animate()
})

$('.color3').on('click', (event) => {
	$('.stats').css('display','inline')
	$('.color-buttons').css('bottom','0')
	$('.logo').css('display','none');
	$('.logo-text').css('display','none')
	game.create('#cc5500')
	animate()
})

$('.color4').on('click', (event) => {
	$('.stats').css('display','inline')
	$('.color-buttons').css('bottom','0')
	$('.logo').css('display','none');
	$('.logo-text').css('display','none')
	game.create('#00cc55')
	animate()
})


$('button').on('keydown', (event) => {
	game.user.setDirection(event.key);
})
$('button').on('keyup', (event) => {
	game.user.unsetDirection(event.key);
})




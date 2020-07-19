let currentFps = 0

const particlesStartAmount = 85
// const particlesStartAmount = Math.max(Math.floor((windowWidth + windowHeight) / 25), 50)

const controller = new ParticlesController({
	id: 0,
	particlesStartAmount,
	createConnectionRange: 300,
	min_velocity_x: 1,
	min_velocity_y: 1,
	max_velocity_x: 1,
	max_velocity_y: 1,
	theme: THEMES['black-red-white'],
	circleSize: 10
})

function setup() {
	createCanvas(windowWidth, windowHeight)
	frameRate(60)

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	controller.handleFrame()

	if (!IS_DEV)
		return

	// draw x, y of the rand particle in the particles array
	strokeWeight(1)

	textAlign(LEFT);
	textSize(30)
	fill(255)
	text(
		`x: ${controller.randParticle.pos.x.toFixed(0)}\ny: ${controller.randParticle.pos.y.toFixed(0)}`,
		windowWidth/2-50,
		windowHeight/2-100
	)

	// draw fps

	// skip 5 frames
	if (frameCount % 5 === 0) {
		currentFps = frameRate()
	}
	textSize(15)
	fill(255)
	stroke(0)
	text("FPS: " + currentFps.toFixed(0), 10, windowHeight - 10)
}

const mainText = document.querySelector('.main-text')
mainText.addEventListener('click', () => {
	// mainText.classList.add('unvisible')
})

document.addEventListener('click', () => {
	// !mainText.classList.toggle('unvisible')
})
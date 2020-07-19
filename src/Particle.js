class Particle {
	constructor({ pos, vel, size, dir, color, connectionLineColor, connectionLineWeight, createConnectionRange }) {
		this.pos = pos
		this.vel = vel
		this.dir = dir
		this.size = size
		this.color = color
		this.connectionLineWeight = connectionLineWeight
		this.connectionLineColor = connectionLineColor
		this.createConnectionRange = createConnectionRange
	}

	update() {
		this.move()
		this.edges()
	}

	move() {
		this.pos.add(
			p5.Vector.mult(this.dir, this.vel.mag())
		)
	}

	draw() {
		stroke(this.circleBorderColor)
		strokeWeight(this.circleBorderWeight)
		fill(this.color)
		circle(this.pos.x, this.pos.y, this.size)
	}

	edges() {
		if (this.pos.x < 0 + this.size / 2 || this.pos.x > windowWidth - this.size / 2) {
			this.dir.x *= -1
		}

		if (this.pos.y < 0 + this.size / 2 || this.pos.y > windowHeight - this.size / 2) {
			this.dir.y *= -1
		}
	}

	checkParticles(particles, startIndex = 0) {
		for (let i = startIndex; i < particles.length; i++) {
			const particle = particles[i]

			const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
	
			if (d > this.size && d < this.createConnectionRange) {
				const alpha = map(d, this.size, this.createConnectionRange, 75, 0)

				strokeWeight(this.connectionLineWeight)
				stroke(color(this.connectionLineColor.r, this.connectionLineColor.g, this.connectionLineColor.b, alpha))
				line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
			}
		}
	}
}
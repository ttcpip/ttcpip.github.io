class ParticlesController {
  constructor({
    id,
    particlesStartAmount,
    createConnectionRange,
    min_velocity_x, min_velocity_y,
    max_velocity_x, max_velocity_y,
    circleSize,
    theme
  }) {
    this.particles = []

    this.id = id
    this.createConnectionRange = createConnectionRange
    this.min_velocity_x = min_velocity_x
    this.min_velocity_y = min_velocity_y
    this.max_velocity_x = max_velocity_x
    this.max_velocity_y = max_velocity_y
    this.circleSize = circleSize
    this.theme = theme

    this.addParticles(particlesStartAmount)

    this.applyThemeAllParticles()

    console.log(`Particle controller #${this.id} initialized with ${this.particles.length} particles`)
  }

  getNewParticle() {
    return new Particle({
      // logic stuff
      pos: createVector(random(windowWidth), random(windowHeight)),
      vel: createVector(random(this.min_velocity_x, this.max_velocity_x), random(this.min_velocity_y, this.max_velocity_y)),
      dir: createVector(random(3, 100) * (Math.random() > .5 ? -1 : 1), random(3, 100) * (Math.random() > .5 ? -1 : 1)).normalize(),
      createConnectionRange: this.createConnectionRange,
      size: this.circleSize,
    })
  }

  applyThemeAllParticles() {
    for (let i = 0; i < this.particles.length; ++i) {
      this.setThemeByParticleIndex(this.theme, i)
    }
  }

  setThemeAllParticles(newTheme) {
    this.theme = newTheme
    this.applyThemeAllParticles()
  }

  setThemeByParticleIndex(theme, particleIndex) {
    this.particles[particleIndex].color = theme.circleColor 
    this.particles[particleIndex].connectionLineColor = theme.connectionLineColor 
    this.particles[particleIndex].connectionLineWeight = theme.connectionLineWeight
    this.particles[particleIndex].circleBorderColor = theme.circleBorderColor
    this.particles[particleIndex].circleBorderWeight = theme.circleBorderWeight
  }

  addParticles(amount) {
    for (let i = 0; i < amount; ++i) {
      const pushedElIndex = this.particles.push(this.getNewParticle()) - 1
      this.randParticle = this.particles[pushedElIndex]
    }
  }

  deleteParticles(amount) {
    for (let i = 0; i < amount; ++i) {
      this.particles.pop()
    }
  }

  handleParticle(particleIndex, startCheckIndex = 0) {
    if (IS_DEV && particleIndex === this.particles.length - 1) {
      this.setThemeByParticleIndex(THEMES['lastParticle'], particleIndex)
    }

    const particle = this.particles[particleIndex]

    particle.update()
    particle.checkParticles(this.particles, startCheckIndex)
    particle.draw()
  }

  handleFrame() {
    background(this.theme.backgroundColor)

    for (let i = 0; i < this.particles.length; ++i) {
      this.handleParticle(i, i)
    }
  }
  

}
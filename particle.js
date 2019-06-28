// small particle physics eng

function Particle() {
  this.pos=createVector(random(width),random(height)) // asign random position to particle
  //this.vel=p5.Vector.random2D() 
  this.vel=createVector(0,0)  // vector velocity starts at nothing
  this.acc=createVector(0,0)  // vector accel starts at nothing
  this.maxspeed=6
  this.prevPos=this.pos.copy()

  // update function to
  this.update = function() {
    this.vel.add(this.acc)  // increase velocity by accel
    this.vel.limit(this.maxspeed)
    this.pos.add(this.vel)  // increase position by vel
    this.acc.mult(0)  // reset acc
  }

  // follow function to have particles follow vectors
  this.follow = function(vectors) {
    var x=floor(this.pos.x/scl) // particle position x factoring in scale
    var y=floor(this.pos.y/scl) // particle position y factoring in scale
    var index=x+y*cols  // convert 2d value into 1d array 
    var force=vectors[index]  // force array of vectors at index
    this.applyForce(force)    // call apply force
  }
  
  // apply force function to
  this.applyForce = function(force) {

    this.acc.add(force) // add force to acc
  }

  // show function to
  this.show = function(count) {
    var upper=1250
    var lower=800
    if(lower<count && count<upper) {
      stroke(255,0.6) // display particle
      //strokeWeight(2)
    } else stroke(0,0.5)
    strokeWeight(2) // define particle size
    line(this.pos.x,this.pos.y,this.prevPos.x,this.prevPos.y)
    this.updatePrev()
    //point(this.pos.x,this.pos.y)  // define where particle is
  }

  this.updatePrev = function() {
    this.prevPos.x=this.pos.x
    this.prevPos.y=this.pos.y
  }

  /* edges function to keep particles within limits
   * if x or y position is too high or low, it goes to the opposite side
   */
  this.edges = function() {
    if(this.pos.x>width) {
      this.pos.x=0
      this.updatePrev()
    }
    if(this.pos.x<0) {
      this.pos.x=width
      this.updatePrev()
    }
    if(this.pos.y>height) {
      this.pos.y=0
      this.updatePrev()
    }
    if(this.pos.y<0) {
      this.pos.y=height
      this.updatePrev()
    }
  }
}

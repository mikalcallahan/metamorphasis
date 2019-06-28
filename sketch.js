// define global functions
var cnv // canvas

var inc=0.1 // incremental number
var scl=10  // scale offset for the number of rows/columns
var cols,rows  // define rows, columns
var zoff=0  // initialize 3d space (time)
var fr  // define framerate
var particles=[]  // define particle array
var flowfield // define flowfield to be used to attract particles to vectors
var count=0
function setup() {
  cnv=createCanvas(windowWidth/3,windowHeight/2)
  centerWindow()
  background(255)
  cols=floor(width/scl)   // define the number of columns
  rows=floor(height/scl)  // define the number of rows
  fr=createP('')  // paragraph for framerate
  flowfield = new Array(cols*rows)  // flowfield gets size to hold vectors

  // define number of particles and assign
  for(var i=0;i<200;i++){
    particles[i]=new Particle()
  }
}

function centerWindow() {
  var x=(windowWidth-width)/2
  var y=(windowHeight-height)/2
  cnv.position(x,y)
}

function windowResized() {
  centerWindow()
}

function draw() {
  var yoff=0  // initialize y offset
  for(var y=0;y<rows;y++){ // loop through each row
    var xoff=0; // initialize xoff so it resets each row
    for(var x=0;x<cols;x++){ // loop through each column
      var index=x+y*cols  // index gets location of vectors
      var angle=noise(xoff,yoff,zoff)*TWO_PI // get noise factor
      var v=p5.Vector.fromAngle(angle)  // define vector v
      v.setMag(2) // set magnitude so it doesn't take off
      flowfield[index]=v  // flowfield gets vectors
      xoff+=inc // go to next x position
        /*
      stroke(0) // create vector
      strokeWeight(0.75)  // definen stroke weight for vectors
      push()  // push vector
      translate(x*scl,y*scl)  // displace object to next row/column
      rotate(v.heading()) // rotate the heading of the vector
      line(0,0,scl,0) // draw the line from 0,0 to start of box
      pop() // pop vector
        */
    }
    yoff+=inc // go to next y position
    zoff+=0.0003  // increment z space
  }
  if(count<1500)
    count++
  else count=0
  
  // for each particle in particles[]
  for(var i=0;i<particles.length;i++){
    particles[i].follow(flowfield)  // follow the vector
    particles[i].update() // update
    particles[i].edges()  // wrap around edges of canvas
    particles[i].show(count) // show
  }
  fr.html(floor(frameRate())) // set visible framerate
  //noLoop()
}

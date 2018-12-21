var g = 0.1;
var drops = [];
// var puddle = [];

function setup() {
  //create full window canvas and fill with drops
  createCanvas(windowWidth, windowHeight);
  for (i = 0; i < 2000; ++i) {
    drops[i] = new drop();
  }
}

function draw() {
  background(220, 220, 255);
  stroke(130, 40, 230);
  //for all drops & update location
  for (i in drops) {
    drops[i].fall();
    drops[i].show();
    //if drop passes out of screen splash
    if (drops[i].y > height) {
      // puddle[i].splish();
      drops[i].splash();
    }
  }
}

// function puddle() {
//   this.x =
// }

function drop() {
  //new drops at random location above screen
  this.x = random(width);
  this.y = -random(height);
  this.y1 = this.y;
  //drops move at rates
  this.drift = random(-0.5, 0.5);
  this.accel = 0.3;
  //drops scaled to
  this.z = random(4);
  this.length = map(this.z, 0, 4, 3, 20);

  this.show = function() {
    //drops are lines with weight z
    strokeWeight(this.z);
    line(this.x, this.y, this.x + this.drift, this.y + this.length)
  }

  this.fall = function() {
    //drops drift to the side
    this.x += this.drift;
    //if out of x bound, wrap x
    if (this.x > width)
      this.x = 0;
    else if (this.x < 0)
      this.x = width;
    //drops fall by gravity
    this.y += this.accel;
    this.accel += g;
  }

  this.splash = function() {
    //reset drop above viewpane
    this.y = random(-500, -10);
    this.accel = 0.1;
    //puddle.push(splish(this.x);
  }
}
var g = 0.1;
var drops = [];
var ground = [];
// var txt;
// var tick;

// function preload() {
//   txt = loadStrings(lyrics);
// }

function setup() {
  //create full window canvas and fill with drops
  createCanvas(400, 400) //windowWidth, windowHeight);
  ellipseMode(CENTER);
  noFill();
  for (i = 0; i < width * 2; ++i) {
    drops[i] = new drop();
  }
}

function draw() {
  // ++tick;
  background(220, 220, 255);
  stroke(130, 40, 230);
  //for all drops & update location
  for (i in drops) {
    drops[i].fall();
    drops[i].show();
    //if drop passes out of screen splash
    if (drops[i].y > height) {
      drops[i].splash();
    }
  }
  for (i in ground) {
    ground[i].splish();
  }
  // lyrics();
}

function puddle(x, z) {
  // puddle formed at x scaled by z
  this.x = x;
  this.scaleCount = 2 * z;
  this.splish = function() {
    //show puddle as sphere of increasing size
    ellipse(this.x, height - 1, 8 - this.scaleCount);
    if (this.scaleCount >= 0) --this.scaleCount;
    else ground.pop();
  }
}

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
    line(this.x, this.y, this.x + this.drift, this.y + this.length);
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
    ground.push(new puddle(this.x, this.z));
  }
}

// function lyrics() {
//   textSize(32);
//   fill(0);
//   text(txt[tick], width / 2, height / 2)
//   noFill();
// }
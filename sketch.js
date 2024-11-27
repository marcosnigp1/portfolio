function setup() {
  let myCanvas = createCanvas(windowWidth, 400); //This helps to keep the sketch in the upper part: https://stackoverflow.com/questions/74905434/how-to-specify-where-to-put-a-p5-js-canvas-in-an-html-website
  myCanvas.parent("myContainer");
}

function draw() {
  background(0);

  push();
  fill(255);
  textSize(120);
  text("Hello \nbuddy!", 0, 100);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, 400);
}

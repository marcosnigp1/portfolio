// ------ Physics related variables ------

let Engine = Matter.Engine,
  //Render = Matter.Render,
  Body = Matter.Body,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Vector = Matter.Vector,
  Constraint = Matter.Constraint,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

let mConstraint;

//Inside the physics engine there is a world, where all the bodies are.
let ground;
let engine;
let runner;

// ------ Physics related variables ------
let letters = [];
let boundaries = [];

// ------ Media related variables ------
let font;
let bg;

function preload() {
  font = loadFont("media/font/CedarvilleCursive-Regular.ttf");
  bg = loadImage("media/bg.png");
}

function setup() {
  //Create Canvas and assign it to a container.
  let myCanvas = createCanvas(windowWidth, 400); //This helps to keep the sketch in the upper part: https://stackoverflow.com/questions/74905434/how-to-specify-where-to-put-a-p5-js-canvas-in-an-html-website
  myCanvas.parent("myContainer");

  engine = Engine.create();
  engine.gravity = Vector.create(0, 1);

  runner = Runner.create();

  //--- Mouse interaction ---.
  let canvas_mouse = Mouse.create(myCanvas.elt);
  canvas_mouse.pixelRatio = pixelDensity(); //Make comfortable when selecting items on the canvas.

  let mouse_options = {
    mouse: canvas_mouse,
  };

  mConstraint = MouseConstraint.create(engine, mouse_options);

  //Mouse constraint fix found here: https://github.com/liabru/matter-js/issues/929#issuecomment-2283881680
  mConstraint.mouse.element.removeEventListener(
    "wheel",
    mConstraint.mouse.mousewheel
  );

  // ------ Letters ---------

  //Letter(letter, Position X, Position Y, Width, Height).
  //Boundary(Position X, Position Y, Width, Height, Angle Value).

  //Spawn the name...
  spawnName();

  //Boundaries(Position X, Position Y, Width, Height, Angle).
  boundaries.push(new Boundary(0, 456, 7000, 100, 0));

  // -- Start the engine (and only add the mouse processing at the moment)-- //
  Composite.add(engine.world, [mConstraint]);
  Runner.run(runner, engine);

  //This is for the events on collsion.
  Matter.Events.on(engine, "collisionStart", handleCollisions);
}

function draw() {
  background(0);
  image(bg, 0, 0);

  //Display the letters.
  for (let i = 0; i < letters.length; i++) {
    letters[i].show();

    //Check if the static property has changed.
    if (letters[i].position_set == false) {
      Body.setStatic(letters[i].body, true);
      letters[i].position_set = true;
    }

    //Check if it is offscreen. If it happens to be, then erase the item.
    if (letters[i].isOffScreen()) {
      letters[i].removeFromWorld();
      letters.splice(i, 1);
      i--; //This fixes the flickering in the code.
    }
  }

  //Check if the list is equal to zero (no letters on screen). If it is true, then populate with the same letters as the beginning.
  if (letters.length == 0) {
    spawnName();
  }

  //Display the boundaries.
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, 400);
}

function mousePressed() {
  for (let i = 0; i < letters.length; i++) {
    if (
      mouseX > letters[i].body.position.x - 20 &&
      mouseX < letters[i].body.position.x + 20 &&
      mouseY > letters[i].body.position.y - 20 &&
      mouseY < letters[i].body.position.y + 40 &&
      letters[i].mass_is_static == true
    ) {
      Body.setMass(
        letters[i].body,
        0.01 * (letters[i].body.width * letters[i].body.height)
      );
      Body.setStatic(letters[i].body, false); //Solution found on:https://stackoverflow.com/questions/64087972/how-do-i-make-a-matter-body-isstatic-false-after-pressing-a-key-in-matter-js
      letters[i].mass_is_static = false;
    }
  }
}

//Support for mobile screens.
function touchStarted() {
  for (let i = 0; i < letters.length; i++) {
    if (
      mouseX > letters[i].body.position.x - 20 &&
      mouseX < letters[i].body.position.x + 20 &&
      mouseY > letters[i].body.position.y - 20 &&
      mouseY < letters[i].body.position.y + 40
    ) {
      letters[i].change(); //Change static value.
    }
  }
}

//Done with help of the following material: https://nature-of-code-2nd-edition.netlify.app/physics-libraries/#collision-events
function handleCollisions(event) {
  for (let pair of event.pairs) {
    let bodyA = pair.bodyA;
    let bodyB = pair.bodyB;

    //Retrieve the particles associated with the colliding bodies via the plugin.
    let particleA = bodyA.plugin.particle;
    let particleB = bodyB.plugin.particle;

    if (particleA instanceof Letter && particleB instanceof Letter) {
      particleA.change();
      particleB.change();
    }
  }
}

function spawnName() {
  //First name.
  letters.push(new Letter("M", 20, 40, 30, 30));
  letters.push(new Letter("a", 70, 40, 30, 30));
  letters.push(new Letter("r", 110, 40, 30, 30));
  letters.push(new Letter("c", 140, 40, 30, 30));
  letters.push(new Letter("o", 180, 40, 30, 30));
  letters.push(new Letter("s", 220, 40, 30, 30));

  //Last name.
  letters.push(new Letter("H", 20, 110, 30, 30));
  letters.push(new Letter("e", 70, 110, 30, 30));
  letters.push(new Letter("r", 110, 110, 30, 30));
  letters.push(new Letter("n", 140, 110, 30, 30));
  letters.push(new Letter("á", 180, 110, 30, 30));
  letters.push(new Letter("n", 220, 110, 30, 30));
  letters.push(new Letter("d", 260, 110, 30, 30));
  letters.push(new Letter("e", 300, 110, 30, 30));
  letters.push(new Letter("z", 340, 110, 30, 30));
}

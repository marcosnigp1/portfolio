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

  letters.push(new Letter("M", 60, 40, 60, 60));
  letters.push(new Letter("a", 90, 40, 60, 60));
  boundaries.push(new Boundary(0, 400, 1000, 100, 0));

  // -- Start the engine (and only add the mouse processing at the moment)-- //
  Composite.add(engine.world, [mConstraint]);
  Runner.run(runner, engine);

  //This is for the events on collsion.
  Matter.Events.on(engine, "collisionStart", handleCollisions);
}

function draw() {
  background(0);

  //Display the letters.
  for (let i = 0; i < letters.length; i++) {
    letters[i].show();

    if (letters[i].position_set == false) {
      Body.setStatic(letters[i].body, true);
      letters[i].position_set = true;
    }
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
      mouseX > letters[i].body.position.x &&
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

//Done with help of the following material: https://nature-of-code-2nd-edition.netlify.app/physics-libraries/#collision-events
function handleCollisions(event) {
  //Not yet used.
  /*   for (let pair of event.pairs) {
    let bodyA = pair.bodyA;
    let bodyB = pair.bodyB;

    //Retrieve the particles associated with the colliding bodies via the plugin.
    let particleA = bodyA.plugin.particle;
    let particleB = bodyB.plugin.particle;

    if (particleA instanceof Circle && particleB instanceof Circle) {
      particleA.change();
      particleB.change();
    }

    if (particleA instanceof Boundary && particleB instanceof Circle) {
      particleA.change();
      particleB.change();
      bell.play();
    }
  } */
}

class Letter {
  constructor(letter, x, y, w, h) {
    let options = {
      //isStatic: true,
      friction: 0.2,
      restitution: 0.6,
    };

    this.body = Bodies.rectangle(x, y, w, h, options);
    this.letter = letter;
    this.w = w;
    this.h = h;
    this.position_set = false;
    this.mass_is_static = true;
    this.body.plugin.particle = this; //Associated with collisions events.
    Composite.add(engine.world, this.body); //Without this, it will not render.
  }

  change() {
    if (this.mass_is_static == true) {
      Body.setMass(this.body, 0.01 * (this.body.width * this.body.height));
      Body.setStatic(this.body, false); //Solution found on:https://stackoverflow.com/questions/64087972/how-do-i-make-a-matter-body-isstatic-false-after-pressing-a-key-in-matter-js
      this.mass_is_static = false;
    }
  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    noFill();
    noStroke();
    //strokeWeight(2);
    rect(0, 0, this.w, this.h);

    //Display the text.
    fill(255);
    textFont(font);
    textSize(30);
    text(this.letter, -10, 10);
    pop();
  }
}

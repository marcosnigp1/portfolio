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
    Composite.add(engine.world, this.body); //Without this, it will not render.
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
    textSize(30);
    text(this.letter, -10, 10);
    pop();
  }
}

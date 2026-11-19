class Boundary {
  constructor(x, y, w, h, angle_value) {
    let options = {
      isStatic: true,
      angle: angle_value,
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    this.body.plugin.particle = this; //Associated with collisions events.
    Composite.add(engine.world, this.body); //Without this, it will not render.
  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;

    push();

    stroke(255);
    noFill();
    strokeWeight(1);

    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);

    rect(0, 0, this.w, this.h);

    pop();
  }
}

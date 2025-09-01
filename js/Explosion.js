class Explosion {
  constructor(x, y) {
    this.image = cloud_sprite;
    this.spriteWidth = 92;
    this.spriteHeight = 181;
    this.width = 100;
    this.height = 100;
    this.x = x;
    this.y = y;
    this.delete = false;
    this.maxFrames = 5;
    this.frames = 0;
    this.max = 100;
    this.interval = 0;
    this.delete = false;
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frames * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.spriteWidth,
      this.spriteHeight,
    );
  }
  update() {
    if (this.interval > deltaTime) {
      if (this.frames < this.maxFrames) {
        this.frames++;
      } else {
        this.delete = true;
      }
      this.interval = 0;
    } else this.interval += 2;
  }
}
export default Explosion
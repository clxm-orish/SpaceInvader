import PlayerSprite from "../assets/images/player.png";

export default class Player {
  constructor(canvas, velocity, bulletController) {
    this.canvas = canvas;
    this.velocity = velocity;
    this.bulletController = bulletController;

    this.width = 60;
    this.height = 48;
    this.x = (canvas.width - this.width) / 2;
    this.y = canvas.height - this.height - 10;

    this.image = new Image();
    this.image.src = PlayerSprite;

    this.rightPressed = false;
    this.leftPressed = false;

    document.addEventListener("keydown", this.keyDownHandler);
    document.addEventListener("keyup", this.keyUpHandler);
  }

  draw(ctx) {
    this.move();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move() {
    if (this.rightPressed && this.x + this.width < this.canvas.width) {
      this.x += this.velocity;
    } else if (this.leftPressed && this.x > 0) {
      this.x -= this.velocity;
    }
  }

  keyDownHandler = (event) => {
    if (event.code === "ArrowRight") {
      this.rightPressed = true;
    } else if (event.code === "ArrowLeft") {
      this.leftPressed = true;
    }
  };

  keyUpHandler = (event) => {
    if (event.code === "ArrowRight") {
      this.rightPressed = false;
    } else if (event.code === "ArrowLeft") {
      this.leftPressed = false;
    }
  };
}

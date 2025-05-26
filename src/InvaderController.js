import Invader from "./Invader";
import MovingDirection from "../src/movingDirection";



export default class InvaderController {
    invaderMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 3, 3, 2, 2, 2, 1],
        [1, 2, 2, 2, 3, 3, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    ]

    invaderRow = []

    constructor(canvas) {
        this.canvas = canvas;
        this.createInvaders();
        this.xVelocity = 1;
        this.yVelocity = 0;
        this.currentDirection = MovingDirection.right;
        this.defaultXVelocity = 1;
        this.defaultYVelocity = 1;
        this.moveDownTimerDefault = 30;
        this.moveDownTimer = this.moveDownTimerDefault;
    }

    createInvaders() {
        this.invaderMap.forEach((row, rowIndex) => {
            this.invaderRow[rowIndex] = [];
            row.forEach((invaderNumber, invaderIndex) => {
                if (invaderNumber > 0) {
                    this.invaderRow[rowIndex].push(
                        new Invader(invaderIndex * 55, rowIndex * 40, invaderNumber)
                    );
                }
            });
        });
    }

    drawInvaders(ctx) {
        console.log("Drawing invaders...", this.invaderRow.flat().length);
        this.invaderRow.flat().forEach((invader) => {
            invader.draw(ctx)
            invader.move(this.xVelocity, this.yVelocity);
        })
    }

    draw(ctx) {
        this.decrementMoveDownTimer();
        this.drawInvaders(ctx);
        this.updateVelocityAndDirection();
        this.resetMoveDownTimer(); 
    }


    updateVelocityAndDirection() {
        for (const invaderRow of this.invaderRow) {
            if (this.currentDirection === MovingDirection.right) {
                console.log("entre dans la première condition")
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
                
                const rightMostInvader = invaderRow[invaderRow.length - 1];
                if (rightMostInvader.x + rightMostInvader.width >= this.canvas.width) {
                    this.currentDirection = MovingDirection.downLeft;
                    console.log("descente bas gauche")
                    break;
                }

            } else if (this.currentDirection === MovingDirection.downLeft) {
                if (this.moveDown(MovingDirection.left)) {
                    console.log("déjà entrain de descendre a gauche")
                    break;
                }

            } else if (this.currentDirection === MovingDirection.left) {
                this.xVelocity = -this.defaultXVelocity;
                this.yVelocity = 0;
                console.log("random1")

                const leftMostInvader = invaderRow[0];
                if (leftMostInvader.x <= 0) {
                    this.currentDirection = MovingDirection.downRight;
                    console.log("random2");
                    break;
                }

            } else if (this.currentDirection === MovingDirection.downRight) {
                if (this.moveDown(MovingDirection.right)) {
                    console.log("descente à droite")
                    break;
                }
            }
        }
    }
    moveDown(newDirection) {
        console.log("⬇️ Descente activée :", this.moveDownTimer);
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if (this.moveDownTimer <= 0) {
            this.currentDirection = newDirection;
            this.moveDownTimer = this.moveDownTimerDefault;
            return true;
        }
        this.moveDownTimer--;
        return false;
    }

    resetMoveDownTimer() {
        if (this.moveDownTimer <= 0) {
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }

    decrementMoveDownTimer() {
        if (
            this.currentDirection === MovingDirection.downLeft ||
            this.currentDirection === MovingDirection.downRight
        ) {
            this.moveDownTimer--;
        }
    }



}
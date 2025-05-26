import Invader from "./Invader";


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

    drawInvaders(ctx){
        console.log("Drawing invaders...", this.invaderRow.flat().length);
        this.invaderRow.flat().forEach((invader)=>{
            invader.draw(ctx)
        })
    }

    draw(ctx) {

    }
}
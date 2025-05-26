import { initCompiler } from "sass";
import Invader1 from "../assets/images/invader1.png"
import Invader2 from "../assets/images/invader2.png"
import Invader3 from "../assets/images/invader3.png"


export default class Invader{
    constructor (x, y, imageNumber){
    this.x = x;
    this.y = y;
    this.witdh = 50;
    this.height = 35;
    this.image = new Image();
    this.image.src = this.getImage(imageNumber);
    console.log(`Image invader chargée: ${this.image.src}`);

    }
    getImage(imageNumber) {
        switch (imageNumber) {
            case 1:
                return Invader1;
            case 2:
                return Invader2;
            case 3:
                return Invader3;
            default:
                return Invader1;
        }
    }
    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.witdh, this.height )
    }



}
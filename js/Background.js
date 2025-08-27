import DrawImage from "./DrawImage.js"
import Sprite from "./Sprite.js"
import sprites from "./sprites.js"
class Background{
    constructor(gameSize){
        this.position={x:0,y:0}
        this.velocity={y:0,x:2}
        this.currentSprite=null
        this.bgDrawClass=null
        this.origin={x:0,y:0}
        this.size=gameSize
        this.rotation=0
        this.currentDirection=null
    }
    draw(ctx){
        this.currentSprite=new Sprite().getSprite("bg1")
        new DrawImage(this.currentSprite,this.position,this.origin,this.rotation,this.size,this.size).draw(ctx)
        new DrawImage(this.currentSprite,{x:this.position.x + this.size.width, y:this.position.y},this.origin,this.rotation,this.size,this.size).draw(ctx)
    }
    update(playerDirection){
        this.currentDirection=playerDirection
        if(this.currentDirection==="left" || this.currentDirection==="right")
        {
  switch(this.currentDirection) {
            case 'up':
                this.position.y += this.velocity.y;
                break;
            case 'down':
                this.position.y -= this.velocity.y;
                break;
            case 'left':
                this.position.x += this.velocity.x;
                break;
            case 'right':
                this.position.x -= this.velocity.x;
                break;
            default:
                this.position.x -= this.velocity.x;
        }


        }
      
        if (this.position.x < -this.size.width) {
            this.position.x = 0;
        } else if (this.position.x > 0) {
            this.position.x = -this.size.width;
        }
        if (this.position.y < -this.size.height) {
            this.position.y = 0;
        } else if (this.position.y > 0) {
            this.position.y = -this.size.height;
        }
    }
}
export default Background
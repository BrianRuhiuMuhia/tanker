import DrawImage from "./DrawImage.js"

class Background{
    constructor(gameSize,level){
        this.position={x:0,y:0}
        this.level=level
        this.currentSprite=level.background.sprite
        this.velocity=level.background.velocity
        this.bgDrawClass=null
        this.origin={x:0,y:0}
        this.size=gameSize
        this.rotation=0
        this.currentDirection=level.background.direction
        this.directions=level.background.directions

    }
    draw(ctx){
        new DrawImage(this.currentSprite,this.position,this.origin,this.rotation,this.size,this.size).drawSprite(ctx)
        if(this.currentDirection==="left" || this.currentDirection==="right")
        {
        new DrawImage(this.currentSprite,{x:this.position.x + this.size.width, y:this.position.y},this.origin,this.rotation,this.size,this.size).drawSprite(ctx)
        }
        else if(this.currentDirection==="up" || this.currentDirection==="down"){
        new DrawImage(this.currentSprite,{x:this.position.x, y:this.position.y +this.size.height},this.origin,this.rotation,this.size,this.size).drawSprite(ctx)
        }
    }
    update(playerDirection){
    if(this.directions.some((direction)=>direction === playerDirection))
    {
        this.currentDirection=playerDirection
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
else{
    this.currentDirection=this.level.background.direction
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
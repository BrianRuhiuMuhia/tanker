class StatusBar{
    constructor(){
        this.size={width:80,height:10}
        this.color="lime"
        this.position=null
    }
    draw(ctx,position)
    {
        this.position={x:position.x-10,y:position.y-30}
ctx.save()
ctx.fillStyle=this.color
ctx.fillRect(this.position.x,this.position.y,this.size.width,this.size.height)
ctx.restore()
    }
    update(collision){
        if (collision === true) {
            this.size.width -= 10;
            if (this.size.width <= 0) {
                this.size.width = 0;
                return true; 
            }
        }
        return false; 
    }
    changeColor(newColor) {
        this.color = newColor;
    }
}
export default StatusBar
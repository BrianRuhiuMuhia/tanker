class Projectile {
    constructor(position,options,gameSize) {
        this.position = position,
    this.options=options
            this.velocity = {x:2,y:2}
            this.speed=6
            this.direction=null
            this.isShot=false
            this.gameSize=gameSize
            this.deleted=false

    }
    draw(ctx) {
        ctx.beginPath()
        ctx.fillStyle = this.options.color
        ctx.arc(this.position.x, this.position.y, this.options.radius, 0, Math.PI * 360)
        ctx.fill()
        ctx.closePath()
    }
    update(direction){
        if(direction)
        this.updatePlayerProjectile(direction)
    else
        this.updateEnemyProjectile()


    }
updateEnemyProjectile(){
this.position.x+=this.velocity.x
this.position.y+=this.velocity.y
}
    updatePlayerProjectile(direction) {
        if(this.position.x>=this.gameSize.width || this.position.x<=0 || this.position.y>=this.gameSize.height || this.position.y<=0){
this.deleted=true
        }
if(!this.isShot){
this.direction=direction
}
else{
         if(this.direction==="up"){
            this.velocity.y=-this.speed
            this.velocity.x=0
        }
        else if(this.direction==="down"){
            this.velocity.y=Math.abs(this.speed)
            this.velocity.x=0
        }
        else if(this.direction==="right"){
            this.velocity.x=Math.abs(this.speed)
            this.velocity.y=0
        }
        else if(this.direction==="left"){
            this.velocity.x=-this.speed
        this.velocity.y=0}
            this.position.x+=this.velocity.x
            this.position.y+=this.velocity.y

    }
}
 
}
export default Projectile
import DrawImage from "./DrawImage.js"
import Explosion from "./Explosion.js"
import Sprite from "./Sprite.js"
import StatusBar  from "./StatusBar.js"
import sprites from "./sprites.js"
class Enemy{
    constructor(position,gameSize,enemySize,velocity){
        this.position=position
        this.gameSize=gameSize
        this.velocity = velocity
        this.speed=1
        this.enemyImage=null
        this.enemySpriteSrc=new Sprite().getSprite("astr1")
        this.deleted=false
        this.direction=null
        this.origin={x:0,y:0}
        this.size=enemySize
        this.health=100
        this.statusBar=new StatusBar()
        this.dangerZone={
            dead:10,
            critical:50
        }
        this.explosion=new Explosion(sprites["explosion"])
       
    }
   
    draw(ctx){
        this.ctx=ctx
        if(this.deleted)
            return
if(this.position.x && this.position.y){
    this.enemyImage=new DrawImage(this.enemySpriteSrc,this.position,this.origin,this.rotation,this.size)
    this.enemyImage.draw(ctx)
    this.statusBar.draw(ctx,this.position)
}

    }
    update(){
       if(this.deleted)
            return
         this.checkHealth(this.ctx)
        this.position.x+=(this.velocity.x * (Math.random()+1)*this.speed)
        this.position.y+=(this.velocity.y* (Math.random()+1)*this.speed)
       if (this.position.x > this.gameSize.width) {
            this.position.x = 0
        } else if (this.position.x < -this.size.width) {
            this.position.x = this.gameSize.width
        }
        if (this.position.y > this.gameSize.height) {
            this.position.y = 0
        } else if (this.position.y < -this.size.height) {
            this.position.y = this.gameSize.height
        }
       

    }
    checkHealth(){
        if(this.health<50){
            this.statusBar.changeColor("red")
        }
        if(this.health<20){
            this.explosion.draw(this.ctx,this.position)
            this.deleteEnemy()
        }
    }
    reduceHealth(){
        this.health=this.health-50
        return this.health
    }
deleteEnemy(){
    this.deleted=true
}
}
export default Enemy

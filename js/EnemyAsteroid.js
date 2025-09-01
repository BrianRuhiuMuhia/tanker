import DrawImage from "./DrawImage.js"
import StatusBar  from "./StatusBar.js"
class EnemyAsteroid{
    constructor(gameSize,level,position,enemySize){
        this.position=position
        this.gameSize=gameSize
        this.level=level
        // Create independent velocity object for each asteroid
        this.velocity = {
            x: level.enemy.velocity.x * (0.5 + Math.random()),
            y: level.enemy.velocity.y * (0.5 + Math.random())
        }
        this.enemySpriteSrc=level.enemy.sprite
        this.speed=1
        this.enemyImage=null
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
       
    }
   
    draw(ctx){
        this.ctx=ctx
        if(this.deleted)
            return
if(this.position.x && this.position.y){
    this.enemyImage=new DrawImage(this.enemySpriteSrc,this.position,this.origin,this.rotation,this.size)
    this.enemyImage.drawSprite(ctx)
    this.statusBar.draw(ctx,this.position)
}

    }
update(){
    //must be overriden
}
    checkHealth(){
        if(this.health<50){
            this.statusBar.changeColor("red")
        }
        if(this.health<20){
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
export default EnemyAsteroid

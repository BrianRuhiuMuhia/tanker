import DrawImage from "./DrawImage.js"
import Sprite from "./Sprite.js"
import sprites from "./sprites.js"
import ObjectPool from "./ObjectPool.js"
class Enemy{
    constructor(position,gameSize,enemySize,velocity){
        this.position=position
        this.gameSize=gameSize
        this.velocity = velocity
        this.speed=1
        this.enemyImage=null
        this.enemySize=enemySize
        this.enemySpriteSrc=new Sprite().getSprite("enemy_1")
        this.deleted=false
        this.direction=null
        this.origin={x:0,y:0}
        this.objectPool=new ObjectPool(gameSize,5)
        this.enemyProjectiles=[]
        this.createProjectiles()
       
    }
    draw(ctx){
if(this.position.x && this.position.y){
    this.enemyImage=new DrawImage(this.enemySpriteSrc,this.position,this.origin,this.rotation,this.enemySize)
    this.enemyImage.draw(ctx)
}

    }
    update(velocity){
        if(velocity){
            this.velocity=velocity
        }
        
        this.position.x+=(this.velocity.x * (Math.random()+1)*this.speed)
        this.position.y+=(this.velocity.y* (Math.random()+1)*this.speed)
        // this.updateProjectiles()

    }
    createProjectiles(){
        this.enemyProjectiles=this.objectPool.createEnemyProjectiles(this.position)
    }
    updateProjectiles(){
this.enemyProjectiles.forEach((projectile)=>{
// projectile.updateEnemyProjectiles()
})
    }
    
}
export default Enemy
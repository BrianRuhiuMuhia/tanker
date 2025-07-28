import Sprite from "./Sprite.js"
import sprites from "./sprites.js"
import ObjectPool from "./ObjectPool.js"
import DrawImage from "./DrawImage.js"
import Enemy from "./Enemy.js"
class EnemyClass{
    constructor(gameSize,poolSize){
        this.gameSize=gameSize
this.enemySpriteSrc=new Sprite(sprites.enemy_1)
this.objectPool=new ObjectPool(gameSize,poolSize)
this.enemyPool=[]
this.enemySize={width:20,height:20}
this.enemyVelocity={x:2,y:2}
this.enemyPosition={x:50,y:50}
this.enemyPoolSize=poolSize
    }
  
createEnemy() {
 this.enemyPool=this.objectPool.createEnemies(this.enemySize)
 console.log(this.enemyPool)
    
}


    getAngle(positionOne,positionTwo){
        
        const angle=Math.atan2(
            positionOne.y-positionTwo.y,
            positionOne.x-positionTwo.x
        )
return angle
    }
     draw(ctx){
        this.enemyPool.forEach( (enemy)=>{
enemy.draw(ctx)
        })

    }
    update(playerPosition){

        this.enemyPool.forEach((enemy)=>{
const angle=this.getAngle(playerPosition,enemy.position)
  this.enemyVelocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

enemy.update(this.enemyVelocity)
        })
    }
}

export default EnemyClass
import DrawImage from "./DrawImage.js"
import Sprite from "./Sprite.js"
import ObjectPool from "./ObjectPool.js"
import StatusBar  from "./StatusBar.js"
import { getRandomDimensions } from "./utility.js"
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
        this.objectPool=new ObjectPool(gameSize,5)
        this.enemyProjectiles=[]
        this.enemySize=enemySize
        this.health=100
        this.statusBar=new StatusBar()
       
    }
   
    draw(ctx){
if(this.position.x && this.position.y){
    this.enemyImage=new DrawImage(this.enemySpriteSrc,this.position,this.origin,this.rotation,this.enemySize)
    this.enemyImage.draw(ctx)
    this.statusBar.draw(ctx,this.position)
}

    }
    update(){
      
        
        this.position.x+=(this.velocity.x * (Math.random()+1)*this.speed)
        this.position.y+=(this.velocity.y* (Math.random()+1)*this.speed)
        
        // Wall bouncing logic
        if (this.position.x <= 0 || this.position.x >= this.gameSize.width - this.enemySize.width) {
            this.velocity.x = -this.velocity.x;
            // Clamp position to prevent going out of bounds
            this.position.x = Math.max(0, Math.min(this.position.x, this.gameSize.width - this.enemySize.width));
        }
        
        if (this.position.y <= 0 || this.position.y >= this.gameSize.height - this.enemySize.height) {
            this.velocity.y = -this.velocity.y;
            // Clamp position to prevent going out of bounds
            this.position.y = Math.max(0, Math.min(this.position.y, this.gameSize.height - this.enemySize.height));
        }

    }
}
export default Enemy

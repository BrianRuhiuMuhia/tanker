import Sprite from "./Sprite.js"
import sprites from "./sprites.js"
import DrawImage from "./DrawImage.js"
import Projectile from "./Projectile.js"
import ObjectPool from "./ObjectPool.js"
class Player{
    constructor(gameSize,ctx){
        this.playerSpriteSrc=new Sprite().getSprite("player")
        this.position={x:gameSize.width/2,y:gameSize.height/2}
        this.gameSize=gameSize
        this.playerImage=null
        this.playerSprite=null
        this.playerSize={width:40,height:40}
        this.direction={right:false,left:false,up:true,down:false}
        this.origin={x:20,y:20}
        this.velocity={x:6,y:6}
        this.speed=4
        this.projectiles=[]
        this.currentDirection=null
        this.ctx=ctx
        this.objectPool=new ObjectPool(gameSize,5)
    }
    draw(ctx){
        {
if(this.playerImage===null)
{
    this.playerImage=new DrawImage(this.playerSpriteSrc,this.position,this.origin,0,this.playerSize)
}
this.playerImage.draw(this.ctx)
        }{
            this.projectiles.forEach((projectile)=>{
projectile.draw(this.ctx)
projectile.isShot=true
            })
        }

    }
    updateRotation(event){
        
if(event.key==="ArrowUp"){
    this.checkDir("up")
    this.updatePlayerRotation(this.ctx)
}
else if(event.key==="ArrowDown"){
    this.checkDir("down")
    this.updatePlayerRotation(this.ctx)
}
else if(event.key==="ArrowLeft"){
    this.checkDir("left")
    this.updatePlayerRotation(this.ctx)
}
else if(event.key==="ArrowRight"){
    this.checkDir("right")
    this.updatePlayerRotation(this.ctx)
}
else if(event.key==="q")
{
    
    // this.createProjectiles()
    if(!this.objectPool.isFull)
    {
           const position={x:this.position.x,y:this.position.y}
    this.projectiles=this.objectPool.createProjectiles(position,this.currentDirection) 
    }
    else if(this.objectPool.isFull){
        const direction=this.currentDirection
        const position={x:this.position.x,y:this.position.y}
        this.projectiles=this.objectPool.resetObjects(position,this.currentDirection)
        
    }


}

    }
    updatePlayerRotation(ctx){
for(let key in this.direction){
    if(this.direction[key]===true){
let degrees=this.getDegrees(key)
this.updatePlayerRotationByDegrees(degrees,this.ctx)
    }
}
    }
    getDegrees(key){
        if(key==="up")
            return 0;
        else if(key==="right")
            return 90;
        else if(key==="left")
            return 270;
        else if(key==="down")
            return 180;


    }
    updatePlayerRotationByDegrees(degrees,ctx){
        this.playerImage.rotation=degrees
this.playerImage.draw(ctx)

    }
    checkDir(dKey){
        this.direction[dKey]=true
        for(let key in this.direction){
            if(key===dKey){
                continue
            }
            this.direction[key]=false
        }

    }
    getPlayerDirection(){
        let key=null
for(key in this.direction)
{
    if(this.direction[key]===true){
        break

    }
}
return key
    }
    playerUpdate()
    {
        this.playerMove()
        this.projectiles.forEach((projectile)=>{
projectile.update(this.currentDirection)
        })
    }
    playerMove(){
        this.currentDirection=this.getPlayerDirection()
        if(this.position.x>=this.gameSize.width || this.position.x<=0 || this.position.y>=this.gameSize.height || this.position.y<=0){
this.changeDirection()
this.updatePlayerRotation(this.ctx)
        }
        
             if(this.currentDirection==="up"){
            this.velocity.y=-this.speed
            this.velocity.x=0
        }
        else if(this.currentDirection==="down"){
            this.velocity.y=Math.abs(this.speed)
            this.velocity.x=0
        }
        else if(this.currentDirection==="right"){
            this.velocity.x=Math.abs(this.speed)
            this.velocity.y=0
        }
        else if(this.currentDirection==="left"){
            this.velocity.x=-this.speed
        this.velocity.y=0}
            this.position.x+=this.velocity.x
            this.position.y+=this.velocity.y
    
        }
        changeDirection(){
if(this.currentDirection==="right"){
    this.direction.left=true
    this.direction.right=false
    this.currentDirection="left"
}
else if(this.currentDirection==="left"){
    this.direction.left=false
    this.direction.right=true
    this.currentDirection="right"
}
else if(this.currentDirection==="up"){
    this.direction.up=false
    this.direction.down=true
    this.currentDirection="down"
}
else if(this.currentDirection==="down"){
    this.direction.up=true
    this.direction.down=false
    this.currentDirection="up"
}
        }
      
       
    createProjectiles(){
        const position={x:this.position.x,y:this.position.y}
        const options={color:"red",radius:10}
const projectile=new Projectile(position,options,this.gameSize)
this.projectiles.push(projectile)
    }

}

export default Player
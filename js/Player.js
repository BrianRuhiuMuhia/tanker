import DrawImage from "./DrawImage.js"
import StatusBar from "./StatusBar.js"
import ObjectPool from "./ObjectPool.js"

class Player {
    constructor(gameSize,level) {
        this.playerSpriteSrc = level.player.sprite
        this.position = { x: 50, y: gameSize.height / 2 }
        this.gameSize = gameSize
        this.playerImage = null
        this.size = level.player.size
        this.direction = { right: true, left: false, up: false, down: false }
        this.origin = { x: 20, y: 20 }
        this.velocity = level.player.velocity
        this.speed = 0.1
        this.projectiles = []
        this.currentDirection = level.player.direction
        this.objectPool = new ObjectPool(gameSize, 10)
        this.statusBar = new StatusBar()
        this.alive=true
        this.dangerZone={
            dead:10,
            critical:50
        }
        this.hitcount={}
    }

    draw(ctx) {
         if(!this.alive)
            return
if (this.playerImage === null) {
            this.playerImage = new DrawImage(this.playerSpriteSrc, this.position, this.origin, this.rotation, this.size)
        } else {
            this.playerImage.rotation =0;
            this.playerImage.rotation=this.getRotation()
        }

        this.playerImage.drawSprite(ctx)
        this.statusBar.draw(ctx,this.position)
        this.projectiles.forEach((projectile) => {
            projectile.drawImage(ctx)
            projectile.isShot = true
        })
    }
    getRotation(){
if(this.currentDirection==="right")
    return 90
else if(this.currentDirection==="left")
    return 270
else if(this.currentDirection==="down")
    return 180
else if(this.currentDirection==="up")
    return 0
    }

    updateRotation(event) {
        if (event.key === "ArrowLeft") {
            this.checkDir("left")
        } else if (event.key === "ArrowRight") {
            this.checkDir("right")
        } else if (event.key === "ArrowUp") {
            this.checkDir("up")
        } else if (event.key === "ArrowDown") {
            this.checkDir("down")
        } else if (event.key === " ") {
            this.shootProjectile(" ")
        }
    }

    shootProjectile(key) {
        if (key === " ") {
            this.createProjectiles()
        }
    }

    checkDir(dKey) {
        this.direction[dKey] = true
        this.currentDirection=dKey                               
        for (let key in this.direction) {
            if (key === dKey) continue
            this.direction[key] = false
        }
    }


    playerUpdate(targetPos) {
         if(!this.alive)
            return
        this.playerMove()
        this.projectiles.forEach((projectile) => {
            projectile.update(this.currentDirection,targetPos)
        })
    }

    playerMove() {
        
        if(this.currentDirection==="right"){
            this.position.x+=this.velocity.x
    
        }
        else if(this.currentDirection==="left"){
this.position.x-=this.velocity.x

        }
        else if(this.currentDirection==="up"){
            this.position.y-=this.velocity.y
        }
        else if(this.currentDirection==="down"){
            this.position.y+=this.velocity.y
    
        }
        
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

    createProjectiles() {
        if (!this.objectPool.isFull) {
            const position = { x: this.position.x, y: this.position.y }
            this.projectiles = this.objectPool.createProjectiles(position, this.currentDirection,"player")
        } else if (this.objectPool.isFull) {
            const position = { x: this.position.x, y: this.position.y }
            this.projectiles = this.objectPool.resetObjects(position, this.currentDirection)
        }
    }
       checkHealth(){
        if(this.health<this.dangerZone.critical){
            this.statusBar.changeColor("red")
        }
        if(this.health<this.dangerZone.dead){
            this.alive=false
        }
    }
    reduceHealth(){
        this.health=this.health-10
        return this.health
    }
}

export default Player


import Sprite from "./Sprite.js"
import DrawImage from "./DrawImage.js"
import Projectile from "./Projectile.js"
import ObjectPool from "./ObjectPool.js"
import StatusBar from "./StatusBar.js"

class Player {
    constructor(gameSize) {
        this.playerSpriteSrc = new Sprite().getSprite("p1")
        this.position = { x: 50, y: gameSize.height / 2 }
        this.gameSize = gameSize
        this.playerImage = null
        this.playerSprite = null
        this.playerSize = { width: 40, height: 40 }
        this.direction = { right: true, left: false, up: false, down: false }
        this.verticalDirection = { up: false, down: false }
        this.origin = { x: 20, y: 20 }
        this.velocity = { x: 0, y: 0 }
        this.speed = 2
        this.projectiles = []
        this.currentDirection = "right"
        this.currentVerticalDirection = null
        this.objectPool = new ObjectPool()
    }

    draw(ctx) {
     
        let rotation = 0;
        
    
        if (this.velocity.x !== 0 || this.velocity.y !== 0) {
            rotation = Math.atan2(this.velocity.y, this.velocity.x) * (180 / Math.PI);
        }
        
        
        rotation += 45;

        if (this.playerImage === null) {
            this.playerImage = new DrawImage(this.playerSpriteSrc, this.position, this.origin, rotation, this.playerSize)
        } else {
    
            this.playerImage.rotation = rotation;
        }

        this.playerImage.draw(ctx)
        
        this.projectiles.forEach((projectile) => {
            projectile.draw(ctx)
            projectile.isShot = true
        })
    }

    updateRotation(event) {
        if (event.key === "ArrowLeft") {
            this.checkDir("left")
        } else if (event.key === "ArrowRight") {
            this.checkDir("right")
        } else if (event.key === "ArrowUp") {
            this.checkVerticalDir("up")
        } else if (event.key === "ArrowDown") {
            this.checkVerticalDir("down")
        } else if (event.key === "q") {
            if (!this.objectPool.isFull) {
                const position = { x: this.position.x, y: this.position.y }
                this.projectiles = this.objectPool.createProjectiles(position, this.currentDirection)
            } else if (this.objectPool.isFull) {
                const position = { x: this.position.x, y: this.position.y }
                this.projectiles = this.objectPool.resetObjects(position, this.currentDirection)
            }
        }
    }

    checkDir(dKey) {
        this.direction[dKey] = true
        for (let key in this.direction) {
            if (key === dKey) continue
            this.direction[key] = false
        }
    }

    getPlayerDirection() {
        return this.direction.left ? "left" : "right"
    }

    getPlayerVerticalDirection() {
        if (this.verticalDirection.up) return "up"
        else if (this.verticalDirection.down) return "down"
        return null
    }

    checkVerticalDir(dKey) {
        this.verticalDirection[dKey] = true
        for (let key in this.verticalDirection) {
            if (key === dKey) continue
            this.verticalDirection[key] = false
        }
    }

    playerUpdate() {
        this.playerMove()
        this.projectiles.forEach((projectile) => {
            projectile.update(this.currentDirection)
        })
    }

    playerMove() {
        this.currentDirection = this.getPlayerDirection()
        this.currentVerticalDirection = this.getPlayerVerticalDirection()
        
        // Set velocity based on direction (no bounce-back)
        if (this.currentDirection === "right") {
            this.velocity.x = this.speed
        } else if (this.currentDirection === "left") {
            this.velocity.x = -this.speed
        } else {
            this.velocity.x = 0
        }
        
        // Vertical movement (no bounce-back)
        if (this.currentVerticalDirection === "up") {
            this.velocity.y = -this.speed
        } else if (this.currentVerticalDirection === "down") {
            this.velocity.y = this.speed
        } else {
            this.velocity.y = 0
        }
        
        // Update position
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        // Canvas wrapping for horizontal movement
        if (this.position.x > this.gameSize.width) {
            this.position.x = 0
        } else if (this.position.x < -this.playerSize.width) {
            this.position.x = this.gameSize.width
        }
        
        // Canvas wrapping for vertical movement (optional)
        if (this.position.y > this.gameSize.height) {
            this.position.y = 0
        } else if (this.position.y < -this.playerSize.height) {
            this.position.y = this.gameSize.height
        }
    }

    createProjectiles() {
        const position = { x: this.position.x, y: this.position.y }
        const options = { color: "red", radius: 10 }
        const projectile = new Projectile(position, options, this.gameSize)
        this.projectiles.push(projectile)
    }
}

export default Player

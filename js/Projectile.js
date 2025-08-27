class Projectile {
    constructor(position, gameSize) {
        this.position = { x: position.x, y: position.y };
        this.velocity = { x: 2, y: 2 };
        this.speed = 10;
        this.direction = null;
        this.isShot = false;
        this.gameSize = gameSize;
        this.deleted = false;
        this.size={}
        this.Hsize = { width: 50, height: 10 };
        this.Vsize={width:10,height:50}
    }

    draw(ctx) {
        if(this.direction==="left" || this.direction==="right"){
            this.size=this.Hsize
        }
        else if(this.direction==="up" || this.direction==="down"){
this.size=this.Vsize
        }
        if (this.deleted) return;
        
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        ctx.fill();
        ctx.closePath();
    }

    update(direction) {
        if (this.deleted) return;
        
        if (direction) {
            this.updatePlayerProjectile(direction);
        }
    }

    updatePlayerProjectile(direction) {
        if (this.position.x >= this.gameSize.width || 
            this.position.x <= 0 || 
            this.position.y >= this.gameSize.height || 
            this.position.y <= 0) {
            this.deleted = true;
            return;
        }

        if (!this.isShot) {
            this.direction = direction;
        } else {
            switch(this.direction) {
                case "up":
                    this.velocity.y = -this.speed;
                    this.velocity.x = 0;
                    break;
                case "down":
                    this.velocity.y = this.speed;
                    this.velocity.x = 0;
                    break;
                case "right":
                    this.velocity.x = this.speed;
                    this.velocity.y = 0;
                    break;
                case "left":
                    this.velocity.x = -this.speed;
                    this.velocity.y = 0;
                    break;
            }
            
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }
}

export default Projectile;

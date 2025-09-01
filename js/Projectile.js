class Projectile {
    constructor(position, gameSize,type,target) {
        this.position = { x: position.x, y: position.y };
        this.velocity = { x: 10, y: 10 };
        this.speed = 10;
        this.direction = null;
        this.isShot = false;
        this.gameSize = gameSize;
        this.deleted = false;
        this.size={}
        this.Hsize = { width: 50, height: 10 };
        this.Vsize={width:10,height:50}
        this.followDuration = 3000; // 3 seconds
        this.followStartTime = null;
        this.target = null;
        this.type=type
        this.hasStoppedFollowing = false;
    }

    drawImage(ctx) {
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

    update(direction, targetPos) {
        if (this.deleted) return;
        if (this.type==="player" && direction) {
            this.updatePlayerProjectile(direction,targetPos);
        }
    }

    updatePlayerProjectile(direction,targetPos) {
        if (this.position.x >= this.gameSize.width || 
            this.position.x <= 0 || 
            this.position.y >= this.gameSize.height || 
            this.position.y <= 0) {
            this.deleted = true;
            return;
        }

        if (!this.isShot) {
            this.direction = direction;
            this.isShot = true; // Set isShot to true so projectiles start moving
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
        }
       

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    


    updateAlienProjectile(target) {
        if (!this.followStartTime) {
            this.followStartTime = Date.now();
        }

        const elapsedTime = Date.now() - this.followStartTime;

        if (elapsedTime >= 1000) { // Follow for 1000ms
            this.hasStoppedFollowing = true;
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            return;
        }
        const dx = target.position.x - this.position.x;
        const dy = target.position.y - this.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 0) {
            this.velocity.x = (dx / distance) * this.speed;
            this.velocity.y = (dy / distance) * this.speed;
        }
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.x >= this.gameSize.width ||
            this.position.x <= 0 ||
            this.position.y >= this.gameSize.height ||
            this.position.y <= 0) {
            this.deleted = true;
        }
    }
    drawTarget(){

    }
}

export default Projectile;

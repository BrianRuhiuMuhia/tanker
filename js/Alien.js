import EnemyAsteroid from "./enemyAsteroid.js";
import Projectile from "./Projectile.js";

class Alien{
     constructor(gameSize,level,position,enemySize){
        this.enemyAsteroid=new EnemyAsteroid(gameSize,level,position,enemySize);
        this.projectiles = [];
     }
     update(player){
        this.enemyAsteroid.position.x += this.enemyAsteroid.velocity.x;
        this.enemyAsteroid.position.y += this.enemyAsteroid.velocity.y;
        if (this.enemyAsteroid.position.x > this.enemyAsteroid.gameSize.width) {
            this.enemyAsteroid.position.x = 0;
        } else if (this.enemyAsteroid.position.x < -this.enemyAsteroid.size.width) {
            this.enemyAsteroid.position.x = this.enemyAsteroid.gameSize.width;
        }
        if (this.enemyAsteroid.position.y > this.enemyAsteroid.gameSize.height) {
            this.enemyAsteroid.position.y = 0;
        } else if (this.enemyAsteroid.position.y < -this.enemyAsteroid.size.height) {
            this.enemyAsteroid.position.y = this.enemyAsteroid.gameSize.height;
        }
        if (Math.random() < 0.005 && this.projectiles.length < 10) {
            let projectile = new Projectile(this.enemyAsteroid.position, this.enemyAsteroid.gameSize, "alien", player);
            this.projectiles.push(projectile);
        }
        this.projectiles.forEach((projectile, index) => {
            if (projectile.deleted) {
        console.log("hello world")
            } else {
                projectile.updateAlienProjectile(player);
            }
        });
        this.enemyAsteroid.update();
     }
    }
export default Alien

import ObjectPool from "./ObjectPool.js";
import CollisionDetection from "./CollisionDetection.js";
class Enemy {
    constructor(gameSize,level, player) {
        this.level=level
        this.player = player;
        this.gameSize = gameSize;
        this.objectPool = new ObjectPool(gameSize, 10,this.level);
        this.enemies = this.getEnemy()

    } 

    draw(ctx) {
        this.enemies.filter((enemy) => {
            return enemy.enemyAsteroid.deleted === false;
        }).forEach((enemy) => {
            enemy.enemyAsteroid.draw(ctx);
        });
    }
getEnemy(){
    let enemy=[]
    let currentLevel=this.level["level"]
    
    if(currentLevel==="one"){
        enemy=this.objectPool.createAsteroids()
    }
    else if(currentLevel==="two"){
        enemy=this.objectPool.createAliens()
    }
    return enemy
}
    update() {
        this.enemies.forEach(enemy => {
            enemy.update(this.player)});
        this.checkCollision();
    }

    checkCollision() {
        this.enemies.forEach((enemy) => {
            if (enemy.enemyAsteroid.deleted) return; 
            const enemyPlayerCollision = CollisionDetection.checkCollision(enemy, this.player);
            if (enemyPlayerCollision) {
                this.player.statusBar.update(true);
                this.player.reduceHealth();
            }
        });

        this.player.projectiles.forEach((projectile) => {
            if (projectile.deleted) return;
            
            this.enemies.forEach((enemy) => {
                if (enemy.enemyAsteroid.deleted) return; 
                const enemyProjectileCollision = CollisionDetection.checkCollision(enemy, projectile);
                
                if (enemyProjectileCollision) {
                    projectile.deleted = true;
                    enemy.enemyAsteroid.statusBar.update(true) ? console.log("hello world") : console.log("projectile hit");
                    enemy.enemyAsteroid.reduceHealth();
                }
            });
        });
    }
} 

export default Enemy;

                

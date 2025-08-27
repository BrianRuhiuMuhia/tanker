import ObjectPool from "./ObjectPool.js";
import CollisionDetection from "./CollisionDetection.js";
class AsteroidBelt {
    constructor(gameSize,player) {
        this.player=player
        this.gameSize = gameSize;
        this.objectPool=new ObjectPool(gameSize,10);
        this.asteroids = this.objectPool.createAsteroids();
    } 
    
    draw(ctx) {
        this.asteroids.filter((asteroid)=>{
            return asteroid.deleted===false
        }).forEach((asteroid)=>{
            asteroid.draw(ctx)
        })
    }

    update() {
        this.asteroids.forEach(asteroid => asteroid.update());
        this.checkCollision();
    }

    checkCollision() {
this.asteroids.forEach((asteroid, asteroidIndex) => {
    if (asteroid.deleted) return; 
    const asteroidPlayerCollision = CollisionDetection.checkCollision(asteroid, this.player);
    if (asteroidPlayerCollision) {
        this.player.statusBar.update(true)
        this.player.reduceHealth()
    }
});

this.player.projectiles.forEach((projectile, projectileIndex) => {
    if (projectile.deleted) return;
    
    this.asteroids.forEach((asteroid, asteroidIndex) => {
        if (asteroid.deleted) return; 
        const asteroidProjectileCollision = CollisionDetection.checkCollision(asteroid, projectile);
        
        if(asteroidProjectileCollision){
            projectile.deleted=true
            asteroid.statusBar.update(true) ? console.log("hello world"):console.log("projectile hit")
        asteroid.reduceHealth()
            
        }
    });
});
    }
}

export default AsteroidBelt;


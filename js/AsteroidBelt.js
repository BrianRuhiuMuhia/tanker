
import ObjectPool from "./ObjectPool.js";
class AsteroidBelt {
    constructor(gameSize) {
        this.gameSize = gameSize;
        this.objectPool=new ObjectPool(gameSize,10);
        this.asteroids = this.objectPool.createAsteroids();
      
    } 
    draw(ctx) {
        console.log(this.asteroids)
        this.asteroids.forEach(asteroid => asteroid.draw(ctx));
    }

    update() {
        this.asteroids.forEach(asteroid => asteroid.update());
    }

    checkCollision(playerPosition, playerSize) {
        return this.asteroids.some(asteroid => {
            const dx = playerPosition.x - asteroid.position.x;
            const dy = playerPosition.y - asteroid.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < (playerSize.width + asteroid.enemySize.width) / 2;
        });
    }

    getAsteroidsInLane(yPosition, laneHeight = 100) {
        return this.asteroids.filter(asteroid => 
            Math.abs(asteroid.position.y - yPosition) < laneHeight
        );
    }
}

export default AsteroidBelt;

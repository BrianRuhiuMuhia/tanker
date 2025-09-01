import EnemyAsteroid from "./enemyAsteroid.js"
class Asteroid{
    constructor(gameSize,level,position,enemySize){
this.enemyAsteroid=new EnemyAsteroid(gameSize,level,position,enemySize) 

        }

    update(){
       if(this.enemyAsteroid.deleted)
            return
         this.enemyAsteroid.checkHealth()
        this.enemyAsteroid.position.x+=(this.enemyAsteroid.velocity.x * (Math.random()+1)*this.enemyAsteroid.speed)
        this.enemyAsteroid.position.y+=(this.enemyAsteroid.velocity.y* (Math.random()+1)*this.enemyAsteroid.speed)
       
        // Bounce off walls instead of wrapping around
        if (this.enemyAsteroid.position.x > this.enemyAsteroid.gameSize.width - this.enemyAsteroid.size.width) {
            this.enemyAsteroid.position.x = this.enemyAsteroid.gameSize.width - this.enemyAsteroid.size.width;
            this.enemyAsteroid.velocity.x *= -1; // Reverse x velocity
        } else if (this.enemyAsteroid.position.x < 0) {
            this.enemyAsteroid.position.x = 0;
            this.enemyAsteroid.velocity.x *= -1; // Reverse x velocity
        }
        
        if (this.enemyAsteroid.position.y > this.enemyAsteroid.gameSize.height - this.enemyAsteroid.size.height) {
            this.enemyAsteroid.position.y = this.enemyAsteroid.gameSize.height - this.enemyAsteroid.size.height;
            this.enemyAsteroid.velocity.y *= -1; // Reverse y velocity
        } else if (this.enemyAsteroid.position.y < 0) {
            this.enemyAsteroid.position.y = 0;
            this.enemyAsteroid.velocity.y *= -1; // Reverse y velocity
        }
    }
}

export default Asteroid

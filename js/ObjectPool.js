import Projectile from "./Projectile.js"
import Asteroid from "./Asteroid.js"
import Alien from "./Alien.js"
import { getRandomDimensions } from "./utility.js";

class ObjectPool{
    constructor(gameSize,maxPoolSize,level)
    {
        this.level=level
        this.pool=[]
        this.length=0
        this.maxPoolSize=maxPoolSize
        this.gameSize=gameSize
        this.index=0
        this.isFull=false
    }
createProjectiles(position,direction,type) {

        if (this.pool.length >= this.maxPoolSize) {
            this.isFull = true; 
            return this.pool; 
        }
        if(!this.isFull){      
            const projectile = new Projectile(position,this.gameSize,type);
            projectile.direction = direction;
            this.pool.push(projectile);
            this.length++; 
        }
    return this.pool;
}
createAsteroids(){
    const utility={
        randomFactor:5
    }
    let asteroidPosition={}
    let asteroidVelocity={}
    let asteroidSize={width:100,height:100}
    for (let i = 0; i < this.maxPoolSize; i++) {
            asteroidPosition =generateRandomXandYPos(asteroidSize,this.gameSize)
        const angle = Math.atan2(
            this.gameSize.height - asteroidPosition.y,
            this.gameSize.width - asteroidPosition.x
        );
        asteroidVelocity = {
            x: Math.cos(angle),
            y: Math.sin(angle) 
        };
        this.pool.push(new Asteroid(this.gameSize,this.level,asteroidPosition,asteroidSize));
        this.length++
    }
    this.isFull=true
    return this.pool
}
createAliens(){
    let alienSize={width:100,height:100}
    for (let i = 0; i < this.maxPoolSize; i++) {
        let alienPosition = {
            x: Math.random() * this.gameSize.width, // Random x position
            y: -alienSize.height // y < 0, off-screen top
        };
        this.pool.push(new Alien(this.gameSize,this.level,alienPosition,alienSize));
        this.length++
    }
    this.isFull=true
    return this.pool
}
// createAsteroids(){
//        for(let j = 0; j < this.maxPoolSize; j++) {
//             const size = getRandomDimensions();
//             const positionX = Math.random() > 0.5 
//                 ? this.gameSize.width + size.width 
//                 : 0 - size.width;
            
//             const positionY = Math.random() > 0.5 
//                 ? 0 - size.height 
//                 : this.gameSize.height + size.height;
            
//             const position = { x: positionX, y: positionY };
//             const speed = 1 + Math.random() * 3; 
//             const angle = Math.random() * Math.PI * 2; 
            
//             const velocity = {
//                 x: Math.cos(angle) * speed,
//                 y: Math.sin(angle) * speed
//             };
            
//             const asteroid = new Asteroid(
//                 position,
//                 this.gameSize,
//                 size,
//                 velocity
//             );
//             this.pool.push(asteroid);
//         }
//         return this.pool
// }
createEnemyProjectiles(position, target = null, isSmart = false){
    for(let i=0;i<2;i++){
        let options = {
            isSmart: isSmart,
            target: target,
            speed: 8, // Slightly faster than player projectiles
            followDuration: 3000 // 3 seconds
        }
        let projectile = new Projectile(position, this.gameSize, options)
        this.pool.push(projectile)
        this.length++
    }
    this.isFull=true
    return this.pool
}

 resetObjects(position, direction) {
    if (this.index < this.length) {
        this.pool[this.index].position = position;
        this.pool[this.index].direction = direction;
        this.pool[this.index].deleted=false
        this.index++;
    }
    else{
        this.index=0
    }
    return this.pool;
}
resetPool(){
    this.pool = [];
    return this.pool
}
    getSize(){
        return this.length
    }
}

// Helper function for random position generation
function generateRandomXandYPos(enemySize, gameSize) {
    return {
        x: gameSize.width + enemySize.width, // Start off-screen to the right
        y: Math.random() * (gameSize.height - enemySize.height) // Random Y position
    }
}

export default ObjectPool

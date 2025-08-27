import Projectile from "./Projectile.js"
import Enemy from "./Enemy.js"
import { getRandomDimensions } from "./utility.js";

class ObjectPool{
    constructor(gameSize,maxPoolSize)
    {
        this.pool=[]
        this.length=0
        this.maxPoolSize=maxPoolSize
        this.gameSize=gameSize
        this.index=0
        this.isFull=false
    }
createProjectiles(position,direction) {

        if (this.pool.length >= this.maxPoolSize) {
            this.isFull = true; 
            return this.pool; 
        }
        if(!this.isFull){      
            const projectile = new Projectile(position,this.gameSize);
            projectile.direction = direction;
            this.pool.push(projectile);
            this.length++; 
        }
    return this.pool;
}
createEnemies(enemySize){
    const utility={
        randomFactor:5
    }
    let enemyPosition={}
    let enemyVelocity={}
    for (let i = 0; i < this.maxPoolSize; i++) {
            enemyPosition =generateRandomXandYPos(enemySize,this.gameSize)
        const angle = Math.atan2(
            this.gameSize.height - enemyPosition.y,
            this.gameSize.width - enemyPosition.x
        );
        enemyVelocity = {
            x: Math.cos(angle),
            y: Math.sin(angle) 
        };
        this.pool.push(new Enemy(enemyPosition, this.gameSize,enemySize,enemyVelocity));
        this.length++
    }
    this.isFull=true
    return this.pool
}
createAsteroids(){
       for(let j = 0; j < this.maxPoolSize; j++) {
            const size = getRandomDimensions();
            const positionX = Math.random() > 0.5 
                ? this.gameSize.width + size.width 
                : 0 - size.width;
            
            const positionY = Math.random() > 0.5 
                ? 0 - size.height 
                : this.gameSize.height + size.height;
            
            const position = { x: positionX, y: positionY };
            const speed = 1 + Math.random() * 3; 
            const angle = Math.random() * Math.PI * 2; 
            
            const velocity = {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
            };
            
            const asteroid = new Enemy(
                position,
                this.gameSize,
                size,
                velocity
            );
            this.pool.push(asteroid);
        }
        return this.pool
}
createEnemyProjectiles(position){
    for(let i=0;i<2;i++){
let options={color:"lime",radius:5}
let projectile=new Projectile(position,options,this.gameSize)
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
        x: Math.random() * (gameSize.width - enemySize.width),
        y: Math.random() * (gameSize.height - enemySize.height)
    }
}

export default ObjectPool

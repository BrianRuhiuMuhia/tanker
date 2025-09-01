class CollisionDetection{
static collision={
    noOfCollisions:0,
    collidedObjects:{}
}
    static checkCollision(obj1,obj2){
        const dx = obj1.enemyAsteroid.position.x - obj2.position.x;
        const dy = obj1.enemyAsteroid.position.y - obj2.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
let collided = distance < (obj1.enemyAsteroid.size.width + obj2.size.width) / 2;
this.collision = {
    noOfCollisions: this.collision.noOfCollisions + 1,
    collidedObjects: {
        "object 1": obj1,
        "object 2": obj2
    }
}
return collided
    }
    static getCollisionObject(){
        return this.collision
    }
}
export default CollisionDetection

import CollisionDetection from "../js/CollisionDetection.js";

describe("CollisionDetection class", () => {
  beforeEach(() => {
    CollisionDetection.collision = { noOfCollisions: 0, collidedObjects: {} };
  });

  test("should detect collision between objects", () => {
    const obj1 = {
      enemyAsteroid: {
        position: { x: 100, y: 100 },
        size: { width: 50, height: 50 },
      },
    };
    const obj2 = {
      position: { x: 100, y: 100 },
      size: { width: 50, height: 50 },
    };

    const result = CollisionDetection.checkCollision(obj1, obj2);

    expect(result).toBe(true);
    expect(CollisionDetection.collision.noOfCollisions).toBe(1);
  });

  test("should not detect collision when objects are far apart", () => {
    const obj1 = {
      enemyAsteroid: {
        position: { x: 100, y: 100 },
        size: { width: 50, height: 50 },
      },
    };
    const obj2 = {
      position: { x: 200, y: 200 },
      size: { width: 50, height: 50 },
    };

    const result = CollisionDetection.checkCollision(obj1, obj2);

    expect(result).toBe(false);
  });

  test("should get collision object", () => {
    const collision = CollisionDetection.getCollisionObject();
    expect(collision).toEqual({ noOfCollisions: 0, collidedObjects: {} });
  });
});

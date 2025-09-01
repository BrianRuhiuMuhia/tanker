import ObjectPool from "../js/ObjectPool.js";
import Levels from "../js/Levels.js";

describe("ObjectPool class", () => {
  let objectPool;
  const gameSize = { width: 800, height: 600 };
  const maxPoolSize = 10;
  const level = Levels[0]["one"];

  beforeEach(() => {
    objectPool = new ObjectPool(gameSize, maxPoolSize, level);
  });

  test("should initialize with correct properties", () => {
    expect(objectPool.gameSize).toBe(gameSize);
    expect(objectPool.maxPoolSize).toBe(maxPoolSize);
    expect(objectPool.pool).toEqual([]);
    expect(objectPool.length).toBe(0);
    expect(objectPool.isFull).toBe(false);
  });

  test("should create projectiles", () => {
    const position = { x: 100, y: 100 };
    const direction = "right";
    const type = "player";

    const pool = objectPool.createProjectiles(position, direction, type);

    expect(pool.length).toBe(1);
    expect(pool[0].position).toEqual(position);
    expect(pool[0].direction).toBe(direction);
  });

  test("should create asteroids", () => {
    const asteroids = objectPool.createAsteroids();

    expect(asteroids.length).toBe(maxPoolSize);
    expect(objectPool.isFull).toBe(true);
  });

  test("should create aliens", () => {
    const aliens = objectPool.createAliens();

    expect(aliens.length).toBe(maxPoolSize);
    expect(objectPool.isFull).toBe(true);
  });

  test("should reset objects", () => {
    objectPool.pool = [{ position: { x: 0, y: 0 }, direction: "left", deleted: true }];
    const position = { x: 200, y: 200 };
    const direction = "right";

    const pool = objectPool.resetObjects(position, direction);

    expect(pool[0].position).toEqual(position);
    expect(pool[0].direction).toBe(direction);
    expect(pool[0].deleted).toBe(false);
  });

  test("should reset pool", () => {
    objectPool.pool = [{}, {}];
    const pool = objectPool.resetPool();

    expect(pool).toEqual([]);
  });

  test("should get pool size", () => {
    objectPool.pool = [{}, {}, {}];
    expect(objectPool.getSize()).toBe(3);
  });
});

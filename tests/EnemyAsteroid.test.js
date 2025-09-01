import EnemyAsteroid from "../js/enemyAsteroid.js";
import Levels from "../js/Levels.js";

describe("EnemyAsteroid class", () => {
  let enemyAsteroid;
  const gameSize = { width: 800, height: 600 };
  const level = Levels[0]["one"];
  const position = { x: 100, y: 100 };
  const enemySize = { width: 50, height: 50 };

  beforeEach(() => {
    enemyAsteroid = new EnemyAsteroid(gameSize, level, position, enemySize);
  });

  test("should initialize with correct properties", () => {
    expect(enemyAsteroid.position).toEqual(position);
    expect(enemyAsteroid.gameSize).toBe(gameSize);
    expect(enemyAsteroid.size).toEqual(enemySize);
    expect(enemyAsteroid.health).toBe(100);
    expect(enemyAsteroid.deleted).toBe(false);
  });

  test("should draw on canvas", () => {
    const ctx = {
      save: jest.fn(),
      translate: jest.fn(),
      rotate: jest.fn(),
      drawImage: jest.fn(),
      restore: jest.fn(),
    };
    enemyAsteroid.draw(ctx);
    expect(ctx.save).toHaveBeenCalled();
  });

  test("should reduce health", () => {
    const initialHealth = enemyAsteroid.health;
    enemyAsteroid.reduceHealth();
    expect(enemyAsteroid.health).toBe(initialHealth - 50);
  });

  test("should delete enemy when health is low", () => {
    enemyAsteroid.health = 10;
    enemyAsteroid.checkHealth();
    expect(enemyAsteroid.deleted).toBe(true);
  });

  test("should delete enemy manually", () => {
    enemyAsteroid.deleteEnemy();
    expect(enemyAsteroid.deleted).toBe(true);
  });
});

import Enemy from "../js/Enemy.js";
import Levels from "../js/Levels.js";

describe("Enemy class", () => {
  let enemy;
  const gameSize = { width: 800, height: 600 };
  const level = Levels[0]["one"];
  const player = {
    position: { x: 100, y: 100 },
    projectiles: [],
    statusBar: { update: jest.fn() },
    reduceHealth: jest.fn(),
  };

  beforeEach(() => {
    enemy = new Enemy(gameSize, level, player);
  });

  test("should initialize with object pool", () => {
    expect(enemy.objectPool).toBeDefined();
    expect(enemy.enemies).toBeDefined();
  });

  test("should create asteroids for level one", () => {
    const levelOne = { ...level, level: "one" };
    enemy = new Enemy(gameSize, levelOne, player);
    expect(enemy.enemies.length).toBeGreaterThan(0);
  });

  test("should create aliens for level two", () => {
    const levelTwo = { ...level, level: "two" };
    enemy = new Enemy(gameSize, levelTwo, player);
    expect(enemy.enemies.length).toBeGreaterThan(0);
  });

  test("should update enemies", () => {
    const updateSpy = jest.spyOn(enemy.enemies[0], "update");
    enemy.update();
    expect(updateSpy).toHaveBeenCalledWith(player);
  });

  test("should check collision and handle it", () => {
    // Mock collision
    enemy.enemies[0].enemyAsteroid.position = { x: 100, y: 100 };
    player.position = { x: 100, y: 100 };
    enemy.checkCollision();
    expect(player.statusBar.update).toHaveBeenCalled();
    expect(player.reduceHealth).toHaveBeenCalled();
  });
});

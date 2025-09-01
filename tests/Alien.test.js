import Alien from "../js/Alien.js";
import Levels from "../js/Levels.js";

describe("Alien class", () => {
  let alien;
  const gameSize = { width: 800, height: 600 };
  const level = Levels[1]["two"];
  const position = { x: 100, y: 100 };
  const enemySize = { width: 50, height: 50 };
  const player = { position: { x: 200, y: 200 } };

  beforeEach(() => {
    alien = new Alien(gameSize, level, position, enemySize);
  });

  test("should initialize with enemyAsteroid", () => {
    expect(alien.enemyAsteroid).toBeDefined();
    expect(alien.projectiles).toEqual([]);
  });

  test("should update alien position", () => {
    const initialX = alien.enemyAsteroid.position.x;
    alien.update(player);
    expect(alien.enemyAsteroid.position.x).not.toBe(initialX);
  });

  test("should create projectiles randomly", () => {
    // Mock Math.random to always return 0.001 to trigger projectile creation
    global.Math.random = jest.fn(() => 0.001);
    alien.update(player);
    expect(alien.projectiles.length).toBeGreaterThan(0);
    global.Math.random = Math.random; // Restore original
  });

  test("should update projectiles", () => {
    alien.projectiles = [{ updateAlienProjectile: jest.fn() }];
    alien.update(player);
    expect(alien.projectiles[0].updateAlienProjectile).toHaveBeenCalledWith(player);
  });
});

import Asteroid from "../js/Asteroid.js";
import Levels from "../js/Levels.js";

describe("Asteroid class", () => {
  let asteroid;
  const gameSize = { width: 800, height: 600 };
  const level = Levels[0]["one"];
  const position = { x: 100, y: 100 };
  const enemySize = { width: 50, height: 50 };

  beforeEach(() => {
    asteroid = new Asteroid(gameSize, level, position, enemySize);
  });

  test("should initialize with enemyAsteroid", () => {
    expect(asteroid.enemyAsteroid).toBeDefined();
    expect(asteroid.enemyAsteroid.position).toEqual(position);
    expect(asteroid.enemyAsteroid.size).toEqual(enemySize);
  });

  test("should update asteroid position", () => {
    const initialX = asteroid.enemyAsteroid.position.x;
    asteroid.update();
    expect(asteroid.enemyAsteroid.position.x).not.toBe(initialX);
  });
});

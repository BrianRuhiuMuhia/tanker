import Projectile from "../js/Projectile.js";

describe("Projectile class", () => {
  let projectile;
  const position = { x: 100, y: 100 };
  const gameSize = { width: 800, height: 600 };
  const type = "player";

  beforeEach(() => {
    projectile = new Projectile(position, gameSize, type);
  });

  test("should initialize with correct properties", () => {
    expect(projectile.position).toEqual(position);
    expect(projectile.gameSize).toBe(gameSize);
    expect(projectile.type).toBe(type);
    expect(projectile.deleted).toBe(false);
  });

  test("should draw image on canvas", () => {
    const ctx = {
      beginPath: jest.fn(),
      fillRect: jest.fn(),
      fill: jest.fn(),
      closePath: jest.fn(),
    };
    projectile.direction = "right";
    projectile.drawImage(ctx);
    expect(ctx.fillRect).toHaveBeenCalled();
  });

  test("should update player projectile position", () => {
    projectile.direction = "right";
    projectile.isShot = true;
    const initialX = projectile.position.x;
    projectile.updatePlayerProjectile("right");
    expect(projectile.position.x).toBeGreaterThan(initialX);
  });

  test("should mark projectile as deleted when out of bounds", () => {
    projectile.position.x = gameSize.width + 10;
    projectile.updatePlayerProjectile("right");
    expect(projectile.deleted).toBe(true);
  });

  test("should update alien projectile position and follow target", () => {
    const target = { position: { x: 200, y: 200 } };
    projectile.type = "alien";
    projectile.updateAlienProjectile(target);
    expect(projectile.position.x).not.toBe(100);
  });
});

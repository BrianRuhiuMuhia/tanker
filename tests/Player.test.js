import Player from "../js/Player.js";
import Levels from "../js/Levels.js";

describe("Player class", () => {
  let player;
  const gameSize = { width: 800, height: 600 };
  const level = Levels[0]["one"];

  beforeEach(() => {
    player = new Player(gameSize, level);
  });

  test("should initialize with correct properties", () => {
    expect(player.position.x).toBe(50);
    expect(player.position.y).toBe(gameSize.height / 2);
    expect(player.gameSize).toBe(gameSize);
    expect(player.size).toBe(level.player.size);
    expect(player.alive).toBe(true);
  });

  test("should move right", () => {
    const initialX = player.position.x;
    player.currentDirection = "right";
    player.playerMove();
    expect(player.position.x).toBe(initialX + player.velocity.x);
  });

  test("should move left", () => {
    const initialX = player.position.x;
    player.currentDirection = "left";
    player.playerMove();
    expect(player.position.x).toBe(initialX - player.velocity.x);
  });

  test("should move up", () => {
    const initialY = player.position.y;
    player.currentDirection = "up";
    player.playerMove();
    expect(player.position.y).toBe(initialY - player.velocity.y);
  });

  test("should move down", () => {
    const initialY = player.position.y;
    player.currentDirection = "down";
    player.playerMove();
    expect(player.position.y).toBe(initialY + player.velocity.y);
  });

  test("should wrap around screen horizontally", () => {
    player.position.x = gameSize.width + 10;
    player.playerMove();
    expect(player.position.x).toBe(0);
  });

  test("should wrap around screen vertically", () => {
    player.position.y = gameSize.height + 10;
    player.playerMove();
    expect(player.position.y).toBe(0);
  });

  test("should change direction on key press", () => {
    const event = { key: "ArrowRight" };
    player.updateRotation(event);
    expect(player.currentDirection).toBe("right");
  });

  test("should shoot projectile on space key", () => {
    const event = { key: " " };
    player.updateRotation(event);
    expect(player.projectiles.length).toBeGreaterThan(0);
  });

  test("should reduce health", () => {
    player.health = 100;
    const newHealth = player.reduceHealth();
    expect(newHealth).toBe(90);
  });

  test("should check health and die if below dead zone", () => {
    player.health = 5;
    player.checkHealth();
    expect(player.alive).toBe(false);
  });
});

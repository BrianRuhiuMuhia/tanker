import Background from "../js/Background.js";
import Levels from "../js/Levels.js";

describe("Background class", () => {
  let background;
  const gameSize = { width: 800, height: 600 };
  const level = Levels[0]["one"];

  beforeEach(() => {
    background = new Background(gameSize, level);
  });

  test("should initialize with correct properties", () => {
    expect(background.position).toEqual({ x: 0, y: 0 });
    expect(background.size).toBe(gameSize);
    expect(background.currentDirection).toBe(level.background.direction);
  });

  test("should update position for right direction", () => {
    background.currentDirection = "right";
    background.update("right");
    expect(background.position.x).toBe(-level.background.velocity.x);
  });

  test("should update position for left direction", () => {
    background.currentDirection = "left";
    background.update("left");
    expect(background.position.x).toBe(level.background.velocity.x);
  });

  test("should update position for up direction", () => {
    background.currentDirection = "up";
    background.update("up");
    expect(background.position.y).toBe(level.background.velocity.y);
  });

  test("should update position for down direction", () => {
    background.currentDirection = "down";
    background.update("down");
    expect(background.position.y).toBe(-level.background.velocity.y);
  });

  test("should wrap around horizontally", () => {
    background.position.x = -gameSize.width;
    background.update("right");
    expect(background.position.x).toBe(0);
  });

  test("should wrap around vertically", () => {
    background.position.y = -gameSize.height;
    background.update("down");
    expect(background.position.y).toBe(0);
  });
});

import Levels from "../js/Levels.js";

describe("Levels", () => {
  test("should have level one", () => {
    expect(Levels[0]).toHaveProperty("one");
    expect(Levels[0]["one"]).toHaveProperty("background");
    expect(Levels[0]["one"]).toHaveProperty("player");
    expect(Levels[0]["one"]).toHaveProperty("enemy");
    expect(Levels[0]["one"]).toHaveProperty("level");
  });

  test("should have level two", () => {
    expect(Levels[1]).toHaveProperty("two");
    expect(Levels[1]["two"]).toHaveProperty("background");
    expect(Levels[1]["two"]).toHaveProperty("player");
    expect(Levels[1]["two"]).toHaveProperty("enemy");
    expect(Levels[1]["two"]).toHaveProperty("level");
  });

  test("should have correct level one properties", () => {
    const levelOne = Levels[0]["one"];
    expect(levelOne.background.sprite).toBeDefined();
    expect(levelOne.player.sprite).toBeDefined();
    expect(levelOne.enemy.sprite).toBeDefined();
    expect(levelOne.level).toBe("one");
  });

  test("should have correct level two properties", () => {
    const levelTwo = Levels[1]["two"];
    expect(levelTwo.background.sprite).toBeDefined();
    expect(levelTwo.player.sprite).toBeDefined();
    expect(levelTwo.enemy.sprite).toBeDefined();
    expect(levelTwo.level).toBe("two");
  });
});

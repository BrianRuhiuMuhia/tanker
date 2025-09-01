import Game from "../js/Game.js";

describe("Game class", () => {
  let game;
  let canvas;
  const width = 800;
  const height = 600;

  beforeEach(() => {
    // Mock canvas and context
    canvas = {
      width: 0,
      height: 0,
      getContext: jest.fn(() => ({
        clearRect: jest.fn(),
      })),
    };
    game = new Game(canvas, width, height);
  });

  test("should initialize game with correct size", () => {
    expect(game.gameSize.width).toBe(width);
    expect(game.gameSize.height).toBe(height);
  });

  test("should set canvas width and height", () => {
    expect(canvas.width).toBe(width);
    expect(canvas.height).toBe(height);
  });

  test("should have player, enemy, background initialized", () => {
    expect(game.player).toBeDefined();
    expect(game.enemy).toBeDefined();
    expect(game.background).toBeDefined();
  });

  test("should clear canvas", () => {
    const ctx = game.getCtx();
    game.clearCanvas();
    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, width, height);
  });

  test("should update game state", () => {
    const playerUpdateSpy = jest.spyOn(game.player, "playerUpdate");
    const enemyUpdateSpy = jest.spyOn(game.enemy, "update");
    const backgroundUpdateSpy = jest.spyOn(game.background, "update");

    game.update();

    expect(playerUpdateSpy).toHaveBeenCalled();
    expect(enemyUpdateSpy).toHaveBeenCalled();
    expect(backgroundUpdateSpy).toHaveBeenCalledWith(game.player.currentDirection);
  });
});

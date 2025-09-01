import StatusBar from "../js/StatusBar.js";

describe("StatusBar class", () => {
  let statusBar;

  beforeEach(() => {
    statusBar = new StatusBar();
  });

  test("should initialize with default properties", () => {
    expect(statusBar.size).toEqual({ width: 80, height: 10 });
    expect(statusBar.color).toBe("lime");
    expect(statusBar.position).toBeNull();
  });

  test("should draw status bar on canvas", () => {
    const ctx = {
      save: jest.fn(),
      beginPath: jest.fn(),
      fillStyle: "lime",
      fillRect: jest.fn(),
      fill: jest.fn(),
      closePath: jest.fn(),
      restore: jest.fn(),
    };
    const position = { x: 100, y: 100 };

    statusBar.draw(ctx, position);

    expect(statusBar.position).toEqual({ x: position.x - 10, y: position.y - 30 });
    expect(ctx.save).toHaveBeenCalled();
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.fillStyle).toBe("lime");
    expect(ctx.fillRect).toHaveBeenCalledWith(statusBar.position.x, statusBar.position.y, statusBar.size.width, statusBar.size.height);
    expect(ctx.fill).toHaveBeenCalled();
    expect(ctx.closePath).toHaveBeenCalled();
    expect(ctx.restore).toHaveBeenCalled();
  });

  test("should update size on collision", () => {
    const initialWidth = statusBar.size.width;
    const result = statusBar.update(true);

    expect(statusBar.size.width).toBe(initialWidth - 10);
    expect(result).toBe(false); // Not dead yet
  });

  test("should return true when health is zero", () => {
    statusBar.size.width = 10;
    const result = statusBar.update(true);

    expect(result).toBe(true);
  });

  test("should change color", () => {
    statusBar.changeColor("red");
    expect(statusBar.color).toBe("red");
  });
});

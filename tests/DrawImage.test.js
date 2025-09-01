import DrawImage from "../js/DrawImage.js";

describe("DrawImage class", () => {
  let drawImage;
  const sprite = { width: 100, height: 100 };
  const position = { x: 50, y: 50 };
  const origin = { x: 0, y: 0 };
  const rotation = 0;
  const size = { width: 100, height: 100 };

  beforeEach(() => {
    drawImage = new DrawImage(sprite, position, origin, rotation, size);
  });

  test("should initialize with correct rotation", () => {
    expect(drawImage.rotation).toBe(rotation);
  });

  test("should draw sprite on canvas", () => {
    const ctx = {
      save: jest.fn(),
      translate: jest.fn(),
      rotate: jest.fn(),
      drawImage: jest.fn(),
      restore: jest.fn(),
    };

    drawImage.drawSprite(ctx);

    expect(ctx.save).toHaveBeenCalled();
    expect(ctx.translate).toHaveBeenCalledWith(position.x, position.y);
    expect(ctx.rotate).toHaveBeenCalledWith(rotation * (Math.PI / 180));
    expect(ctx.drawImage).toHaveBeenCalledWith(
      sprite,
      0, 0, sprite.width, sprite.height,
      -origin.x, -origin.y,
      size.width || sprite.width, size.height || sprite.height
    );
    expect(ctx.restore).toHaveBeenCalled();
  });

  test("should throw error if sprite or size is missing", () => {
    const invalidDrawImage = new DrawImage(null, position, origin, rotation, null);
    const ctx = {};

    expect(() => invalidDrawImage.drawSprite(ctx)).toThrow("Empty Sprite or Size:Class DrawImage,Method draw(ctx)");
  });

  test("should draw static image", () => {
    const ctx = {
      beginPath: jest.fn(),
      fillStyle: "red",
      fillRect: jest.fn(),
      fill: jest.fn(),
      closePath: jest.fn(),
    };

    DrawImage.drawImage(ctx, position, size);

    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.fillStyle).toBe("red");
    expect(ctx.fillRect).toHaveBeenCalledWith(position.x, position.y, size.width, size.height);
    expect(ctx.fill).toHaveBeenCalled();
    expect(ctx.closePath).toHaveBeenCalled();
  });
});

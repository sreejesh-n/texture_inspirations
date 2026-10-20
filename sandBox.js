const r = require("raylib");

function setup(WIDTH, HEIGHT, title, FPS) {
  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WIDTH, HEIGHT, title);
  r.SetTargetFPS(FPS);

  const screen = { WIDTH, HEIGHT };
  const texture = {
    target: r.LoadRenderTexture(64, 32),
    width: 64,
    height: 32,
  };
  drawTexture(texture.target);

  return { texture, screen };
}

function drawPattern_01(texture, posX, posY, height, width) {
  const target = texture.target;
  const noOfRows = Math.floor(height / texture.height);
  const noOfColumns = Math.floor(width / texture.width);

  for (let row = 0; row < noOfRows; row++) {
    for (let column = 0; column < noOfColumns; column++) {
      const x = texture.width * column + posX;
      const y = texture.height * row + posY;

      r.DrawTexture(target.texture, x, y, r.WHITE);
    }
  }
}

function drawTexture(target) {
  r.BeginTextureMode(target);
  //   r.ClearBackground(r.BLACK);

  const v1 = { x: 0, y: 32 };
  const v2 = { x: 32, y: 32 };
  const v3 = { x: 32, y: 0 };
  const v4 = { x: 64, y: 0 };

  r.DrawTriangle(v1, v2, v3, r.WHITE);
  r.DrawTriangle(v2, v4, v3, r.WHITE);

  r.EndTextureMode();
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.DARKBLUE);

  //   r.DrawTexture(world.texture.target.texture, 10, 10, r.WHITE);
  drawPattern_01(world.texture, 10, 10, 328, 328);

  r.EndDrawing();
}

function loop(world) {
  while (!r.WindowShouldClose()) {
    draw(world);
  }
}

function tearDown() {
  r.CloseWindow();
}

function main() {
  const WIDTH = 1024;
  const HEIGHT = 1024;
  const title = "Sandbox";
  const FPS = 60;

  const world = setup(WIDTH, HEIGHT, title, FPS);
  loop(world);

  tearDown();
}

main();

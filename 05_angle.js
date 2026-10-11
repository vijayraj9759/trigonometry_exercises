const r = require("raylib");

function setup() {
    const WIDTH = 1000;
    const HEIGHT = 1000;
    const FPS = 80;

    r.InitWindow(WIDTH, HEIGHT, "circle_Points");
    r.SetTargetFPS(FPS);

    const palatte = {
        bg: r.WHITE,
        0: r.BLACK,
        1: r.RED,
    };

    const A = {
        x: 100,
        y: 300,
    };

    const B = {
        x: 150,
        y: 400,
    };

    const world = {
        width: WIDTH,
        height: HEIGHT,
        palatte,
        A,
        B,
    };
    return world;
}

function radianToDegree(radian) {
    return (radian * 180) / Math.PI;
}

function approximate(angle) {
    return Math.trunc(angle * 100) / 100;
}

function draw(world) {
    const c = { x: world.B.x, y: world.A.y };

    const distanceAC = Math.abs(c.x - world.A.x);
    const distanceBC = Math.abs(c.y - world.B.y);

    const radianAngle = Math.atan2(distanceBC, distanceAC);
    const degreeAngle = approximate(radianToDegree(radianAngle));

    r.DrawLineV(world.A, world.B, r.BLACK);
    r.DrawLineV(world.A, c, r.BLACK);
    r.DrawLineV(world.B, c, r.BLACK);

    r.DrawText(`${degreeAngle}`, 50, 350, 16, world.palatte[1]);
}

function loop(world) {
    while (!r.WindowShouldClose()) {
        r.BeginDrawing();
        r.ClearBackground(world.palatte.bg);

        draw(world);
        r.EndDrawing();
    }
}

function main() {
    const world = setup();
    loop(world);
}

main();

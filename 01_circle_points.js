const r = require("raylib");

function setup() {
    const WIDTH = 400;
    const HEIGHT = 400;
    const FPS = 80;

    r.InitWindow(WIDTH, HEIGHT, "circle_Points");
    r.SetTargetFPS(FPS);

    const palatte = {
        bg: r.WHITE,
        0: r.BLACK,
        1: r.RED,
    };

    const circle = {
        center: { x: 200, y: 200 },
        radius: 150,
    };

    const points = 12;
    const angleBetweenPoints = 360 / points;

    const world = {
        width: WIDTH,
        height: HEIGHT,
        palatte,
        circle,
        points,
        angleBetweenPoints,
    };
    return world;
}

function degreeToRadian(degrees) {
    return (degrees * Math.PI) / 180;
}

function calculateCoordinate(world, currentCircle) {
    const angleFromOrigin = world.angleBetweenPoints * currentCircle;
    const radian = degreeToRadian(angleFromOrigin);

    const x = world.circle.center.x + world.circle.radius * Math.cos(radian);
    const y = world.circle.center.y + world.circle.radius * Math.sin(radian);

    return { x, y };
}

function drawPoints(world) {
    for (let i = 0; i < world.points; i++) {
        const coordinates = calculateCoordinate(world, i);
        r.DrawCircleV(coordinates, 10, world.palatte[1]);
    }
}

function draw(world) {
    r.DrawCircleV(world.circle.center, world.circle.radius, world.palatte[0]);
    drawPoints(world);
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

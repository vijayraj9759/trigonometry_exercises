const r = require("raylib");

function setup() {
    const WIDTH = 1000;
    const HEIGHT = 1000;
    const FPS = 80;

    r.InitWindow(WIDTH, HEIGHT, "ellipse");
    r.SetTargetFPS(FPS);

    const palatte = {
        bg: r.WHITE,
        0: r.BLACK,
        1: r.RED,
    };

    const ellipse = {
        center: { x: 500, y: 200 },
        radiusH: 300,
        radiusV: 100,
    };

    const world = {
        width: WIDTH,
        height: HEIGHT,
        palatte,
        ellipse,
    };

    return world;
}

function degreeToRadian(degrees) {
    return (degrees * Math.PI) / 180;
}

function calculateCoordinate(ellipse, currentPoint) {
    const angleFromOrigin = currentPoint;
    const radian = degreeToRadian(angleFromOrigin);

    const x = ellipse.center.x + ellipse.radiusH * Math.cos(radian);
    const y = ellipse.center.y + ellipse.radiusV * Math.sin(radian);

    return { x, y };
}

function calculateEllipseCoordinate(world) {
    const ellipseCoordinates = [];

    for (let i = 0; i <= 360; i++) {
        ellipseCoordinates[i] = calculateCoordinate(world.ellipse, i);
    }

    return ellipseCoordinates;
}

function drawEllipse(ellipseCoordinates, color) {
    const size = ellipseCoordinates.length;

    for (let i = 0; i < size; i++) {
        r.DrawLineV(
            ellipseCoordinates[i % size],
            ellipseCoordinates[(i + 1) % size],
            color,
        );
    }
}

function draw(world) {
    const ellipseCoordinates = calculateEllipseCoordinate(world);
    drawEllipse(ellipseCoordinates, world.palatte[0]);
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

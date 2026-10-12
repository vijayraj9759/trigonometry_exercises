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

    const pattern = {
        center: { x: 500, y: 500 },
        radius: 60,
        deltaRadius: 2,
        angle: 20,
        deltaAngle: 20,
        points: 100,
    };

    const world = {
        width: WIDTH,
        height: HEIGHT,
        palatte,
        pattern,
    };

    return world;
}

function degreeToRadian(degrees) {
    return (degrees * Math.PI) / 180;
}

function calculateCoordinate(radius, angle) {
    const radian = degreeToRadian(angle);

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    return { x, y };
}

function generatePolarCoordinate(pattern) {
    let radiusToCalculate = pattern.radius;
    let angleToCalculate = pattern.angle;

    const coordinates = [];

    for (let i = 0; i < pattern.points; i++) {
        radiusToCalculate += pattern.deltaRadius;
        angleToCalculate += pattern.deltaAngle;

        coordinates[i] = calculateCoordinate(
            radiusToCalculate,
            angleToCalculate,
        );
    }

    return coordinates;
}

function generateScreenCoordinates(coordinates, pattern) {
    const size = coordinates.length;

    for (let i = 0; i < size; i++) {
        coordinates[i].x = coordinates[i].x + pattern.center.x;
        coordinates[i].y = coordinates[i].y + pattern.center.y;
    }

    return coordinates;
}

function drawCoordinates(coordinates) {
    const size = coordinates.length;

    for (let i = 0; i < size; i++) {
        const st = coordinates[i % size];
        const end = coordinates[(i + 1) % size];

        r.DrawLineV(end, st, r.RED);
    }
}

function draw(world) {
    const polarCoordinates = generatePolarCoordinate(world.pattern);
    const screenCoordinates = generateScreenCoordinates(
        polarCoordinates,
        world.pattern,
    );

    drawCoordinates(screenCoordinates);
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

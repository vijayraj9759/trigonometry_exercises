const r = require("raylib");

function setup() {
    const WIDTH = 400;
    const HEIGHT = 400;
    const FPS = 80;

    r.InitWindow(WIDTH, HEIGHT, "polygon");
    r.SetTargetFPS(FPS);

    const palatte = {
        bg: r.WHITE,
        0: r.BLACK,
        1: r.RED,
    };

    const polygon = {
        center: { x: 200, y: 200 },
        radius: 150,
        noOfSides: 7,
    };

    polygon.angle = 360 / polygon.noOfSides;

    const world = {
        width: WIDTH,
        height: HEIGHT,
        palatte,
        polygon,
    };
    return world;
}

function degreeToRadian(degrees) {
    return (degrees * Math.PI) / 180;
}

function calculateCoordinate(world, currentVertex) {
    const angleFromOrigin = world.polygon.angle * currentVertex;
    const radian = degreeToRadian(angleFromOrigin);

    const x = world.polygon.center.x + world.polygon.radius * Math.cos(radian);
    const y = world.polygon.center.y + world.polygon.radius * Math.sin(radian);

    return { x, y };
}

function calculatePolygonCoordinate(world) {
    const polygonCoordinates = [];

    for (let i = 0; i < world.polygon.noOfSides; i++) {
        polygonCoordinates[i] = calculateCoordinate(world, i);
    }

    return polygonCoordinates;
}

function drawPolygon(polygonCoordinates, color) {
    const size = polygonCoordinates.length;

    for (let i = 0; i < size; i++) {
        r.DrawLineV(
            polygonCoordinates[i % size],
            polygonCoordinates[(i + 1) % size],
            color,
        );
    }
}

function draw(world) {
    const polygonCoordinates = calculatePolygonCoordinate(world);
    drawPolygon(polygonCoordinates, world.palatte[0]);
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

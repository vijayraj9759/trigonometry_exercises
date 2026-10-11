const r = require("raylib");

function setup() {
    const WIDTH = 600;
    const HEIGHT = 400;
    const FPS = 80;

    r.InitWindow(WIDTH, HEIGHT, "polygon");
    r.SetTargetFPS(FPS);

    const palatte = {
        bg: r.WHITE,
        0: r.BLACK,
        1: r.RED,
    };

    const graph = {
        origin: { x: 200, y: 200 },
        xAxisCoordinate: { st: { x: 50, y: 200 }, end: { x: 550, y: 200 } },
        yAxisCoordiante: { st: { x: 50, y: 50 }, end: { x: 50, y: 350 } },
    };

    const world = {
        width: WIDTH,
        height: HEIGHT,
        palatte,
        graph,
    };

    return world;
}

function degreeToRadian(degrees) {
    return (degrees * Math.PI) / 180;
}

function drawLine(coordinates, color) {
    r.DrawLineV(coordinates.st, coordinates.end, color);
}

function drawGraph(world) {
    drawLine(world.graph.xAxisCoordinate, world.palatte[0]);
    drawLine(world.graph.yAxisCoordiante, world.palatte[0]);
}

function trigonometryFuncValues(trigoFunc) {
    const values = [];

    for (let i = 0; i <= 360; i++) {
        const radian = degreeToRadian(i);
        values[i] = trigoFunc(radian);
    }

    return values;
}

function mapX(value, axisCoordinate) {
    const st = axisCoordinate.st.x;
    const end = axisCoordinate.end.x;

    return st + ((end - st) / 360) * value;
}

function mapY(value, axisCoordinate) {
    const st = axisCoordinate.st.y;
    const end = axisCoordinate.end.y;

    return st + Math.ceil(((end - st) / 20) * 10) * (1 - value);
}

function mapCoordinates(coordinates, graph) {
    const xCoordinate = mapX(coordinates.angle, graph.xAxisCoordinate);
    const yCoordinate = mapY(coordinates.value, graph.yAxisCoordiante);

    return { x: xCoordinate, y: yCoordinate };
}

function drawValues(values, world, color) {
    const size = values.length;

    for (let i = 0; i < size - 1; i++) {
        const st = {
            angle: i,
            value: values[i],
        };

        const end = {
            angle: i + 1,
            value: values[i + 1],
        };

        const mappedSt = mapCoordinates(st, world.graph);
        const mappedEnd = mapCoordinates(end, world.graph);

        r.DrawLineV(mappedSt, mappedEnd, color);
    }
}

function drawFunctionWave(world, trigoFunc) {
    const functionValues = trigonometryFuncValues(trigoFunc);

    drawValues(functionValues, world, world.palatte[0]);
}

function draw(world) {
    drawGraph(world);
    drawFunctionWave(world, Math.sin);
    drawFunctionWave(world, Math.cos);
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

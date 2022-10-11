const canvas = document.getElementById("allInOne");
const ctx = canvas.getContext("2d");

let rectangles2 = [
    [
        [200, 100], //top
        [300, 200], //right
        [200, 300], //bottom
        [100, 200]  //left
    ],
    [
        [500, 25], //top
        [550, 150], //right
        [500, 275], //bottom
        [450, 150]  //left
    ],
    [
        [1050, 600], //top
        [1000, 650], //right
        [1050, 700], //bottom
        [1100, 650]  //left
    ],
]

let rectangleCenters = [
    [200, 200],
    [500, 150],
    [1050, 650]
]

let triangles2 = [
    [
        [200, 700], //base
        [200, 500], //top
    ],
    [
        [505, 500], //base
        [500, 400], //top
    ],
    [
        [1100, 150], //base
        [1000, 100], //top
    ]
]

let circles = [
    [
        [700, 50],
        [750, 100]
    ],
    [
        [800, 380],
        [900, 400]
    ],
    [
        [800, 650],
        [850, 700]
    ],
]

const rects2 = new Rectangles(canvas, rectangles2, rectangleCenters, () => null, false)
const tris2 = new Triangles(canvas, triangles2, () => null, false);
const circs = new Circles(canvas, circles, () => null, false)

const onDraw = (callbacks) => {
    rects2.intersections = [];
    tris2.intersections = [];
    circs.intersections = [];

    ctx.clearRect(0, 0, 1200, 800);

    const rectVertexList = rectangles2.map((rect, index) => getRectVertex(rect, rectangleCenters[index]))

    const rectSidesList = getRectSides(rectangles2, rectangleCenters); 

    const triVertexList = triangles2.map(tri => getTriVertex(...tri));

    const triSidesList = getTriSides(triVertexList);

    const vertexList = [...rectVertexList, ...triVertexList];
    const sidesList = [...rectSidesList, ...triSidesList];

    const intersections = getIntersections(sidesList);
    const circsPolyIntersections = getCircsPolyIntersections(circles, sidesList);

    const contains = getContains(...vertexList);
    const circsPolyContains = getCircsPolyContains(circles, vertexList);

    const circsIntersectionsContains = getCircsIntersectionsContains(circles);

    let intersectionsContains = [
        ...intersections,
        ...contains,
        ...circsPolyIntersections,
        ...circsPolyContains,
        ...circsIntersectionsContains
    ];

    intersectionsContains = intersectionsContains.filter((iOrC, index) => intersectionsContains.indexOf(iOrC) == index).sort();

    intersectionsContains.forEach(iOrC => {
        if(iOrC < 3) rects2.intersections.push(iOrC)
        else if(iOrC < 6) tris2.intersections.push(iOrC - 3)
        else circs.intersections.push(iOrC - 6)
    })

    callbacks.forEach(callback => callback())
}

const onDrawRectangle = () => onDraw([
    () => tris2.draw(true),
    () => circs.draw(true)
]);

const onDrawTriangle = () => onDraw([
    () => rects2.draw(true),
    () => circs.draw(true)
]);

const onDrawCircle = () => onDraw([
    () => rects2.draw(true),
    () => tris2.draw(true)
]);

rects2.onDraw = onDrawRectangle;
tris2.onDraw = onDrawTriangle;
circs.onDraw = onDrawCircle;

rects2.draw();
tris2.draw();
circs.draw();

canvas.onmousedown = (e => {
    const mouse = [e.offsetX, e.offsetY];
    prevMouse = mouse;
    canvas.onmousemove = null;

    rects2.onMouseDown(mouse);

    tris2.onMouseDown(mouse);

    circs.onMouseDown(mouse);
})

canvas.onmouseup = () => canvas.onmousemove = null;

const rectCanvas = document.getElementById("rectXrect");
const rectCtx = rectCanvas.getContext("2d");

let rectangles = [
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

let rectCenters = [
    [200, 200],
    [500, 150],
    [1050, 650]
]

const rects = new Rectangles(rectCanvas, rectangles, rectCenters, () => null)

const onDrawRect = () => {
    rects.intersections = [];
    setPencilColor(rectCtx, 'black')

    const rectVertexList = rectangles.map((rect, index) => getRectVertex(rect, rectCenters[index]))

    const rectSidesList = getRectSides(rectangles, rectCenters); 
    
    const intersections = getIntersections(rectSidesList)
    const contains = getContains(...rectVertexList)

    let intersectionsContains = [...intersections, ...contains]

    intersectionsContains = intersectionsContains.filter((iOrC, index) => intersectionsContains.indexOf(iOrC) == index).sort()

    rects.intersections.push(...intersectionsContains)
}

rects.onDraw = onDrawRect;

rects.draw();

rects.eventListeners();
const triCanvas = document.getElementById("triXtri");
const triCtx = triCanvas.getContext("2d");

let triangles = [
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

const tris = new Triangles(triCanvas, triangles, () => null);

const onDrawTri = () => {
    tris.intersections = [];
    setPencilColor(triCtx, 'black')

    const triVertexList = triangles.map(tri => getTriVertex(...tri));

    const triSidesList = getTriSides(triVertexList)

    const intersections = getIntersections(triSidesList)
    const contains = getContains(...triVertexList)

    let intersectionsContains = [...intersections, ...contains]

    intersectionsContains = intersectionsContains.filter((iOrC, index) => intersectionsContains.indexOf(iOrC) == index).sort()

    tris.intersections.push(...intersectionsContains)
}

tris.onDraw = onDrawTri;

tris.draw();

tris.eventListeners();


// tris.intersections = [];

// const triVertexList = triangles.map(tri => getTriVertex(...tri))

// const triSidesList = getTriSides(triVertexList)

// const tri1Tri2Intersect = getIntersections([triSidesList[0], triSidesList[1]]);
// const tri1Tri3Intersect = getIntersections([triSidesList[0], triSidesList[2]]);
// const tri2Tri3Intersect = getIntersections([triSidesList[1], triSidesList[2]]);

// const tri1Tri2Contain = getContains(triVertexList[0], triVertexList[1]) || getContains(triVertexList[1], triVertexList[0])
// const tri1Tri3Contain = getContains(triVertexList[0], triVertexList[2]) || getContains(triVertexList[2], triVertexList[0])
// const tri2Tri3Contain = getContains(triVertexList[1], triVertexList[2]) || getContains(triVertexList[2], triVertexList[1])

// const intersectionsContains = [
//     (
//         tri1Tri2Intersect ||
//         tri1Tri3Intersect ||
//         tri1Tri2Contain ||
//         tri1Tri3Contain
//     ),
//     (
//         tri1Tri2Intersect ||
//         tri2Tri3Intersect ||
//         tri1Tri2Contain ||
//         tri2Tri3Contain
//     ),
//     (
//         tri1Tri3Intersect ||
//         tri2Tri3Intersect ||
//         tri1Tri3Contain ||
//         tri2Tri3Contain
//     )
// ]

// intersectionsContains.forEach((intersection, index) => {
//     if(intersection) tris.intersections.push(index)
// })
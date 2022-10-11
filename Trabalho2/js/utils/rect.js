function getOpositivePoint(rect, pointIndex) {
    return rect[(pointIndex + 2) % 4]
}

function getAdjacentPoints(rect, pointIndex) {
    return [
        rect[(pointIndex + 1) % 4],
        rect[(pointIndex + 3) % 4]
    ]
}

function getRectVertex(pointList, center) {
    const [top, right, _, left] = pointList;

    const verticalCenterDistance = vec2.sub([], top, center);

    return [
        vec2.add([], right, [-verticalCenterDistance[0], -verticalCenterDistance[1]]),
        vec2.add([], right, verticalCenterDistance),
        vec2.add([], left, verticalCenterDistance),
        vec2.add([], left, [-verticalCenterDistance[0], -verticalCenterDistance[1]])
    ]
}

function getRectSides(rects, centers) {
    const rectVertexList = rects.map((rect, index) => getRectVertex(rect, centers[index]));

    const rectSidesList = rectVertexList.map(rectVertex => {
        const [bottomRight, topRight, topLeft, bottomLeft] = rectVertex;

        return [
            [bottomRight, topRight],
            [topRight, topLeft],
            [topLeft, bottomLeft],
            [bottomLeft, bottomRight]
        ]
    });

    return rectSidesList;
}
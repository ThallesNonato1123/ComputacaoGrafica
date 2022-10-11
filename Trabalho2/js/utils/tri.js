function getTriVertex(basePoint, oppositeVertex) {
    const u = vec2.sub([], basePoint, oppositeVertex);
    const v = [-u[1], u[0]];
    const w = [u[1], -u[0]];

    return [
        oppositeVertex,
        vec2.add([], basePoint, v),
        vec2.add([], basePoint, w)
    ];
}

function getTriSides(triVertexList) {
    const triSidesList = triVertexList.map(vertex => {
        const [ top, left, right ] = vertex;

        return [
            [top, left],
            [left, right],
            [right, top]
        ]
    });

    return triSidesList;
}
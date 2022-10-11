function getCircsIntersectionsContains(circles) {
    let intersetionsContains = []
    
    circles.forEach((circle, index) => {
        circles.forEach((circle2, index2) => {
            if(index === index2) return;

            const circRadius = vec2.distance(circle[0], circle[1]);
            const circRadius2 = vec2.distance(circle2[0], circle2[1]);

            const circsCenterDistance = vec2.distance(circle[1], circle2[1]);

            const intersectionContain = circsCenterDistance < (circRadius + circRadius2); 

            if(intersectionContain) intersetionsContains.push(index + 6, index2 + 6);
        })
    })

    intersetionsContains = intersetionsContains.filter((intersetionsContain, index) => intersetionsContains.indexOf(intersetionsContain) == index)

    return intersetionsContains;
} 

function getCircsPolyIntersections(circles, polygonsSides) {
    let intersections = []

    circles.forEach((circle, circIndex) => {
        const circRadius = vec2.distance(circle[0], circle[1]);

        polygonsSides.forEach((polygon, polygonIndex) => {
            polygon.forEach(side => {
                const intersection = (distToSegment(circle[1], ...side) < circRadius)

                if (intersection) intersections.push(circIndex + 6, polygonIndex)
            })
        })
    })

    intersections = intersections.filter((intersection, index) => intersections.indexOf(intersection) == index)

    return intersections;
}

function getCircsPolyContains(circles, polygonsVertex) {
    let contains = [];

    circles.forEach((circle, circIndex) => {
        polygonsVertex.forEach((polygon, polygonIndex) => {
            const contain = pointInConvexPoly(circle[1], polygon)

            if (contain) contains.push(circIndex + 6, polygonIndex)
        })
    })

    contains = contains.filter((contain, index) => contains.indexOf(contain) == index)

    return contains;
}
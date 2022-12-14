function orient(a, b, c) {
  return Math.sign(
    mat3.determinant([1, a[0], a[1], 1, b[0], b[1], 1, c[0], c[1]])
  );
}

function segmentsIntersect(a, b, c, d) {
  return (
    Math.abs(orient(a, b, c) - orient(a, b, d)) >= 1 &&
    Math.abs(orient(c, d, a) - orient(c, d, b)) >= 1
  );
}

function dist([x0, y0], [x1, y1]) {
  return Math.hypot(x1 - x0, y1 - y0);
}

function distToSegment(p, a, b) {
  const v = vec2.sub([], b, a);
  const vlen = dist(a, b);
  const vnorm = vec2.scale([], v, 1 / vlen);
  const ap = vec2.sub([], p, a);
  const t = vec2.dot(vnorm, ap);
  if (t < 0) return dist(p, a);
  if (t > vlen) return dist(p, b);
  return vec2.len(vec2.sub([], ap, vec2.scale([], vnorm, t)));
}

function pointInConvexPoly(p, poly) {
  let prevPoint = poly[poly.length - 1];
  let prevOrient = 0;
  for (let q of poly) {
    const o = orient(prevPoint, q, p);
    if (Math.abs(o - prevOrient) > 1) return false;
    prevOrient = o;
    prevPoint = q;
  }
  return true;
}

function xContainY(x, y) {
  // x e y são listas de vertices
  const contains = y.some(vertex => pointInConvexPoly(vertex, x))

  return contains;
}

function getContains(...vertexList) {
  let contains = [];

  vertexList.forEach((vertices, index) =>
    vertexList.forEach((vertices2, index2) => {
      if (index === index2) return

      const contain = xContainY(vertices, vertices2)
      if (contain) contains.push(index, index2)
    })
  )

  contains = contains.filter((contain, index) => contains.indexOf(contain) == index)

  return contains;
}

function getIntersections(sidesList) {
  let intersections = []

  sidesList.forEach((sides, index) =>
    sides.forEach(side =>
      sidesList.forEach((sides2, index2) => {
        if (index === index2) return;

        sides2.forEach(side2 => {
          const intersection = segmentsIntersect(...side, ...side2);
          if (intersection) intersections.push(index, index2)
        })
      })
    )
  );

  intersections = intersections.filter((intersection, index) => intersections.indexOf(intersection) == index)

  return intersections;
}
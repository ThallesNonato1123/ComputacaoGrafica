class Rectangles {
    constructor(canvas, rects, rectCenters, onDraw, clearOnDraw = true) {
        this._canvas = canvas;
        this._rects = rects;
        this._rectCenters = rectCenters;
        this.onDraw = onDraw;
        this._ctx = canvas.getContext("2d");
        this._clearOnDraw = clearOnDraw;
        this.intersections = []
    }

    draw(disableOnDraw = false) {
        if (this._clearOnDraw) this._ctx.clearRect(0, 0, 1200, 800);

        if (!disableOnDraw) this.onDraw();

        this._rects.forEach((rect, index) => {
            setPencilColor(this._ctx, this.intersections.includes(index) ? 'red' : 'black')

            const center = this._rectCenters[index]

            this._ctx.beginPath();
            this._ctx.arc(...center, 6, 0, 2 * Math.PI);
            this._ctx.fill();
            this._ctx.stroke();

            rect.forEach(point => {
                this._ctx.beginPath();
                this._ctx.arc(...point, 6, 0, 2 * Math.PI);
                this._ctx.fill();
                this._ctx.stroke();
            })

            const rectVertex = getRectVertex(rect, center)

            this._ctx.beginPath();

            this._ctx.moveTo(...rectVertex[0])

            rectVertex.forEach(vertex => this._ctx.lineTo(...vertex))

            this._ctx.closePath();

            this._ctx.stroke();
        })
    }

    _resize(mouse, rectIndex, pointIndex) {
        const rect = this._rects[rectIndex];

        let targetPoint = rect[pointIndex];
        let opositivePoint = getOpositivePoint(rect, pointIndex);
        let [adjacentPoint, adjacentPoint2] = getAdjacentPoints(rect, pointIndex);

        const center = this._rectCenters[rectIndex];

        const mouseDistance = vec2.sub([], mouse, prevMouse);

        const centerDistance = vec2.sub([], targetPoint, center);
        const adjacentCenterDistance = vec2.sub([], adjacentPoint, center);

        const canonicalBase = [1, 0];
        const rotationAngle = vec2.angle(centerDistance, canonicalBase);

        const adjacentCenterDistanceHeight = vec2.length(adjacentCenterDistance);

        vec2.add(targetPoint, targetPoint, mouseDistance);
        vec2.sub(opositivePoint, opositivePoint, mouseDistance);

        const centerYDistanceSign = Math.sign(targetPoint[1] - center[1]);

        vec2.add(
            adjacentPoint,
            center,
            [
                adjacentCenterDistanceHeight * Math.cos(rotationAngle + Math.PI / 2) * centerYDistanceSign,
                adjacentCenterDistanceHeight * Math.sin(rotationAngle + Math.PI / 2)
            ]
        );

        const newAdjacentCenterDistance = vec2.sub([], adjacentPoint, center);

        vec2.sub(adjacentPoint2, center, newAdjacentCenterDistance);

        prevMouse = mouse;
    }

    _move(mouse, rect, rectIndex) {
        const distanceToPrevious = vec2.sub([], mouse, this._rectCenters[rectIndex]);
        this._rectCenters[rectIndex] = mouse;
        rect.forEach(point => vec2.add(point, point, distanceToPrevious));
    }

    onMouseDown(mouse) {
        this._rects.forEach((rect, rectIndex) => {
            rect.forEach((point, index) => {
                const distance = vec2.distance(mouse, point);

                if (distance <= 5) {
                    this._canvas.onmousemove = ({ offsetX, offsetY }) => {
                        this._resize([offsetX, offsetY], rectIndex, index)
                        this.draw()
                    };
                }
            });

            const distance = vec2.distance(mouse, this._rectCenters[rectIndex]);

            if (distance <= 5) {
                this._canvas.onmousemove = ({ offsetX, offsetY }) => {
                    this._move([offsetX, offsetY], rect, rectIndex);
                    this.draw();
                };
            };
        })
    }

    eventListeners() {
        this._canvas.onmousedown = (e) => {
            const mouse = [e.offsetX, e.offsetY];
            prevMouse = mouse;
            this._canvas.onmousemove = null;

            this.onMouseDown(mouse)
        };

        this._canvas.onmouseup = () => this._canvas.onmousemove = null;
    }
}
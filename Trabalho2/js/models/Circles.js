class Circles {
    constructor(canvas, circles, onDraw, clearOnDraw = true) {
        this._canvas = canvas;
        this._circles = circles;
        this.onDraw = onDraw;
        this._ctx = canvas.getContext("2d");
        this._clearOnDraw = clearOnDraw;
        this.intersections = []
    }

    draw(disableOnDraw = false) {
        if (this._clearOnDraw) this._ctx.clearRect(0, 0, 1200, 800)

        if (!disableOnDraw) this.onDraw();

        this._circles.forEach((circle, index) => {
            setPencilColor(this._ctx, this.intersections.includes(index) ? 'red' : 'black')

            circle.forEach(point => {
                this._ctx.beginPath();
                this._ctx.arc(...point, 6, 0, 2 * Math.PI);
                this._ctx.fill();
                this._ctx.stroke();
            })

            const radius = vec2.distance(...circle)
            const center = circle[1]

            this._ctx.beginPath();
            this._ctx.arc(...center, radius, 0, 2 * Math.PI);
            this._ctx.stroke();
        })

    }

    _move(mouse, circle) {
        const distanceToPrevious = vec2.sub([], mouse, circle[1]);
        circle[1] = mouse;
        vec2.add(circle[0], circle[0], distanceToPrevious);
    }

    onMouseDown(mouse) {
        this._circles.forEach((circle, index) => {
            const distance = vec2.distance(mouse, circle[0]);

            if (distance <= 5) {
                this._canvas.onmousemove = ({ offsetX, offsetY }) => {
                    circle[0] = [offsetX, offsetY]
                    this.draw()
                };
            }

            const centerDistance = vec2.distance(mouse, circle[1]);

            if (centerDistance <= 5) {
                this._canvas.onmousemove = ({ offsetX, offsetY }) => {
                    this._move([offsetX, offsetY], circle);
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
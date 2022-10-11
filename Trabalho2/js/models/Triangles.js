class Triangles {
    constructor(canvas, tris, onDraw, clearOnDraw = true) {
        this._canvas = canvas;
        this._tris = tris;
        this.onDraw = onDraw;
        this._ctx = canvas.getContext("2d");
        this._clearOnDraw = clearOnDraw;
        this.intersections = []
    }

    draw(disableOnDraw = false) {
        if (this._clearOnDraw) this._ctx.clearRect(0, 0, 1200, 800);

        if (!disableOnDraw) this.onDraw();

        this._tris.forEach((tri, triIndex) => {
            setPencilColor(this._ctx, this.intersections.includes(triIndex) ? 'red' : 'black')

            tri.forEach(point => {
                this._ctx.beginPath();
                this._ctx.arc(...point, 6, 0, 2 * Math.PI);
                this._ctx.fill();
                this._ctx.stroke();
            })

            const triVertex = getTriVertex(...tri)

            this._ctx.beginPath();

            this._ctx.moveTo(...triVertex[0])

            triVertex.forEach(vertex => this._ctx.lineTo(...vertex))

            this._ctx.closePath();

            this._ctx.stroke();
        })
    }

    _dragBase(e, tri) {
        let mouse = [e.offsetX, e.offsetY];
        let [base, vtx] = tri;
        let v = vec2.sub([], vtx, base);
        let delta = vec2.sub([], mouse, prevMouse);

        prevMouse = mouse;

        vec2.add(base, base, delta);
        vec2.add(vtx, base, v);
    };

    _dragVtx(e, tri) {
        let mouse = [e.offsetX, e.offsetY];
        let [_, vtx] = tri;
        let delta = vec2.sub([], mouse, prevMouse);

        prevMouse = mouse;

        vec2.add(vtx, vtx, delta);
    };

    onMouseDown(mouse) {
        this._tris.forEach(tri => {
            tri.forEach((point, index) => {
                let distance = vec2.distance(mouse, point);

                if (distance <= 5) {
                    this._canvas.onmousemove =
                        index == 0
                            ? (e) => {
                                this._dragBase(e, tri);
                                this.draw();
                            }
                            : (e) => {
                                this._dragVtx(e, tri);
                                this.draw();
                            };
                }
            })
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
const onMouseDown = (event) => {
    const { offsetX: x, target } = event;

    let previousX = x;

    target.onmousemove = ({ offsetX: newX }) => {
        body.rotate('y', -(previousX - newX) / 100)
        previousX = newX;
    }
}

const onMouseUp = ({ target }) => target.onmousemove = null;
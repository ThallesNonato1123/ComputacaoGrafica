const {
    body,
    head,
    arms,
    forearms,
    hands,
    legs,
    calfs,
    foots
} = new Robot(render, 2, 2, 1);

scene.add(body)

render();

document.onkeydown = onKeyDown;

document.onkeyup = onKeyUp;

canvas.onmousedown = onMouseDown;

canvas.onmouseup = onMouseUp;
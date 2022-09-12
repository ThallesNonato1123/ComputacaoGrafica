let currentRotation = 'topLeft';
let direction = 'left';
let didDraw = false;

document.addEventListener('keydown', ({ key }) => {
    switch (key.toLocaleLowerCase()) {
        case 'r':
            currentRotation = 'topLeft';
            break;
        case 'w':
            currentRotation = 'topRight';
            break;
        case 'g':
            currentRotation = 'bottomLeft';
            break;
        case 'b':
            currentRotation = 'bottomRight';
            break;
        case 'a':
            direction = direction === 'right' ? 'left' : 'right';
            break;
    };
});

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const rotations = {
    topLeft: [200, 200],
    topRight: [300, 200],
    bottomLeft: [200, 300],
    bottomRight: [300, 300]
};

const draw = () => {
    if(!didDraw){
        ctx.restore()
        currentRotation = 'topLeft'
        direction = 'left'
    }
    
    ctx.clearRect(0, 0, 500, 500);

    ctx.fillStyle = 'cyan';
    ctx.fillRect(0, 0, 500, 500);

    const [x, y] = rotations[currentRotation];

    const angle = direction === 'right' ? 2 : -2

    if (didDraw) {
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 180 * angle);
        ctx.translate(-x, -y);
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect(200, 200, 100, 100);

    ctx.fillStyle = 'red';
    ctx.fillRect(200, 200, 10, 10);

    ctx.fillStyle = 'white';
    ctx.fillRect(290, 200, 10, 10);

    ctx.fillStyle = 'green';
    ctx.fillRect(200, 290, 10, 10);

    ctx.fillStyle = 'blue';
    ctx.fillRect(290, 290, 10, 10);

    if (!didDraw) {
        ctx.save()
        didDraw = true;
    }

    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

function resetPosition(){
    didDraw = false
    direction = 'left'
    currentRotation = 'topLeft'
}
const scene = new THREE.Scene();
scene.background = new THREE.Color('#FFFFFF')
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / (window.innerHeight - 100), 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight - 100);
const canvas = renderer.domElement;
canvas.id = 'canvas'
document.body.appendChild(canvas);

camera.position.z = 6;

const render = () => renderer.render(scene, camera);
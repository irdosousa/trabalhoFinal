// Importando as bibliotecas Three.js

import * as THREE from 'three';

// Configurações iniciais
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controle da câmera com o mouse
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Adicionando luz
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

// Adicionando objetos à cena
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const objects = [];
for (let i = 0; i < 10; i++) {
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
  scene.add(cube);
  objects.push(cube);
}

// Adicionando textura a um objeto
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('path/to/texture.jpg');
const materialWithTexture = new THREE.MeshPhongMaterial({ map: texture });
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), materialWithTexture);
sphere.position.set(2, 0, 0);
scene.add(sphere);
objects.push(sphere);

// Configurando sombras
renderer.shadowMap.enabled = true;
light.castShadow = true;
objects.forEach(obj => {
  obj.castShadow = true;
});

// Animação
function animate() {
  requestAnimationFrame(animate);
  objects.forEach(obj => {
    obj.rotation.x += 0.01;
    obj.rotation.y += 0.01;
  });
  renderer.render(scene, camera);
}
animate();

// Redimensionamento da tela
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Ativando fullscreen com a tecla F
window.addEventListener('keydown', (event) => {
  if (event.key === 'f') {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      renderer.domElement.requestFullscreen();
    }
  }
});

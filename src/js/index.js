import * as THREE from 'three';

const $result = document.getElementById('result');

// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe187); // 배경색 설정
// scene.add(요소)

// 2. Camera: SCene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(
  50,
  $result.clientWidth / $result.clientHeight,
  0.1,
  1000
);
camera.position.set(2, 2, 2); // 카메라를 어디에 둘 것인가?  (2, 2, 2) 좌표에 카메라를 놓는다는 의미
camera.lookAt(0, 0, 0); // 카메라가 어디를 볼 것인가? 카메라가 바라보는 목표점을 설정 원점(0,0,0)을 바라보도록 설정

// 3. Renderer: Scene+Camera, 화면을 그려주는 역할
const renderer = new THREE.WebGLRenderer({ canvas: $result, antialias: true });
renderer.setSize($result.clientWidth, $result.clientHeight); // 사이즈조정
// document.body.appendChild(renderer.domElement); // 캔버스 추가

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 4, 3);
scene.add(light);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x2e6ff2 });
const box = new THREE.Mesh(geometry, material);
scene.add(box);

function animate() {
  box.rotation.y += 0.01;
  requestAnimationFrame(animate); // 브라우저가 다음 프레임을 렌더링하기전에 반복적으로 호출

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  renderer.setSize($result.clientWidth, $result.clientHeight);

  // 1. 카메라 종횡비
  camera.aspect = $result.clientWidth / $result.clientHeight;
  camera.updateProjectionMatrix(); // 카메라 업데이트

  // 2. 렌더러의 크기
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// const RubiksCube = () => {
//   const containerRef = useRef(null);
//   useEffect(() => {
//     let scene, camera, renderer, controls;
//     const cubies = [];
//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.set(4, 4, 8);
//     camera.lookAt(0, 0, 0);
//     renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     containerRef.current.appendChild(renderer.domElement);
//     const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xffa500, 0xffffff]; // Red, Green, Blue, Yellow, Orange, White
//     const cubieSize = 1;
//     const gap = 0.1;
//     const materials = colors.map(color => new THREE.MeshStandardMaterial({ color }));
//     for (let x = -1; x <= 1; x++) {
//       for (let y = -1; y <= 1; y++) {
//         for (let z = -1; z <= 1; z++) {
//           const geometry = new THREE.BoxGeometry(cubieSize, cubieSize, cubieSize);
//           const cubie = new THREE.Mesh(geometry, materials);
//           cubie.position.set(x * (cubieSize + gap), y * (cubieSize + gap), z * (cubieSize + gap));
//           scene.add(cubie);
//           cubies.push(cubie);
//         }
//       }
//     }
//     const ambientLight = new THREE.AmbientLight(0x404040);
//     scene.add(ambientLight);
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
//     directionalLight.position.set(5, 5, 5);
//     scene.add(directionalLight);
//     controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     const animate = () => {
//       requestAnimationFrame(animate);
//       cubies.forEach((cubie, index) => {
//         cubie.rotation.x += 0.01 * (index % 2 === 0 ? 1 : -1);
//         cubie.rotation.y += 0.01 * (index % 3 === 0 ? 1 : -1);
//         cubie.rotation.z += 0.01 * (index % 4 === 0 ? 1 : -1);
//       });
//       controls.update();
//       renderer.render(scene, camera);
//     };
//     animate();
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       containerRef.current.removeChild(renderer.domElement);
//     };
//   }, []);
//   return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
// };
// export default RubiksCube;
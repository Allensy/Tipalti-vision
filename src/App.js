import "./styles.css";
import { useEffect } from "react";
import { init } from "./initGlob";
import * as THREE from "three";
import  TrackballControls  from "three-trackballcontrols";

export default function App() {
  useEffect(async () => {
    const x = await init();
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('globe').appendChild(renderer.domElement);

    // Setup scene
    const scene = new THREE.Scene();
    scene.add(x);
    scene.add(new THREE.AmbientLight(0xbbbbbb));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

    // Setup camera
    const camera = new THREE.PerspectiveCamera();
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    camera.position.z = 500;

    // Add camera controls
  
    const tbControls = new TrackballControls(camera, renderer.domElement);
    tbControls.minDistance = 101;
    tbControls.rotateSpeed = 5;
    tbControls.zoomSpeed = 0.8;

    // Kick-off renderer
    (function animate() { // IIFE
      // Frame cycle
      tbControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    })();


  }, []);
  return (
    <div id="app" className="App">
      <div id="globe"></div>
    </div>
  );
}

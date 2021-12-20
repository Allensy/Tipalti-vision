import {
  getDocs, onSnapshot
} from "firebase/firestore";
import { useEffect, useState } from "react";
import * as THREE from "three";
import TrackballControls from "three-trackballcontrols";
import { transactionCollection } from "./globe";
import { init } from "./initGlob";
import "./styles.css";

export default function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(async () => {
    const unsub = onSnapshot(transactionCollection, async (doc) => {
      let newItems = [];
      const res = await getDocs(transactionCollection);
      res.forEach((item) => {
        newItems.push(item.data());
      });
      console.log(newItems)
      const archs = await init(newItems);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById("globe").appendChild(renderer.domElement);

      // Setup scene
      const scene = new THREE.Scene();
      scene.add(archs);
      scene.add(new THREE.AmbientLight(0xbbbbbb));
      scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

      // Setup camera
      const camera = new THREE.PerspectiveCamera();
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      camera.position.z = 500;

      // Add camera controls

      const tbControls = new TrackballControls(camera, renderer.domElement);
      tbControls.minDistance = 101;
      tbControls.rotateSpeed = 5;
      tbControls.zoomSpeed = 0.8;

      // Kick-off renderer
      (function animate() {
        // IIFE
        // Frame cycle
        tbControls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      })();
      setTransactions([...newItems]);
    });
  }, []);
  return (
    <div id="app" className="App">
      <div id="globe"></div>
    </div>
  );
}

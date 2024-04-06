import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; 



    

        
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xefe5d0);
        const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,5000);
      camera.rotation.y = 45/180*Math.PI;
        camera.position.set(8, 4, 5); 
       const controls = new OrbitControls(camera,renderer.domElement);
        controls.update();
      
       controls.addEventListener('change', renderer.domElement);

       
       const hlight = new THREE.AmbientLight (0x000000, 100);
        scene.add(hlight);
      const directionlight= new THREE.DirectionalLight(0xf7e54a, 30);
     // directionlight.set(100,1,0);
      scene.add(directionlight);
      const light= new THREE.PointLight(0xf7e54a, 30);
      light.position.set(8,1,5);
      scene.add(light)
      const light2= new THREE.PointLight(0x000000, 100);
      light2.position.set(8,1,3);
      scene.add(light2)
      const light3= new THREE.PointLight(0x000000, 700);
      light3.position.set(7,0,4);
      scene.add(light3)
      const light4= new THREE.PointLight(0x000000, 100);
      light4.position.set(7,8,9);
      scene.add(light4)
      let objectToRotate;
        const loader = new GLTFLoader();
        loader.load('scene.gltf', function(gltf){
           objectToRotate = gltf.scene.children[0];
          scene.add(gltf.scene);
          animate();
        });
      
      function animate() {
       
        requestAnimationFrame(animate);
        // controls.update();
        objectToRotate.rotation.z += 0.01; 
        renderer.render(scene,camera);
      }
      



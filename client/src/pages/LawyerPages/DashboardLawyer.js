
import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";

function dashboardLawyer() {
	return (
		<>
			<Dashboard links={true}/>
		</>
	);}
export default dashboardLawyer;
// import ImageSlider from "../../components/Dashboard/ImageSlider.js";
// import Navbar from "../../components/Navbar.js";
// <<<<<<< HEAD
// import { useState } from "react";
// function App() {
//   const [data, setData] = useState("");
//   const mount = useRef(null);
//   useLayoutEffect(() => {
//     const width = mount.current.clientWidth;
//     const height = mount.current.clientHeight;
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(width, height);
//     mount.current.appendChild(renderer.domElement);
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x111212);
//     const camera = new THREE.PerspectiveCamera(
//       45,
//       window.innerWidth / window.innerHeight,
//       1,
//       5000
//     );
//     camera.rotation.y = (60 / 180) * Math.PI;
//     camera.position.set(8, 1, 5);

//     const hlight = new THREE.AmbientLight(0x000000, 100);
//     scene.add(hlight);
//     const directionlight = new THREE.DirectionalLight(0xf7e54a, 30);
//     // directionlight.set(100,1,0);
//     scene.add(directionlight);
//     const light = new THREE.PointLight(0xf7e54a, 30);
//     light.position.set(8, 1, 5);
//     scene.add(light);
//     const light2 = new THREE.PointLight(0x000000, 100);
//     light2.position.set(8, 1, 3);
//     scene.add(light2);
//     const light3 = new THREE.PointLight(0x000000, 700);
//     light3.position.set(7, 0, 4);
//     scene.add(light3);
//     const light4 = new THREE.PointLight(0x000000, 100);
//     light4.position.set(7, 8, 9);
//     scene.add(light4);
//     let objectToRotate;
//     const loader = new GLTFLoader();
//     loader.load("object.glb", function (gltf) {
//       objectToRotate = gltf.scene.children[0];
//       scene.add(gltf.scene);
//       animate();
//     });

//     function animate() {
//       requestAnimationFrame(animate);
//       // controls.update();
//       objectToRotate.rotation.z += 0.01;
//       renderer.render(scene, camera);
//     }

//     return () => {
//       mount.current.removeChild(mount.current.secondElementChild);
//     };
//   }, []);

//   return (
//     <div className="App">
//       {/* <AuthWrapper /> */}
//       {/* {data} */}
// 		<Navbar/>
//       <div style={{ width: "85%", height: "100%" }} ref={mount} >
// 		<div className="filler"></div>
// 	  </div>
//     </div>
//   );
// >>>>>>> 10dc7a1 (syncing changes)
// }

// export default dashboardLawyer;
// =======
// import RotatingScales from "../../components/RotatingScales.js";
// import { AuthData } from "../../services/AuthService.js";
// function DashboardLawyer() {
// 	const { user } = AuthData();
// 	return (
// 		<>
// 			<Navbar />
// 			<RotatingScales />
// 			<div
// 				className="dashboardLawyer"
// 				style={{
// 					position: "relative",
// 					display: "flex",
// 					flexDirection: "column",
// 					// justifyContent: "center",
// 					alignItems: "center",
// 					height: "90vh",
// 					width: "100%",
// 					overflow: "scroll",
// 					scrollBehavior: "smooth",
// 					// backgroundColor: "white",
// 					// zIndex: "10",
// 				}}
// 			>
// 				<h1>Welcome {JSON.parse(user.user).name}!! 👋🏻</h1>
// 				<ImageSlider />
// 				<h2>ijsdncsd</h2>
// 				<h2>ijsdncsd</h2>
// 				<h2>ijsdncsd</h2>
// 				<h2>ijsdncsd</h2>
// 				<h2>ijsdncsd</h2>
// 				<h2>ijsdncsd</h2>
// 				<h2>ijsdncsd</h2>
// 			</div>
// 		</>
// 	);
// }

// export default DashboardLawyer;
// >>>>>>> 370cf08 (pastcases)

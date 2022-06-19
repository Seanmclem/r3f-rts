// import {
//   Canvas,
//   extend,
//   ReactThreeFiber,
//   useFrame,
//   useThree,
//   // Vector3,
// } from "@react-three/fiber";
// import { Stars } from "@react-three/drei";
// import { useRef, useState } from "react";
// // import { useBox, usePlane } from "@react-three/cannon";

// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { DoubleSide, Object3D, Vector3 } from "three";
// import {
//   box1,
//   box2,
//   initiateMoving,
//   reachDestination,
//   VillagerComponent,
// } from "./components/villager/Villager";
// import { BuildingProps } from "./components/buildings/shared/types";
// import {
//   townCenter1,
//   TownCenterComponent,
// } from "./components/buildings/TownCenter";
// import { Physics, useBox, usePlane } from "@react-three/cannon";
// import { BottomHUD } from "./components/hud-container/BottomHUD";

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       orbitControls: ReactThreeFiber.Object3DNode<
//         OrbitControls,
//         typeof OrbitControls
//       >;
//     }
//   }
// }

// extend({ OrbitControls });

// const Plane = ({
//   // setPosition,
//   setSelectedNodeUid,
//   handleInitiateMoving,
// }: {
//   // setPosition: (position: Vector3) => void;
//   setSelectedNodeUid: React.Dispatch<React.SetStateAction<string | undefined>>;
//   handleInitiateMoving: (destinationPosition: Vector3) => void;
// }) => {
//   const handleClick = (event: any) => {
//     if (event.type === "click") {
//       setSelectedNodeUid(undefined);
//     } else if (event.type === "contextmenu") {
//       const destination: Vector3 = event.intersections[0].point;
//       console.log({ destination });
//       // setPosition(destination);
//       handleInitiateMoving(destination);
//     }
//   };

//   const [ref] = usePlane(() => ({
//     rotation: [-Math.PI / 2, 0, 0],
//   }));

//   return (
//     <mesh
//       ref={ref}
//       position={[0, 0, 0]}
//       rotation={[Math.PI / 2, 0, 0]}
//       scale={[1, 1, 1]}
//       onClick={handleClick}
//       onContextMenu={handleClick}
//     >
//       <planeBufferGeometry args={[100, 100]} />
//       <meshBasicMaterial color="green" side={DoubleSide} />
//     </mesh>
//   );
// };

// const CameraControls = () => {
//   // Get a reference to the Three.js Camera, and the canvas html element.
//   // We need these to setup the OrbitControls class.
//   // https://threejs.org/docs/#examples/en/controls/OrbitControls

//   const {
//     camera,
//     gl: { domElement },
//   } = useThree();

//   // Ref to the controls, so that we can update them on every frame using useFrame
//   const controls: any = useRef();
//   useFrame(
//     (_state) => controls?.current?.update() && controls?.current?.update()
//   );
//   // camera.add()
//   // ^ https://discourse.threejs.org/t/how-to-build-a-hud-in-a-single-scene-with-a-single-camera/16108/2

//   // camera.position = {}
//   return (
//     <orbitControls
//       ref={controls}
//       args={[camera, domElement]}
//       enableZoom={true}
//       // maxAzimuthAngle={Math.PI / 4}
//       // maxPolarAngle={Math.PI}
//       // minAzimuthAngle={-Math.PI / 4}
//       // minPolarAngle={0}
//     />
//   );
// };

// export const App = () => {
//   const [buildings, setBuildings] = useState<BuildingProps[]>([townCenter1]);
//   const [villagers, setVillagers] = useState<VillagerProps[]>([box1, box2]);
//   const [selectedNodeUid, setSelectedNodeUid] = useState<string | undefined>();

//   const handleInitiateMoving = (destinationPosition: Vector3) => {
//     selectedNodeUid &&
//       initiateMoving(
//         selectedNodeUid,
//         destinationPosition,
//         villagers,
//         setVillagers
//       );
//   };

//   const handleReachDestination = (specificNodeUid: string) => {
//     reachDestination(specificNodeUid, villagers, setVillagers);
//   };

//   return (
//     <div className="canvas-container">
//       <Canvas
//         style={{ height: window.innerHeight, width: window.innerWidth }}
//         camera={{ fov: 75, position: [10, 8, 10] }}
//       >
//         <Physics>
//           <CameraControls />
//           <Stars />
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[10, 15, 10]} color={"red"} />
export const hat = null;

//           {/* {hudRef && hudRef.current ? <HudBox ref={hudRef} /> : null} */}

//           {buildings.map((building) => (
//             <TownCenterComponent
//               key={building.uid}
//               building={building}
//               selectedNodeUid={selectedNodeUid}
//               setSelectedNodeUid={setSelectedNodeUid}
//             />
//           ))}

//           {villagers.map((villager) => (
//             <VillagerComponent
//               key={villager.uid}
//               villager={villager}
//               selectedNodeUid={selectedNodeUid}
//               setSelectedNodeUid={setSelectedNodeUid}
//               handleReachDestination={handleReachDestination}
//             />
//           ))}

//           {/*
//           Need a map function to go over the Buildings
//         */}

//           <Plane
//             setSelectedNodeUid={setSelectedNodeUid}
//             handleInitiateMoving={handleInitiateMoving}
//           />
//         </Physics>
//       </Canvas>
//       <BottomHUD />
//     </div>
//   );
// };

// export default App;

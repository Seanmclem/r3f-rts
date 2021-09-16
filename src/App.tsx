import {
  Canvas,
  extend,
  ReactThreeFiber,
  useFrame,
  useThree,
  Vector3,
} from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef, useState } from "react";
// import { useBox, usePlane } from "@react-three/cannon";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DoubleSide } from "three";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
    }
  }
}

extend({ OrbitControls });

const Box = ({ position }: { position: any }) => {
  const size = 2;
  console.log({ position });

  return (
    <mesh position={[position.x as number, 1.0001, position.z]}>
      <boxGeometry args={[size, size, size]} />
      <meshLambertMaterial color={"hotpink"} />
    </mesh>
  );
};

const Plane = ({
  setPosition,
}: {
  setPosition: React.Dispatch<React.SetStateAction<ReactThreeFiber.Vector3>>;
}) => {
  // const [ref] = usePlane(() => ({
  //   rotation: [-Math.PI / 2, 0, 0],
  // }));

  const handleClick = (event: any) => {
    const points: Vector3 = event.intersections[0].point;
    console.log({ points });

    setPosition(points);
    debugger;
  };

  return (
    <mesh
      position={[0, 0, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[1, 1, 1]}
      onContextMenu={handleClick}
    >
      <planeBufferGeometry args={[100, 100]} />
      <meshBasicMaterial color="green" side={DoubleSide} />
    </mesh>
    // <mesh ref={ref} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
    //   <planeBufferGeometry args={[100, 100]} />
    //   <meshLambertMaterial attach="material" color="lightblue" />
    // </mesh>
  );
};

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement },
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls: any = useRef();
  useFrame(
    (state) => controls?.current?.update() && controls?.current?.update()
  );
  // camera.position = {}
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={true}
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
    />
  );
};

export const App = () => {
  const [position, setPosition] = useState<Vector3>({
    x: 0,
    y: 0,
    z: 0,
  } as Vector3);
  return (
    <div className="canvas-container">
      <Canvas
        style={{ height: window.innerHeight, width: window.innerWidth }}
        camera={{ fov: 75, position: [10, 8, 10] }}
        // camera={{ position: { x: 10, y: 10, z: 10 } as Vector3 }}
      >
        <CameraControls />
        <Stars />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 15, 10]} color={"red"} />
        <Box position={position} />
        <Plane setPosition={setPosition} />
      </Canvas>
    </div>
  );
};

export default App;

import {
  Canvas,
  extend,
  ReactThreeFiber,
  useFrame,
  useThree,
  // Vector3,
} from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef, useState } from "react";
// import { useBox, usePlane } from "@react-three/cannon";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DoubleSide, Vector3 } from "three";

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

const Box = ({
  position,
  selectedNode,
  setSelectedNode,
}: {
  position: Vector3;
  selectedNode?: string;
  setSelectedNode: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const size = 2;
  console.log({ position });

  return (
    <mesh position={[position.x as number, size / 2 + 0.0001, position.z]}>
      <boxGeometry args={[size, size, size]} />
      <meshLambertMaterial color={"hotpink"} />
    </mesh>
  );
};

const Plane = ({ setPosition }: { setPosition: any }) => {
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
    (_state) => controls?.current?.update() && controls?.current?.update()
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

interface BoxProps {
  uid: string;
  position: Vector3;
}

const box1: BoxProps = {
  uid: "fddsfsdfdsf",
  position: new Vector3(9, 0, 0),
};

export const App = () => {
  const [villagers, setVillagers] = useState<BoxProps[]>([box1]);
  const [selectedNode, setSelectedNode] = useState<string | undefined>(
    box1.uid
  );

  // const [selectedNodes, setSelectedNodes] = useState<any[]>([]);

  const handleSetPositions = (position: Vector3) => {
    const newVillager = [...villagers].find(
      (villager) => villager.uid === selectedNode
    );
    const oldVillagers = villagers.filter(
      (villager) => villager.uid !== selectedNode
    );
    if (newVillager) {
      newVillager.position = position;
      setVillagers([...oldVillagers, newVillager]);
    }
  };

  return (
    <div className="canvas-container">
      <Canvas
        style={{ height: window.innerHeight, width: window.innerWidth }}
        camera={{ fov: 75, position: [10, 8, 10] }}
      >
        <CameraControls />
        <Stars />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 15, 10]} color={"red"} />

        {villagers.map((villager) => (
          <Box
            key={villager.uid}
            position={villager.position}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
          />
        ))}

        <Plane setPosition={handleSetPositions} />
      </Canvas>
    </div>
  );
};

export default App;

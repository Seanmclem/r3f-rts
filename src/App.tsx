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
  villager,
  position,
  selectedNodeUid,
  setSelectedNodeUid,
}: {
  villager: VillagerProps;
  position: Vector3;
  selectedNodeUid?: string;
  setSelectedNodeUid: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const size = 2;
  console.log({ position });

  const selected = villager.uid === selectedNodeUid;

  return (
    <mesh
      position={[position.x as number, size / 2 + 0.0001, position.z]}
      onClick={() => setSelectedNodeUid(villager.uid)}
    >
      <boxGeometry args={[size, size, size]} />
      <meshBasicMaterial color={selected ? "blue" : "gray"} />
    </mesh>
  );
};

const Plane = ({
  setPosition,
  setSelectedNodeUid,
}: {
  setPosition: (position: Vector3) => void;
  setSelectedNodeUid: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
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
      // onClick={() => null}
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

interface VillagerProps {
  uid: string;
  position: Vector3;
}

const box1: VillagerProps = {
  uid: "fddsfsdfdsf",
  position: new Vector3(9, 0, 0),
};

const box2: VillagerProps = {
  uid: "f1234567dfdsf",
  position: new Vector3(1, 0, 0),
};

export const App = () => {
  const [villagers, setVillagers] = useState<VillagerProps[]>([box1, box2]);
  const [selectedNodeUid, setSelectedNodeUid] = useState<string | undefined>();

  // const [selectedNodeUids, setSelectedNodeUids] = useState<any[]>([]);

  const handleSetPositions = (position: Vector3) => {
    const newVillager = [...villagers].find(
      (villager) => villager.uid === selectedNodeUid
    );
    const oldVillagers = villagers.filter(
      (villager) => villager.uid !== selectedNodeUid
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
            villager={villager}
            position={villager.position}
            selectedNodeUid={selectedNodeUid}
            setSelectedNodeUid={setSelectedNodeUid}
          />
        ))}

        <Plane
          setSelectedNodeUid={setSelectedNodeUid}
          setPosition={handleSetPositions}
        />
      </Canvas>
    </div>
  );
};

export default App;

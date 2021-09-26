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
import { VillagerProps } from "./components/villager/shared/types";
import { box1, box2, VillagerComponent } from "./components/villager/Villager";
import { BuildingProps } from "./components/buildings/shared/types";
import { townCenter1 } from "./components/buildings/TownCenter";

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

const Plane = ({
  // setPosition,
  setSelectedNodeUid,
  handleInitiateMoving,
}: {
  // setPosition: (position: Vector3) => void;
  setSelectedNodeUid: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleInitiateMoving: (destinationPosition: Vector3) => void;
}) => {
  const handleClick = (event: any) => {
    if (event.type === "click") {
      setSelectedNodeUid(undefined);
    } else if (event.type === "contextmenu") {
      const destination: Vector3 = event.intersections[0].point;
      console.log({ destination });
      // setPosition(destination);
      handleInitiateMoving(destination);
    }
  };

  return (
    <mesh
      position={[0, 0, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[1, 1, 1]}
      onClick={handleClick}
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
      // maxAzimuthAngle={Math.PI / 4}
      // maxPolarAngle={Math.PI}
      // minAzimuthAngle={-Math.PI / 4}
      // minPolarAngle={0}
    />
  );
};

const initiateMoving = (
  selectedNodeUid: string,
  destinationPosition: Vector3,
  villagers: VillagerProps[],
  setVillagers: React.Dispatch<React.SetStateAction<VillagerProps[]>>
) => {
  const existingVillager = villagers.find(
    (villager) => villager.uid === selectedNodeUid
  );
  const otherVillagers = villagers.filter(
    (villager) => villager.uid !== selectedNodeUid
  );
  if (existingVillager) {
    const updatedVillager: VillagerProps = {
      ...existingVillager,
      destinationPosition,
      status: "moving",
    };
    setVillagers([...otherVillagers, updatedVillager]);
  }
};

const reachDestination = (
  specificNodeUid: string,
  villagers: VillagerProps[],
  setVillagers: React.Dispatch<React.SetStateAction<VillagerProps[]>>
) => {
  const existingVillager = villagers.find(
    (villager) => villager.uid === specificNodeUid
  );
  const otherVillagers = villagers.filter(
    (villager) => villager.uid !== specificNodeUid
  );
  if (existingVillager) {
    const updatedVillager: VillagerProps = {
      ...existingVillager,
      destinationPosition: undefined,
      status: "standing",
    };
    setVillagers([...otherVillagers, updatedVillager]);
  }
};

export const App = () => {
  const [buildings, setBuildings] = useState<BuildingProps[]>([townCenter1]);
  const [villagers, setVillagers] = useState<VillagerProps[]>([box1, box2]);
  const [selectedNodeUid, setSelectedNodeUid] = useState<string | undefined>();

  const handleInitiateMoving = (destinationPosition: Vector3) => {
    selectedNodeUid &&
      initiateMoving(
        selectedNodeUid,
        destinationPosition,
        villagers,
        setVillagers
      );
  };

  const handleReachDestination = (specificNodeUid: string) => {
    reachDestination(specificNodeUid, villagers, setVillagers);
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
          <VillagerComponent
            key={villager.uid}
            villager={villager}
            selectedNodeUid={selectedNodeUid}
            setSelectedNodeUid={setSelectedNodeUid}
            handleReachDestination={handleReachDestination}
          />
        ))}

        {/* 
          Need a map function to go over the Buildings
        */}

        <Plane
          setSelectedNodeUid={setSelectedNodeUid}
          handleInitiateMoving={handleInitiateMoving}
        />
      </Canvas>
    </div>
  );
};

export default App;

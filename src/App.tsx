import {
  Canvas,
  extend,
  ReactThreeFiber,
  useFrame,
  useThree,
  // Vector3,
} from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
// import { useBox, usePlane } from "@react-three/cannon";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DoubleSide, Object3D, Vector3 } from "three";
// import { VillagerProps } from "./components/villager/shared/types";

// import { BuildingProps } from "./components/buildings/shared/types";
// import {
//   townCenter1,
//   TownCenterComponent,
// } from "./components/buildings/TownCenter";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import { BottomHUD } from "./components/hud-container/BottomHUD";
import { PlaneGrid } from "./components/grid/PlaneGrid";
import { useGameDataStore } from "./stores/game-data-store";
import { Units } from "./components/units/Units";
import { initializeGridData } from "./components/grid/grid-service";
import { GridBox } from "./components/grid/grid-types";
import { initializeUnitData } from "./components/units/units-service";
// import { OneSide } from "./components/generic/OneSide";

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

const Plane = ({ size }: { size: number }) => {
  const updateSelectedNodeUid = useGameDataStore(
    (state) => state.updateSelectedNodeUid
  );

  const handleClick = (event: any) => {
    if (event.type === "click") {
      updateSelectedNodeUid(undefined);
    } else if (event.type === "contextmenu") {
      const destination: Vector3 = event.intersections[0].point;
      console.log({ destination });
      // setPosition(destination);
      // handleInitiateMoving(destination);
    }
  };

  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <mesh
      ref={ref}
      position={[0, 0, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[1, 1, 1]}
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      <planeBufferGeometry args={size ? [size, size] : [10, 10]} />
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
  // camera.add()
  // ^ https://discourse.threejs.org/t/how-to-build-a-hud-in-a-single-scene-with-a-single-camera/16108/2

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
// const planeSize = 30;

export const App = () => {
  const [planeSize, _setPlaneSize] = useState(30);
  const [cubeSize, _setCubeSize] = useState(5);

  const loadedSavedData = useGameDataStore((state) => state.loadedSavedData); // Boolean
  const updateGeneric = useGameDataStore((state) => state.updateGeneric);
  const updateGridData = useGameDataStore((state) => state.updateGridData);

  const units = useGameDataStore((state) => state.units);
  const updateUnits = useGameDataStore((state) => state.updateUnits);

  useEffect(() => {
    console.log({ units });
  }, [units]);

  useEffect(() => {
    if (!loadedSavedData) {
      // do loading ... check local storage
      // updateGridData, if any loaded...

      const loadedData: undefined | GridBox[][] = undefined;

      if (loadedData) {
        updateGridData(loadedData);
      } else {
        const initialialUnitData = initializeUnitData();
        updateUnits(initialialUnitData.villagers);

        const initialGriddata = initializeGridData({ cubeSize, planeSize });
        updateGridData(initialGriddata.gridData);
        updateGeneric({ loadedSavedData: true });
      }
    }
  }, []);

  // const [buildings, setBuildings] = useState<BuildingProps[]>([townCenter1]);

  // const handleReachDestination = (specificNodeUid: string) => {
  //   reachDestination(specificNodeUid, villagers, setVillagers);
  // };
  // console.log(geometry);

  if (loadedSavedData) {
    return (
      <div className="canvas-container">
        <Canvas
          style={{ height: window.innerHeight, width: window.innerWidth }}
          camera={{ fov: 75, position: [10, 8, 10] }}
        >
          <Physics>
            <CameraControls />
            <Stars />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 15, 10]} color={"red"} />
            <axesHelper args={[50]} />
            {/* {hudRef && hudRef.current ? <HudBox ref={hudRef} /> : null} */}
            {/* 
            {buildings.map((building) => (
              <TownCenterComponent
                key={building.uid}
                building={building}
                selectedNodeUid={selectedNodeUid}
                setSelectedNodeUid={setSelectedNodeUid}
              />
            ))}
  
            {villagers.map((villager) => (
              <VillagerComponent
                key={villager.uid}
                villager={villager}
                selectedNodeUid={selectedNodeUid}
                setSelectedNodeUid={setSelectedNodeUid}
                handleReachDestination={handleReachDestination}
              />
            ))} */}

            {/* 
            Need a map function to go over the Buildings
          */}

            {/*  (planeSize / cubeSize)  == covers the length of the board */}

            <PlaneGrid cubeSize={cubeSize} />

            <Plane
              size={planeSize}
              // setSelectedNodeUid={setSelectedNodeUid}
              // handleInitiateMoving={handleInitiateMoving}
            />

            <Units />
          </Physics>
        </Canvas>
        <BottomHUD />
      </div>
    );
  } else {
    return null;
  }
};

export default App;

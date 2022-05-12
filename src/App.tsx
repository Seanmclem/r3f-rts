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
import { Physics, useBox, usePlane } from "@react-three/cannon";
import { BottomHUD } from "./components/hud-container/BottomHUD";
import { Box } from "./components/generic/Box";
import { OneSide } from "./components/generic/OneSide";

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
  const handleClick = (event: any) => {
    if (event.type === "click") {
      // setSelectedNodeUid(undefined);
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

const MyGrid = ({
  cubeSize,
  planeSize,
}: {
  cubeSize: number;
  planeSize: number;
}) => {
  // const cubeSize = 5;
  const cubeNumber = planeSize / cubeSize;
  const aStarArray: any[] = [];

  const boxStubs = Array.from(Array(cubeNumber).keys());

  console.log("RENDER");
  console.log("boxStubs.length", boxStubs.length);

  // TODO: move ^all v this grid making logic into external function, to run once
  // move grid to ext-component
  // move grid-data to zustand store, imported into component
  // zustand store auto generates a-star grid also, from like empty/filled properties in grid model
  // NEED: basic grid model/interface

  const [rendering] = useState(
    boxStubs.map((_columnNum, idX) =>
      boxStubs.map((_boxNumberByZero, idY) => {
        if (typeof aStarArray[idX]?.length === "number") {
          aStarArray[idX].push(`a-${idX}-${idY}`);
          // should be 0 or 1's.
        } else {
          aStarArray[idX] = [`b-${idX}-${idY}`];
        }

        console.log({ aStarArray });

        /** covers the length of the board ... 20, for 5 by 100 */
        const cubesPlaneLength = planeSize / cubeSize;
        // console.log(cubesPlaneLength % idx);
        const cubeNumber = idY + 1;

        console.log({ idX, idY });

        const oneMoreCubePosition = cubeSize * 2;

        return true ? ( // idY < 3 && cubeNumber < 2
          <Box
            key={`${idX}${idY}`}
            planeSize={planeSize}
            boxSize={cubeSize}
            positionModifier={oneMoreCubePosition * cubeNumber - cubeSize}
            columnModifier={idX * cubeSize}
          />
        ) : null;
      })
    )
  );

  return <>{rendering}</>;
};

export const App = () => {
  const [planeSize, _setPlaneSize] = useState(30);
  const [gridSquareSize, _setGridSquareSize] = useState(5);
  // const [buildings, setBuildings] = useState<BuildingProps[]>([townCenter1]);
  // const [villagers, setVillagers] = useState<VillagerProps[]>([box1, box2]);
  // const [selectedNodeUid, setSelectedNodeUid] = useState<string | undefined>();

  // const handleInitiateMoving = (destinationPosition: Vector3) => {
  //   selectedNodeUid &&
  //     initiateMoving(
  //       selectedNodeUid,
  //       destinationPosition,
  //       villagers,
  //       setVillagers
  //     );
  // };

  // const handleReachDestination = (specificNodeUid: string) => {
  //   reachDestination(specificNodeUid, villagers, setVillagers);
  // };
  // console.log(geometry);

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

          {/* <OneSide planeSize={100} boxSize={5} /> */}

          {/*  (planeSize / cubeSize)  == covers the length of the board */}

          <MyGrid cubeSize={gridSquareSize} planeSize={planeSize} />
          {/* Gone */}

          {/* x20 .... aka 100/5 = 20 */}

          {/* Added columnModifier={5}, + 5 per 10 */}
          {/* 
          <Box planeSize={100} boxSize={5} positionModifier={5} />
          <Box planeSize={100} boxSize={5} positionModifier={15} />
          <Box planeSize={100} boxSize={5} positionModifier={25} />

          <Box planeSize={100} boxSize={5} positionModifier={35} />
          <Box planeSize={100} boxSize={5} positionModifier={45} />
          <Box planeSize={100} boxSize={5} positionModifier={55} />
          <Box planeSize={100} boxSize={5} positionModifier={65} />

          <Box planeSize={100} boxSize={5} positionModifier={75} />
          <Box planeSize={100} boxSize={5} positionModifier={85} />
          <Box planeSize={100} boxSize={5} positionModifier={95} />
          <Box planeSize={100} boxSize={5} positionModifier={105} />

          <Box planeSize={100} boxSize={5} positionModifier={115} />
          <Box planeSize={100} boxSize={5} positionModifier={125} />
          <Box planeSize={100} boxSize={5} positionModifier={135} />
          <Box planeSize={100} boxSize={5} positionModifier={145} />

          <Box planeSize={100} boxSize={5} positionModifier={155} />
          <Box planeSize={100} boxSize={5} positionModifier={165} />
          <Box planeSize={100} boxSize={5} positionModifier={175} />
          <Box planeSize={100} boxSize={5} positionModifier={185} />

          <Box planeSize={100} boxSize={5} positionModifier={195} />

          <Box
            planeSize={100}
            boxSize={5}
            positionModifier={155}
            columnModifier={5}
          />
          <Box
            planeSize={100}
            boxSize={5}
            positionModifier={165}
            columnModifier={5}
          />
          <Box
            planeSize={100}
            boxSize={5}
            positionModifier={175}
            columnModifier={5}
          />
          <Box
            planeSize={100}
            boxSize={5}
            positionModifier={185}
            columnModifier={5}
          />

          <Box
            planeSize={100}
            boxSize={5}
            positionModifier={195}
            columnModifier={5}
          /> */}

          <Plane
            size={planeSize}
            // setSelectedNodeUid={setSelectedNodeUid}
            // handleInitiateMoving={handleInitiateMoving}
          />
        </Physics>
      </Canvas>
      <BottomHUD />
    </div>
  );
};

export default App;

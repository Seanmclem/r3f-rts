/* eslint-disable @typescript-eslint/no-unused-vars */
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useBox } from "@react-three/cannon";
import { Unit } from "../units/types";
import { useGameDataStore } from "../../stores/game-data-store";
import { Vector3 } from "three";

export const VillagerComponent: React.VFC<Unit> = ({
  uid,
  initialPosition,
}) => {
  // I'll still need to keep a global data updated?
  const size = 2;

  const selectedNodeUid = useGameDataStore((state) => state.selectedNodeUid);
  const updateSelectedNodeUid = useGameDataStore(
    (state) => state.updateSelectedNodeUid
  );

  const updateSelectedNodeFunction = useGameDataStore(
    (state) => state.updateSelectedNodeFunction
  );

  const selected = uid === selectedNodeUid;
  const constant_Y = size / 2 + 0.0001;

  const handleRightClick = (data: any) => {
    // console.log("MY DATA _ right click", data.destination);

    // register a destination in a store, for this uid
    // global plane destination, and specific grid square...
    // is global position even needed? The grid square(s can handle everything)

    api.position.set(data.destination.x, constant_Y, data.destination.z);
  };

  /** left-click, selection */
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    updateSelectedNodeUid(uid);

    updateSelectedNodeFunction(handleRightClick);
  };

  const [destination, set_destination] = useState(undefined);

  const [ref, api] = useBox(() => ({
    userData: uid,
    // onCollide: () => {
    //   api.rotation.set(0, 0, 0);
    //   console.log("colliding!!!!");
    //   api.velocity.set(0, 0, 0);
    // },
    // onCollideBegin: (e) => {
    //   console.log(e);
    //   // api.mass.set(0);
    //   console.log("begin");
    //   console.log("Destination BEGIN reached!");
    //   // api.velocity.set(0, 0, 0);
    //   handleReachDestination(villager.uid);
    //   // api.velocity.set(0, 0, 0);
    // },
    // onCollideEnd: () => {
    //   // api.mass.set(1);
    //   console.log("end");

    //   api.rotation.set(0, 0, 0);
    // },
    mass: 1,
    type: "Kinematic",
    position: [initialPosition.x, constant_Y, initialPosition.z],
    args: [size, size, size],
  }));

  return (
    <mesh ref={ref} onClick={handleClick}>
      <boxGeometry args={[size, size, size]} />
      <meshBasicMaterial color={selected ? "blue" : "gray"} />
    </mesh>
  );
};

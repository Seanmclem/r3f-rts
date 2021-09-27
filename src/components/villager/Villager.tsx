import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useState } from "react";
import { Vector3 } from "three";
import { VillagerProps as VillagerData } from "./shared/types";
import { EmptyInventory } from "./shared/utils";

const destinationMatch = (destination: Vector3, current: Vector3) => {
  // const xMatch = formatLimitDecimals(destination.x, 1) === formatLimitDecimals(current.x, 1);
  // const zMatch = formatLimitDecimals(destination.z, 1) === formatLimitDecimals(current.z, 1);
  const xMatch = destination.x.toFixed(0) === current.x.toFixed(0);
  const zMatch = destination.z.toFixed(0) === current.z.toFixed(0);

  debugger;
  return xMatch && zMatch;
};

export const box1: VillagerData = {
  uid: "fddsfsdfdsf",
  initialPosition: new Vector3(9, 0, 0),
  inventory: EmptyInventory,
  status: "standing",
};

export const box2: VillagerData = {
  uid: "f1234567dfdsf",
  initialPosition: new Vector3(1, 0, 0),
  inventory: EmptyInventory,
  status: "standing",
};

interface VillagerComponentProps {
  villager: VillagerData;
  setSelectedNodeUid: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedNodeUid?: string;
  handleReachDestination: (specificNodeUid: string) => void;
}

export const VillagerComponent: React.VFC<VillagerComponentProps> = ({
  villager,
  setSelectedNodeUid,
  selectedNodeUid,
  handleReachDestination,
}) => {
  // I'll still need to keep a global data updated
  const size = 2;
  const selected = villager.uid === selectedNodeUid;
  const [currentPosition, setCurrentPosition] = useState(
    villager.initialPosition
  );

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setSelectedNodeUid(villager.uid);
    console.log({ currentPosition });
  };

  useFrame(() => {
    if (villager.destinationPosition) {
      //do moving, updating
      //setCurrentPosition(villager.destinationPosition); // REFINE HERE

      const zDiff = villager.destinationPosition.z - currentPosition.z;
      const zChange = zDiff > 0 ? 0.1 : -0.1;

      const xDiff = villager.destinationPosition.x - currentPosition.x;
      const xChange = xDiff > 0 ? 0.1 : -0.1;

      setCurrentPosition({
        x: currentPosition.x + xChange, //currentPosition.x + 0.1,
        y: villager.destinationPosition.y, // unused
        z: currentPosition.z + zChange,
      } as Vector3); // y=height, ignored, only sets x, and z

      if (destinationMatch(villager.destinationPosition, currentPosition)) {
        //TODO: needs to be passing
        console.log("Destination reached!");
        handleReachDestination(villager.uid);
      }
    }
    // setCurrentPosition()
  });

  return (
    <mesh
      position={[currentPosition.x, size / 2 + 0.0001, currentPosition.z]}
      onClick={handleClick}
    >
      <boxGeometry args={[size, size, size]} />
      <meshBasicMaterial color={selected ? "blue" : "gray"} />
    </mesh>
  );
};

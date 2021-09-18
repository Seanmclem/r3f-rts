import { ThreeEvent } from "@react-three/fiber";
import { Vector3 } from "three";
import { VillagerProps as VillagerData } from "./shared/types";
import { EmptyInventory } from "./shared/utils";

export const box1: VillagerData = {
    uid: "fddsfsdfdsf",
    position: new Vector3(9, 0, 0),
    inventory: EmptyInventory,
    status: "standing",
  };
  
export const box2: VillagerData = {
    uid: "f1234567dfdsf",
    position: new Vector3(1, 0, 0),
    inventory: EmptyInventory,
    status: "standing",

  };

  export const VillagerComponent = ({
    villager,
    position,
    selectedNodeUid,
    setSelectedNodeUid,
  }: {
    villager: VillagerData;
    position: Vector3;
    selectedNodeUid?: string;
    setSelectedNodeUid: React.Dispatch<React.SetStateAction<string | undefined>>;
  }) => {
    const size = 2;
    console.log({ position });
  
    const selected = villager.uid === selectedNodeUid;

    const handleClick = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation()
        setSelectedNodeUid(villager.uid)
    }
  
    return (
      <mesh
        position={[position.x as number, size / 2 + 0.0001, position.z]}
        onClick={handleClick}
      >
        <boxGeometry args={[size, size, size]} />
        <meshBasicMaterial color={selected ? "blue" : "gray"} />
      </mesh>
    );
  };
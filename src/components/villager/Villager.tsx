import { Vector3 } from "three";
import { VillagerProps } from "./shared/types";

export const box1: VillagerProps = {
    uid: "fddsfsdfdsf",
    position: new Vector3(9, 0, 0),
  };
  
export const box2: VillagerProps = {
    uid: "f1234567dfdsf",
    position: new Vector3(1, 0, 0),
  };

  export const Villager = ({
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
import { ThreeEvent } from "@react-three/fiber";
import { Vector3 } from "three";
import { BuildingProps } from "./shared/types";

export const townCenter1: BuildingProps = {
  uid: "65de4f56t7yg8",
  type: "town-center",
  position: new Vector3(5, 0, 0),
  size: new Vector3(5, 3, 3),
};

interface TownCenterProps {
  building: BuildingProps;
  setSelectedNodeUid: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedNodeUid?: string;
}

export const TownCenterComponent: React.VFC<TownCenterProps> = ({
  building,
  setSelectedNodeUid,
  selectedNodeUid,
}) => {
  const { uid, position, size } = building;
  const selected = uid === selectedNodeUid;

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setSelectedNodeUid(uid);
    console.log({ position });
  };

  return (
    <mesh
      position={[position.x, size.y / 2 + 0.0001, position.z]}
      onClick={handleClick}
    >
      <boxGeometry args={[size.x, size.y, size.z]} />
      <meshBasicMaterial color={selected ? "blue" : "gray"} />
    </mesh>
  );
};

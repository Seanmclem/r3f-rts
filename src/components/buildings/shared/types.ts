import { DoubleSide, Vector3 } from "three";

export type BuildingType = "town-center" | "house";

export interface BuildingProps {
  uid: string;
  type: BuildingType;
  position: Vector3;
  size: Vector3;
}

import { DoubleSide, Vector3 } from "three";


export interface BuildingProps {
    type: "town-center" | "house",
    position: Vector3,
  }
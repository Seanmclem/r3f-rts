import { Vector3 } from "three";

export interface Inventory {
  wood: number;
  food: number;
  gold: number;
  stone: number;
}

export interface VillagerProps {
  uid: string;
  initialPosition: Vector3;
  inventory: Inventory;
  status: "moving" | "standing";
  destinationPosition?: Vector3;
}

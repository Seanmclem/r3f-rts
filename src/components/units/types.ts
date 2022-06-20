import { Vector3 } from "three";

export interface Inventory {
  wood: number;
  food: number;
  gold: number;
  stone: number;
}

/** Villager Interface */
export interface Unit {
  uid: string;
  inventory: Inventory;
  status: "MOVING" | "IDLE";
  classType: "VILLAGER";

  initialPosition: Vector3;
  // optional below
  destinationPosition?: Vector3;

  gridPath?: number[][] /** a-start path */;
  blockCentersPath?: number[][] /** center-coordinates after each turn... only when angle changes */;

  linePath?: number[][];
  //currentGridBlock?: number[];
  // ^ WONT need because, a-star will avoid building paths anyway
  gridBlockDestination?: number[];

  // currentDri
}

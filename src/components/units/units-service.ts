import { Vector3 } from "three/src/Three";
import { Inventory, Unit } from "./types";

export const EmptyInventory: Inventory = {
  wood: 0,
  food: 0,
  gold: 0,
  stone: 0,
};

export const originalVillager1: Unit = {
  uid: "qwertyuiop",
  initialPosition: new Vector3(9, 0, 0),
  inventory: EmptyInventory,
  status: "IDLE",
  classType: "VILLAGER",
};

export const originalVillager2: Unit = {
  uid: "asdfghjkl",
  initialPosition: new Vector3(1, 0, 0),
  inventory: EmptyInventory,
  status: "IDLE",
  classType: "VILLAGER",
};

export const initializeUnitData = () => {
  // this function can init the units, then pass to grid to init with those-there too?

  const villagers = [originalVillager1, originalVillager2];

  return { villagers };
};

import create, { SetState } from "zustand";
import { GridBox } from "../components/grid/grid-types";
import { Unit } from "../components/units/types";

// type GenericUpdatePayload = "loadedSavedData";

/** An "anything-function", for the unit to set it's right-click function */
type GenericFn = (...args: any[]) => void;

interface ISet {
  // What's this for?
  loadedSavedData: boolean;

  // What's this for?
  update_loadedSavedData: (update: boolean) => void;

  // Grid data, applied at first-load? contains filled spaces etc
  gridData: GridBox[][];
  updateGridData: (gridData: GridBox[][]) => void;

  // Which node is selected
  selectedNodeUid?: string;
  updateSelectedNodeUid: (updatedSelectedNodeUid?: string) => void;

  /** Unit's right click  This is a function run by the selected-node when it's both already selected AND then you right click on empty terrain */
  selectedNodeFunction?: GenericFn;
  /** When you left-click on the unit, the unit will set its-own/global selectedNodeFunction -using updatedSelectedNodeFunction */
  updateSelectedNodeFunction: (updatedSelectedNodeFunction?: GenericFn) => void;

  // ^^ But why? Why can't the selected unit just totally control its own right click? Because, right-click happens on other units, or the plane

  // Populated on first-load, contains units and their current state.
  units: Unit[];
  updateUnits: (updatedUnits: Unit[]) => void;
}

export const useGameDataStore = create<ISet>((set: SetState<ISet>) => ({
  loadedSavedData: false,
  update_loadedSavedData: (update: boolean) =>
    set((_state: ISet) => {
      return { loadedSavedData: update };
    }),

  gridData: [],
  updateGridData: (updatedTemplate: GridBox[][]) =>
    set((_state: ISet) => {
      return { gridData: updatedTemplate };
    }),

  selectedNodeUid: undefined,
  updateSelectedNodeUid: (updatedSelectedNodeUid?: string) =>
    set((_state: ISet) => {
      return { selectedNodeUid: updatedSelectedNodeUid };
    }),

  selectedNodeFunction: undefined,
  updateSelectedNodeFunction: (updatedSelectedNodeFunction?: GenericFn) =>
    set((_state: ISet) => {
      return { selectedNodeFunction: updatedSelectedNodeFunction };
    }),

  units: [],
  updateUnits: (updatedUnits: Unit[]) =>
    set((_state: ISet) => {
      return { units: updatedUnits };
    }),
}));

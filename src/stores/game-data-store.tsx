import create, { SetState } from "zustand";
import { GridBox } from "../components/grid/grid-types";
import { Unit } from "../components/units/types";

type GenericUpdatePayload = "loadedSavedData";

interface ISet {
  loadedSavedData: boolean;

  updateGeneric: (update: Pick<ISet, GenericUpdatePayload>) => void;

  gridData: GridBox[][];
  updateGridData: (gridData: GridBox[][]) => void;

  selectedNodeUid?: string;
  updateSelectedNodeUid: (updatedSelectedNodeUid?: string) => void;

  units: Unit[];
  updateUnits: (updatedUnits: Unit[]) => void;
}

export const useGameDataStore = create<ISet>((set: SetState<ISet>) => ({
  loadedSavedData: false,
  updateGeneric: (update: Pick<ISet, GenericUpdatePayload>) =>
    set((_state: ISet) => {
      return { ...update };
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

  units: [],
  updateUnits: (updatedUnits: Unit[]) =>
    set((_state: ISet) => {
      return { units: updatedUnits };
    }),
}));

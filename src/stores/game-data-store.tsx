import create, { SetState } from "zustand";
import { GridBox } from "../components/grid/grid-types";

type GenericUpdatePayload = "loadedSavedData";

interface ISet {
  loadedSavedData: boolean;

  updateGeneric: (update: Pick<ISet, GenericUpdatePayload>) => void;

  gridData: GridBox[][];
  updateGridData: (gridData: GridBox[][]) => void;
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
}));

import { NumericLiteral } from "typescript";

export interface GridItem {
  rowId: number;
  rowsColumnId: number;
  isBlocked: boolean;

  coordinates: GridBoxCoordinates; //?

  outerColumnIndex: number; // for a-star
  innerColumnIndex: number; // for a-star
}

export interface GridBoxCoordinates {
  yHeight: number;
  center: number; // center can be derrived from X-and-Z from GridBox,
  // formulas can generate these values, and then use them to generate the grids
  top: number;
  right: number;
  bottom: number;
  left: number;
}

// export interface GridItem {
//   rowId: number;
//   rowsColumnId: number;
//   isBlocked: boolean;

//   coordinates: GridBoxCoordinates; //?

//   outerColumnIndex: number; // for a-star
//   innerColumnIndex: number; // for a-star
// }

export interface GridBox {
  xPosition: number;
  yPosition: number;
  zPosition: number;
  filled: boolean;

  // ^ centers would just be these ^, or just x/z

  top?: number; // z +/- cube/2 ...?
  right?: number; // x - cube/2, or plus wtf
  bottom?: number; // z +/- cube/2 ...?
  left?: number; // x + cube/2, or minus wtf
}

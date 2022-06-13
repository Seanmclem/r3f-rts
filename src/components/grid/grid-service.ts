import { astar, Graph } from "javascript-astar";
import { GridBox } from "./grid-types";

// console.log({ Aresult: result });

const generatePath = ({
  theGraph,
  startX,
  startY,
  endX,
  endY,
}: {
  theGraph: number[][];
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}) => {
  const graph = new Graph(theGraph);
  const start = graph.grid[startX][startY];
  const end = graph.grid[endX][endY];

  const result = astar.search(graph, start, end);

  console.log({ "A--result": result });

  return result;
};

export const initializeGridData = ({
  cubeSize,
  planeSize,
}: {
  cubeSize: number;
  planeSize: number;
}) => {
  const cubeNumber = planeSize / cubeSize;
  const aStarArray: number[][] = [];

  const gridData: GridBox[][] = [];
  const boxStubs = Array.from(Array(cubeNumber).keys());

  // ^ box-stubs?, kill w/fire

  const filledOne = [4, 2];

  boxStubs.forEach((_columnNum, idY) => {
    aStarArray[idY] = [];
    gridData[idY] = [];

    boxStubs.forEach((_boxNumberByZero, idX) => {
      aStarArray[idY].push(
        JSON.stringify([idX, idY]) === JSON.stringify(filledOne) ? 0 : 1
      );

      const rowNumber = idX + 1;

      const oneMoreCubePosition = cubeSize * 2;

      const positionModifier = oneMoreCubePosition * rowNumber - cubeSize;
      const columnModifier = idY * cubeSize;
      const topPlane = planeSize / 2;
      const cubeTop = cubeSize / 2;

      const gridBoxCoordinates: GridBox = {
        xPosition: -topPlane + positionModifier / 2,
        yPosition: cubeTop, // cube, bottom
        zPosition: -topPlane + (cubeTop + columnModifier),
        filled: !!(JSON.stringify([idX, idY]) === JSON.stringify(filledOne)),
      };

      gridData[idY].push(gridBoxCoordinates);
    });
  });

  return { gridData, aStarArray };
};

// export const prepGridData = ({
//   cubeSize,
//   planeSize,
// }: {
//   cubeSize: number;
//   planeSize: number;
// }) => {
//   const cubeNumber = planeSize / cubeSize;
//   const aStarArray: any[] = [];

//   const gridData: any[] = [];
//   const boxStubs = Array.from(Array(cubeNumber).keys());

//   // ^ box-stubs?, kill w/fire

//   const filledOne = [4, 2]; /// TESTING ... 2,0 -> 2,3
//   // NEED like a point-A and point-B to test a*
//   // [0, 4] -> [3, 4], or visa versa

//   boxStubs.forEach((_columnNum, idY) => {
//     // Y is first because row-after-row is vertical
//     aStarArray[idY] = [];
//     gridData[idY] = [];
//     //if (idY < 4) {
//     boxStubs.forEach((_boxNumberByZero, idX) => {
//       aStarArray[idY].push(
//         JSON.stringify([idX, idY]) === JSON.stringify(filledOne) ? 0 : 1
//       );
//       // should be 0 or 1's.
//       // 0 = a wall/impassable

//       const rowNumber = idX + 1;

//       const oneMoreCubePosition = cubeSize * 2;

//       const positionModifier = oneMoreCubePosition * rowNumber - cubeSize;
//       const columnModifier = idY * cubeSize;
//       const topPlane = planeSize / 2; // TOP of plane?
//       const cubeTop = cubeSize / 2; // adjust coordinate from middle, to top, of cube

//       // TODO:  use imports of `grid-types` format eventually here

//       //if (idY < 4) {
//       gridData[idY].push({
//         // built row by row, horizontals are populated throughout
//         xPosition: -topPlane + positionModifier / 2,
//         // can swap Z/Y for ratate of thing order generation
//         yPosition: cubeTop, // cube, bottom
//         zPosition: -topPlane + (cubeTop + columnModifier),
//         // zPosition: topPlane - (cubeTop + columnModifier),
//         // ^^ z starts from top, vs bottom, visa-versa
//         filled: !!(JSON.stringify([idX, idY]) === JSON.stringify(filledOne)),
//       });
//       //}
//     });
//     //}
//   });

//   // ...
//   // NEED like a point-A and point-B to test a*
//   // [0, 4] -> [3, 4], or visa versa

//   const aStarPath = generatePath({
//     theGraph: aStarArray,
//     startX: 0,
//     startY: 4,
//     endX: 3,
//     endY: 4,
//   });

//   return { gridData, aStarArray, aStarPath };
// };

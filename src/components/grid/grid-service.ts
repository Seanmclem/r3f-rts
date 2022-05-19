import { astar, Graph } from "javascript-astar";

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
};

export const prepGridData = ({
  cubeSize,
  planeSize,
}: {
  cubeSize: number;
  planeSize: number;
}) => {
  const cubeNumber = planeSize / cubeSize;
  const aStarArray: any[] = [];

  const gridData: any[] = [];
  const boxStubs = Array.from(Array(cubeNumber).keys());

  // ^ box-stubs?, kill w/fire

  const filledOne = [2, 1]; /// TESTING ... 2,0 -> 2,3
  // NEED like a point-A and point-B to test a*
  // [0, 4] -> [3, 4], or visa versa

  boxStubs.forEach((_columnNum, idY) => {
    // Y is first because row-after-row is vertically?
    aStarArray[idY] = [];
    gridData[idY] = [];
    //if (idY < 4) {
    boxStubs.forEach((_boxNumberByZero, idX) => {
      aStarArray[idY].push(
        JSON.stringify([idY, idX]) === JSON.stringify(filledOne) ? 0 : 1
      ); //(`a-${idX}-${idY}`);
      // should be 0 or 1's.

      /** covers the length of the board ... 20, for 5 by 100 */
      //   const cubesPlaneLength = planeSize / cubeSize;

      const rowNumber = idX + 1;

      const oneMoreCubePosition = cubeSize * 2;

      const positionModifier = oneMoreCubePosition * rowNumber - cubeSize;
      const columnModifier = idY * cubeSize;
      const topPlane = planeSize / 2; // TOP of plane?
      const cubeTop = cubeSize / 2; // adjust coordinate from middle, to top, of cube

      // TODO:  use imports of `grid-types` format eventually here

      //if (idY < 4) {
      gridData[idY].push({
        // built row by row, horizontals are populated throughout
        xPosition: -topPlane + positionModifier / 2,
        // can swap Z/Y for ratate of thing order generation
        yPosition: cubeTop, // cube, bottom
        zPosition: topPlane - (cubeTop + columnModifier),
        filled: !!(JSON.stringify([idX, idY]) === JSON.stringify(filledOne)),
      });
      //}
    });
    //}
  });

  // ...
  // NEED like a point-A and point-B to test a*
  // [0, 4] -> [3, 4], or visa versa

  generatePath({
    theGraph: aStarArray, // still fudging works
    startX: 2,
    startY: 0,
    endX: 2,
    endY: 3,
  });

  return { gridData, aStarArray };
};

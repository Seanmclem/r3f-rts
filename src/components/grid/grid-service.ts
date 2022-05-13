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

  boxStubs.forEach((_columnNum, idX) => {
    aStarArray[idX] = [];
    gridData[idX] = [];

    return boxStubs.forEach((_boxNumberByZero, idY) => {
      aStarArray[idX].push(`a-${idX}-${idY}`);
      // should be 0 or 1's.

      /** covers the length of the board ... 20, for 5 by 100 */
      //   const cubesPlaneLength = planeSize / cubeSize;

      const cubeNumber = idY + 1;

      const oneMoreCubePosition = cubeSize * 2;

      const positionModifier = oneMoreCubePosition * cubeNumber - cubeSize;
      const columnModifier = idX * cubeSize;
      const topPlane = planeSize / 2; // TOP of plane?
      const cubeTop = cubeSize / 2; // adjust coordinate from middle, to top, of cube

      // TODO:  use imports of `grid-types` format eventually here

      gridData[idX].push({
        xPosition: topPlane - cubeTop - columnModifier,
        yPosition: cubeTop, // cube, bottom
        zPosition: topPlane - positionModifier / 2,
      });
    });
  });

  return { gridData, aStarArray };
};

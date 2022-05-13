// import

import { useState } from "react";
import { GridBox } from "./GridBox";

export const PlaneGrid = ({
  cubeSize,
  planeSize,
}: {
  cubeSize: number;
  planeSize: number;
}) => {
  // const cubeSize = 5;
  const cubeNumber = planeSize / cubeSize;
  const aStarArray: any[] = [];

  const boxStubs = Array.from(Array(cubeNumber).keys());

  console.log("RENDER");
  console.log("boxStubs.length", boxStubs.length);

  // TODO: move ^all v this grid making logic into external function, to run once
  // move grid to ext-component
  // move grid-data to zustand store, imported into component
  // zustand store auto generates a-star grid also, from like empty/filled properties in grid model
  // MADE: basic grid model/interface ...> GridItem

  const [rendering] = useState(
    boxStubs.map((_columnNum, idX) =>
      boxStubs.map((_boxNumberByZero, idY) => {
        if (typeof aStarArray[idX]?.length === "number") {
          aStarArray[idX].push(`a-${idX}-${idY}`);
          // should be 0 or 1's.
        } else {
          aStarArray[idX] = [`b-${idX}-${idY}`];
        }

        console.log({ aStarArray });

        /** covers the length of the board ... 20, for 5 by 100 */
        const cubesPlaneLength = planeSize / cubeSize;
        // console.log(cubesPlaneLength % idx);
        const cubeNumber = idY + 1;

        console.log({ idX, idY });

        const oneMoreCubePosition = cubeSize * 2;

        return true ? ( // idY < 3 && cubeNumber < 2
          <GridBox
            key={`${idX}${idY}`}
            planeSize={planeSize}
            boxSize={cubeSize}
            positionModifier={oneMoreCubePosition * cubeNumber - cubeSize}
            columnModifier={idX * cubeSize}
          />
        ) : null;
      })
    )
  );

  return <>{rendering}</>;
};

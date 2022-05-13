// import

import { useEffect, useState } from "react";
import { prepGridData } from "./grid-service";
import { SimplerGridBox } from "./SimplerGridBox";

export const PlaneGrid = ({
  cubeSize,
  planeSize,
}: {
  cubeSize: number;
  planeSize: number;
}) => {
  const [boxData, setBoxData] = useState<any[]>([]);

  // move grid-data to zustand store, imported into component
  // zustand store auto generates a-star grid also, from like empty/filled properties in grid model
  // MADE: basic grid model/interface ...> GridItem

  useEffect(() => {
    const data = prepGridData({ cubeSize, planeSize });
    setBoxData(data.gridData);

    console.log(data);
  }, []);

  return (
    <>
      {boxData.map((outerArray, idX) =>
        outerArray.map((boxPositions: any, idY: number) => (
          <SimplerGridBox
            key={`${idX}-${idY}`}
            cubeSize={cubeSize}
            xPos={boxPositions.xPosition}
            yPos={boxPositions.yPosition}
            zPos={boxPositions.zPosition}
          />
        ))
      )}
    </>
  );
};

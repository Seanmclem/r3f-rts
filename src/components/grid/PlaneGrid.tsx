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
  const [pathData, setPathData] = useState<any[]>([]);

  // move grid-data to zustand store, imported into component
  // zustand store auto generates a-star grid also, from like empty/filled properties in grid model
  // MADE: basic grid model/interface ...> GridItem

  useEffect(() => {
    const data = prepGridData({ cubeSize, planeSize });
    setBoxData(data.gridData);
    setPathData(data.aStarPath);
    console.log(data);
  }, []);

  return (
    <>
      {boxData.map((outerArray, idX) =>
        outerArray.map((boxPositions: any, idY: number) => {
          const foundPathBlock = pathData.find((pathBox) => {
            // console.log({ "pathBox.x": pathBox.x, "pathBox.y": pathBox.y });
            return pathBox.x === idX && pathBox.y === idY;
          });
          if (foundPathBlock) {
            console.log({ foundPathBlock, idX, idY });
          }

          return (
            <SimplerGridBox
              key={`${idX}-${idY}`}
              cubeSize={cubeSize}
              xPos={boxPositions.xPosition}
              yPos={boxPositions.yPosition}
              zPos={boxPositions.zPosition}
              filled={boxPositions.filled}
              pathBox={!!foundPathBlock}
            />
          );
        })
      )}

      {/* {pathData.map((pathBlock) => (
        <SimplerGridBox
          key={`${pathBlock.x}-${pathBlock.y}`}
          cubeSize={cubeSize}
          xPos={pathBlock.x}
          yPos={boxData[0].yPosition}
          zPos={pathBlock.z}
          pathBox={true}
        />
      ))} */}
    </>
  );
};

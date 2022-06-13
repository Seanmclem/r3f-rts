// import

import { useEffect } from "react";
import { useGameDataStore } from "../../stores/game-data-store";

import { SimplerGridBox } from "./SimplerGridBox";

export const PlaneGrid = ({
  cubeSize,
}: //initialGridData,
{
  cubeSize: number;
  //initialGridData?: GridBox[][];
}) => {
  const gridData = useGameDataStore((state) => state.gridData);
  // const updateGridData = useGameDataStore((state) => state.updateGridData);

  // move grid-data to zustand store, imported into component
  // zustand store auto generates a-star grid also, from like empty/filled properties in grid model
  // MADE: basic grid model/interface ...> GridItem

  useEffect(() => {
    // need to ref  ormat this into,
    //// no a-star here, elsewhere
    //// can be given grid data to render, at start
    //// also store other game data, units, teams, etc
    // if (!gridData.length) {
    //   if (initialGridData) {
    //     updateGridData(initialGridData);
    //   } else {
    //     const data = initializeGridData({ cubeSize, planeSize });
    //     updateGridData(data.gridData);
    //     console.log({ initData: data });
    //   }
    // }
  }, []);

  return (
    <>
      {gridData.map((outerArray, idX) =>
        outerArray.map((boxPositions: any, idY: number) => {
          // const foundPathBlock = pathData.find((pathBox) => {
          //   // console.log({ "pathBox.x": pathBox.x, "pathBox.y": pathBox.y });
          //   return pathBox.x === idX && pathBox.y === idY;
          // });
          // if (foundPathBlock) {
          //   console.log({ foundPathBlock, idX, idY });
          // }

          return (
            <SimplerGridBox
              key={`${idX}-${idY}`}
              cubeSize={cubeSize}
              xPos={boxPositions.xPosition}
              yPos={boxPositions.yPosition}
              zPos={boxPositions.zPosition}
              filled={boxPositions.filled}
              // pathBox={!!foundPathBlock}
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

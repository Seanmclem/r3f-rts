import { useGameDataStore } from "../../stores/game-data-store";
import { SimplerGridBox } from "./SimplerGridBox";

export const PlaneGrid = ({ cubeSize }: { cubeSize: number }) => {
  const gridData = useGameDataStore((state) => state.gridData);

  return (
    <>
      {gridData.map((outerArray, idX) =>
        outerArray.map((boxPositions: any, idY: number) => {
          //   return pathBox.x === idX && pathBox.y === idY;

          return (
            <SimplerGridBox
              key={`${idX}-${idY}`}
              cubeSize={cubeSize}
              xPos={boxPositions.xPosition}
              yPos={boxPositions.yPosition}
              zPos={boxPositions.zPosition}
            />
          );
        })
      )}
    </>
  );
};

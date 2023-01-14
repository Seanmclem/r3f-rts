import { GridCoordinates } from "../units/types";

interface BoxyProps {
  cubeSize: number;
  grid_coordinates: GridCoordinates;
  filled?: boolean;
  pathBox?: boolean;
  xPos: number;
  yPos: number;
  zPos: number;
}

export const SimplerGridBox = ({
  cubeSize,
  grid_coordinates,
  xPos,
  yPos,
  zPos,
  filled,
  pathBox,
}: BoxyProps) => (
  <mesh
    position={[
      // (planeSize / 2) ... gets position of top of plane, since plane-center is relative to overall-origin-center
      xPos,
      yPos,
      zPos,
    ]}
    // onContextMenu={(data) => {
    //   console.log({ grid_coordinates, data });
    //   console.log(grid_coordinates);
    //   // data.point seems to be a global pos system?
    // }}
  >
    <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
    <meshBasicMaterial
      color={pathBox ? "yellow" : "blue"}
      wireframe={!filled && !pathBox}
    />
  </mesh>
);

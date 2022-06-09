interface BoxyProps {
  cubeSize: number;

  filled?: boolean;
  pathBox?: boolean;
  xPos: number;
  yPos: number;
  zPos: number;
}

export const SimplerGridBox = ({
  cubeSize,
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
  >
    <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
    <meshBasicMaterial
      color={pathBox ? "yellow" : "blue"}
      wireframe={!filled && !pathBox}
    />
  </mesh>
);

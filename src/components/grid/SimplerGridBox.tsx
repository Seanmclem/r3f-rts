interface BoxyProps {
  cubeSize: number;

  filled?: boolean;

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
    <meshBasicMaterial color={"blue"} wireframe={!filled} />
  </mesh>
);

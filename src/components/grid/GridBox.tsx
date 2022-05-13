interface BoxyProps {
  planeSize: number;
  boxSize: number;
  positionModifier: number;
  columnModifier?: number;
}

// DEPRECATED

export const GridBox = ({
  boxSize,
  planeSize,
  positionModifier,
  columnModifier = 0,
}: BoxyProps) => (
  <mesh
    position={[
      // (planeSize / 2) ... gets position of top of plane, since plane-center is relative to overall-origin-center
      planeSize / 2 - boxSize / 2 - columnModifier, // x
      boxSize / 2, // Y (vertical)
      planeSize / 2 - positionModifier / 2, // z (depth)
    ]}
  >
    <boxGeometry args={[boxSize, boxSize, boxSize]} />
    <meshBasicMaterial color={"blue"} wireframe />
  </mesh>
);

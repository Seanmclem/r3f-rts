interface BoxyProps {
  planeSize: number;
  boxSize: number;
  positionModifier: number;
  columnModifier?: number;
}

export const Box = ({
  boxSize,
  planeSize,
  positionModifier,
  columnModifier = 0,
}: BoxyProps) => (
  <mesh
    position={[
      planeSize / 2 - positionModifier / 2, // towards campera, positive additions
      boxSize / 2, // height
      planeSize / 2 - boxSize / 2 + -columnModifier, // right... = negative additions,
    ]}
  >
    <boxGeometry args={[boxSize, boxSize, boxSize]} />
    <meshBasicMaterial color={"blue"} />
  </mesh>
);

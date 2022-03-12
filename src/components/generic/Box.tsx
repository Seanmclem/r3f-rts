interface BoxyProps {
  size: number;
}

export const Box = ({ size }: BoxyProps) => (
  <mesh position={[100 / 2 - size / 2, size / 2, 100 / 2 - size / 2]}>
    <boxGeometry args={[size, size, size]} />
    <meshBasicMaterial color={"blue"} />
  </mesh>
);

import { Box } from "./Box";

// put a row of boxes up one side of the thing

// loads at center corner
//move up to left

interface OneSideProps {
  planeSize: number;
  boxSize: number;
}

const cubeNumber = 3;

const boxStubs = Array.from(Array(cubeNumber).keys());

export const OneSide = ({ planeSize, boxSize }: OneSideProps) => {
  return (
    <>
      {boxStubs.map((_box) => (
        <Box
          planeSize={planeSize}
          boxSize={boxSize}
          positionModifier={boxSize}
        />
      ))}
    </>
  );
};

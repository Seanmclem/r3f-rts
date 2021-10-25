import { useBox } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { ForwardedRef, forwardRef, useEffect, useRef } from "react";
import { Object3D } from "three";
import styled from "styled-components";
import { useWindowWidth } from "@react-hook/window-size";

interface props {}

export const BottomHUD: React.FC<props> = () => {
  const onlyWidth = useWindowWidth();

  return (
    <BottomHudContainer>
      <p>LALALALALALALALALAALALALLALALALAAL</p>
    </BottomHudContainer>
  );
};

const BottomHudContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: red;
`;
import styled from "styled-components";
import { useWindowWidth } from "@react-hook/window-size";

interface props {}

export const BottomHUD: React.FC<props> = () => {
  const onlyWidth = useWindowWidth();
  return null;
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

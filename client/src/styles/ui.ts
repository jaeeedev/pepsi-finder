import styled from "styled-components";
import { Theme } from "./theme";

export const ItemBox = styled.div`
  display: flex;
  gap: 15%;
  align-items: center;
  margin: 25px 15px;
  padding: 18px 30px;
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  background: ${({ theme }: { theme: Theme }) => theme.itemBox};
  transition: all 0.5s;
  cursor: default;

  &:hover {
  }
`;

export const ItemImgBox = styled.div`
  max-width: 180px;
  max-height: 180px;
  width: 20vw;
  height: 20vw;
  overflow: hidden;
  border-radius: 50%;
`;

export const ItemInfoBox = styled.div`
  flex: 1;
`;

export const ProdTitle = styled.h2`
  font-size: 26px;
  margin-bottom: 20px;
  letter-spacing: 0.015em;

  @media screen and (max-width: 480px) {
    font-size: 22px;
  }
`;
export const DivideBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

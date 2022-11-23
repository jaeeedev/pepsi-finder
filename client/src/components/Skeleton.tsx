import {
  ItemBox,
  ItemImgBox,
  ItemInfoBox,
  ProdTitle,
  DivideBox,
} from "../styles/ui";
import styled from "styled-components";

const SkeletonImg = styled(ItemImgBox)`
  background: #ddd;

  @keyframes bg-change {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  animation: bg-change 1.5s infinite ease;
`;

const SkeletonTitle = styled(ProdTitle)`
  height: 33px;
  background: #ddd;

  @keyframes bg-change {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  animation: bg-change 1.5s infinite ease;

  @media screen and (max-width: 480px) {
    height: 30px;
  }
`;

const SkeletonDetail = styled(DivideBox)`
  height: 32px;
  margin-bottom: 10px;
  background: #ddd;

  @keyframes bg-change {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  animation: bg-change 1.5s infinite ease;

  @media screen and (max-width: 480px) {
    height: 30px;
  }
`;

function Skeleton() {
  return (
    <>
      {new Array(5).fill("").map((_, i) => {
        return (
          <ItemBox key={i}>
            <SkeletonImg></SkeletonImg>
            <ItemInfoBox>
              <SkeletonTitle></SkeletonTitle>
              <SkeletonDetail></SkeletonDetail>
            </ItemInfoBox>
          </ItemBox>
        );
      })}
    </>
  );
}

export default Skeleton;

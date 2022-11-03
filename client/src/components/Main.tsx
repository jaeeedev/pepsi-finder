import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Theme } from "../styles/theme";

//768px
const Container = styled.section`
  position: relative;
  max-width: 768px;
  margin: 0 auto;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Switch = styled.button`
  width: 100px;
  height: 30px;
`;

const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 45px;
  padding: 20px 30px 0px 30px;
  margin-bottom: 10px;
`;

const DateTitle = styled.p`
  margin-bottom: 20px;
  padding: 0 30px;
  font-size: 25px;
`;

const ItemBox = styled.div`
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

const ItemImgBox = styled.div`
  max-width: 180px;
  max-height: 180px;
  width: 20vw;
  height: 20vw;
  overflow: hidden;
  border-radius: 50%;
`;

const ItemImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

const ItemInfoBox = styled.div`
  flex: 1;
`;

const ProdTitle = styled.h2`
  font-size: 27px;
  margin-bottom: 20px;
`;

const BadgeBox = styled.div`
  max-width: 400px;
`;

const DivideBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProdPrice = styled.h3`
  font-size: 20px;
  font-weight: 500;
`;

const BrandBadge = styled.span<{ brand?: string }>`
  display: inline-block;
  padding: 5px 13px;
  border-radius: 1rem;
  margin-right: 10px;
  font-weight: 500;
  //브랜드 여부에 따라 백그라운드 색상 달라야함;
  background: ${(props) => {
    if (props.brand === "GS25") return "#29b4d3";
    if (props.brand === "CU") return "#6a3289";
    if (props.brand === "emart24") return "#f7b11b";
    if (props.brand === "7-ELEVEn") return "#007d5e";
    if (props.brand === "MINISTOP") return "#1660a8";
    if (props.brand === "C·SPACE") return "#f4c300";
  }};
`;

const PromoBadge = styled(BrandBadge)<{ promo: string }>`
  background: ${(props) => props.promo};
`;

const Loading = styled.p``;

interface Pepsi {
  title: string;
  price: string;
  promo: string;
  prodImg: string;
  brand: string;
}

interface themeProps {
  theme: string;
  setTheme: (theme: string) => void;
}

function Main({ theme, setTheme }: themeProps) {
  const [pepsi, setPepsi] = useState<Pepsi[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const currentMonth = new Date().getMonth() + 1;
  const changeTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await axios.get("http://localhost:5000/api/pepsi");
      const data = await res.data.data;

      //1+1 먼저 뜨게 하기 위해
      data.sort((a: Pepsi, b: Pepsi) => {
        return Number(a.promo[0]) - Number(b.promo[0]);
      });
      setPepsi(data);
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>ZERO PEPSI FINDER</Title>
        <Switch onClick={changeTheme}>버튼</Switch>
      </Header>
      <DateTitle>
        <strong>{currentMonth}월</strong>의 행사 정보
      </DateTitle>
      {loading && <Loading>데이터를 불러오는 중입니다.</Loading>}
      {pepsi.map((el: Pepsi) => {
        return (
          <ItemBox key={el.title}>
            <ItemImgBox>
              <ItemImg src={el.prodImg} alt="이미지" />
            </ItemImgBox>
            <ItemInfoBox>
              <ProdTitle>{el.title}</ProdTitle>
              <DivideBox>
                <BadgeBox>
                  <BrandBadge brand={el.brand}>{el.brand}</BrandBadge>
                  <PromoBadge promo={el.promo === "1+1" ? "red" : "#3150ff"}>
                    {el.promo}
                  </PromoBadge>
                </BadgeBox>
                <ProdPrice>{el.price}</ProdPrice>
              </DivideBox>
            </ItemInfoBox>
          </ItemBox>
        );
      })}
    </Container>
  );
}

export default Main;

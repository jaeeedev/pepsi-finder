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
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Switch = styled.button`
  min-width: 120px;
  font-size: 17px;
  font-weight: 600;
  padding: 10px 20px;
  border: none;
  border-radius: 2rem;
  margin-right: 20px;
  margin-top: 4px;
  background: ${({ theme }: { theme: Theme }) => theme.switch};
  color: ${({ theme }: { theme: Theme }) => theme.bg};
  transition: background 0.4s;
`;

const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 45px;
  padding: 0 30px;
  line-height: 1;
  margin-bottom: 15px;

  @media screen and (max-width: 480px) {
    font-size: 35px;
  }
`;

const DateTitle = styled.p`
  padding: 0 30px;
  font-size: 22px;
  margin-bottom: 50px;

  @media screen and (max-width: 480px) {
    font-size: 19px;
  }
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
  font-size: 26px;
  margin-bottom: 20px;
  letter-spacing: 0.015em;

  @media screen and (max-width: 480px) {
    font-size: 22px;
  }
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
  margin-bottom: 10px;

  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;

const BrandBadge = styled.span<{ brand?: string; theme: Theme }>`
  display: inline-block;
  padding: 5px 13px;
  border-radius: 1rem;
  margin-right: 10px;
  margin-bottom: 10px;
  font-weight: 500;
  background: ${({ brand, theme }) => {
    if (brand === "GS25") return theme.gs[0];
    if (brand === "CU") return theme.cu[0];
    if (brand === "emart24") return theme.em[0];
    if (brand === "7-ELEVEn") return theme.se[0];
    if (brand === "MINISTOP") return theme.mi[0];
    if (brand === "C·SPACE") return theme.cs[0];
  }};
  border: ${({ brand, theme }) => {
    if (brand === "GS25") return `1px solid ${theme.gs[1]}`;
    if (brand === "CU") return `1px solid ${theme.cu[1]}`;
    if (brand === "emart24") return `1px solid ${theme.em[1]}`;
    if (brand === "7-ELEVEn") return `1px solid ${theme.se[1]}`;
    if (brand === "MINISTOP") return `1px solid ${theme.mi[1]}`;
    if (brand === "C·SPACE") return `1px solid ${theme.cs[1]}`;
  }};
  color: ${({ brand, theme }) => {
    if (brand === "GS25") return theme.gs[1];
    if (brand === "CU") return theme.cu[1];
    if (brand === "emart24") return theme.em[1];
    if (brand === "7-ELEVEn") return theme.se[1];
    if (brand === "MINISTOP") return theme.mi[1];
    if (brand === "C·SPACE") return theme.cs[1];
  }};

  @media screen and (max-width: 480px) {
    font-size: 14px;
  }
`;

const PromoBadge = styled(BrandBadge)<{ promo: string; theme: Theme }>`
  background: ${({ promo, theme }) => {
    if (promo === "1+1") return theme.get1[0];
    else return theme.get2[0];
  }};
  border: ${({ promo, theme }) => {
    if (promo === "1+1") return `1px solid ${theme.get1[1]}`;
    else return `1px solid ${theme.get2[1]}`;
  }};
`;

const Loading = styled.p`
  text-align: center;
`;

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
        <Switch onClick={changeTheme}>
          {theme === "dark" ? "밝게 보기" : "어둡게 보기"}
        </Switch>
      </Header>
      <DateTitle>
        <strong>{currentMonth}월</strong>의 편의점 행사 정보입니다.
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
                  <PromoBadge promo={el.promo}>{el.promo}</PromoBadge>
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

import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Theme } from "../styles/theme";
import {
  ItemBox,
  ItemImgBox,
  ItemInfoBox,
  ProdTitle,
  DivideBox,
} from "../styles/ui";
import Skeleton from "./Skeleton";

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

const ItemImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

const BadgeBox = styled.div`
  max-width: 400px;
`;

const ProdPrice = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;

  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;

interface ObjType {
  [key: string]: string;
  GS25: string;
  CU: string;
  emart24: string;
  "7-ELEVEn": string;
  MINISTOP: string;
  "C·SPACE": string;
}
//key 가 string일것이라고 알려주지 않으면 obj[key] 방식으로 사용 불가능

const brandArr: ObjType = {
  GS25: "gs",
  CU: "cu",
  emart24: "em",
  "7-ELEVEn": "se",
  MINISTOP: "mi",
  "C·SPACE": "cs",
};

const BrandBadge = styled.span<{ brand?: string; theme: Theme }>`
  display: inline-block;
  padding: 5px 13px;
  border-radius: 1rem;
  margin-right: 10px;
  margin-bottom: 10px;
  font-weight: 500;
  background: ${({ brand, theme }) => {
    return brand && theme[brandArr[brand]][0];
  }};
  border: ${({ brand, theme }) => {
    return brand && `1px solid ${theme[brandArr[brand]][1]}`;
  }};
  color: ${({ brand, theme }) => {
    return brand && theme[brandArr[brand]][1];
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
      const res = await axios.get(
        "https://pepsi-finder.herokuapp.com/api/pepsi"
      );
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
      {loading && <Skeleton />}
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

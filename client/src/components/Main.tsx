import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

//768px 기준점
const Container = styled.section`
  position: relative;
  max-width: 768px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 45px;
  padding: 20px 30px;
  margin-bottom: 20px;
`;

const ItemBox = styled.div`
  display: flex;
  /* background: #444; */
  justify-content: space-between;
  align-items: center;
  margin: 25px 15px;
  padding: 20px 25px;
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid #444;
`;

const ItemImgBox = styled.div`
  max-width: 230px;
  max-height: 230px;
  width: 22vw;
  height: 22vw;
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const ItemImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

const Circle = styled.div`
  position: absolute;
  width: 280px;
  height: 280px;
  top: -30px;
  right: 30px;
  background: #eefa4e;
  border-radius: 50%;
  z-index: -1;
`;

const BrandBadge = styled.div``;

function Main() {
  const [pepsi, setPepsi] = useState<Pepsi[]>([]);

  interface Pepsi {
    title: string;
    price: string;
    promo: string;
    prodImg: string;
    brand: string;
  }

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://localhost:5000/api/pepsi");
      const data = await res.data.data;

      setPepsi(data);
      console.log("데이터 불러옴");
    };

    getData();
  }, []);

  return (
    <Container>
      <Title>ZERO PEPSI FINDER</Title>
      <Circle />
      {pepsi.map((el: Pepsi) => {
        return (
          <ItemBox key={el.title}>
            <ItemImgBox>
              <ItemImg src={el.prodImg} alt="이미지" />
            </ItemImgBox>
            <h2>{el.title}</h2>
            <h3>{el.price}</h3>
            <span>{el.brand}</span>
          </ItemBox>
        );
      })}
    </Container>
  );
}

export default Main;

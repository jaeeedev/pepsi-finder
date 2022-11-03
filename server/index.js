const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const pepsi = require("./crawler");
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));
//나중에 배포하고 나면 origin: [] 배열 안에 로컬 주소, 배포 주소 넣기

async function test() {
  let pepsiData = await pepsi.getData();
  return pepsiData;
}

app.get("/api/pepsi", async (req, res) => {
  const pepsiData = await test();
  res.json({
    data: pepsiData,
  });
});

app.listen(5000, () => {
  console.log("서버 열림");
});

//__dirname에 빨간줄 쳐지면 eslintrc에 node:true 추가하기
//__dirname is not defined 오류 뜨긴하는데 여기서는 es모듈 안쓰고있어서 그쪽으로 해결안됨

app.use(express.static(path.join(__dirname, "/../client/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/../client/build/index.html"));
});

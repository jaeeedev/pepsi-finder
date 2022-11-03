const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const pepsi = require("./crawler");

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

const express = require("express");
const cors = require("cors");
const cheerio = require("cheerio");
const axios = require("axios");
const PORT = 4000;
const app = express();

app.use(cors());

const getHtml = async () => {
  try {
    return await axios.get("https://m.land.naver.com/complex/getComplexArticleList?hscpNo=2527&cortarNo=4146310100&tradTpCd=A1&order=point_&showR0=N&page=1");
    // 해당 사이트 html 태그 가져오기
  } catch (error) {
    console.error(error);
  }
};

app.get("/", (req, res) => {
  getHtml()
    .then((html) => {
      const $ = cheerio.load(html.data);
      // 크롤링할 태그 찾기

      let resultArr = [];
      resultArr.push(html.data);
      return resultArr;
    })
    .then((data) => res.send(data));
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
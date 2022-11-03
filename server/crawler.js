const axios = require("axios");
const cheerio = require("cheerio");

const getData = async () => {
  let pepsi = [];
  try {
    const html = await axios.get(
      `https://pyony.com/search/?q=${encodeURI("펩시+제로")}`
    );
    const data = await html.data;

    const $ = cheerio.load(data);
    const names = $(".col-md-6 .card");

    names.each((i, el) => {
      const prodData = $(el)
        .find(".card-body > div")
        .text()
        .trim()
        .replace(/ /g, "")
        .split("\n");
      const title = prodData[0];
      const price = prodData[2];
      const promo = prodData[5];
      const prodImg = $(el).find(".prod_img_div > img").attr("src");
      const brand = $(el).find(".card-header > small:eq(0)").text();

      pepsi.push({
        brand,
        title,
        price,
        promo,
        prodImg,
      });
    });

    return pepsi;
  } catch (err) {
    console.log(err);
  }
};

exports.getData = getData;

// const rule = "0 0 1 1 * *";
// nodeSchedule.scheduleJob(rule, getData);

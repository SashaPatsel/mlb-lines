const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const request = require("request");
const express = require("express");

const PORT = process.env.PORT || 3500

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const holder = [];

let wholeString;

//This could be a code drill. Break an array up into sub arrays every x indices

request("https://www.teamrankings.com/mlb/stat/1st-inning-scored-percentage", (err, res, html) => {
  const $ = cheerio.load(html)

  $("table.tr-table").each((i, element) => {
    const test = $(element).find("tbody").find("td.text-right").text();

    wholeString = test;
    let stringArr = wholeString.split("%")

    // console.log("hiuwqiurriux", stringArr)
    let tempArray= []
    let chunk = 6;
    for (let i = 0 ; i < stringArr.length; i += chunk) {
      tempStringArr = stringArr.slice(i, i + chunk);
      tempArray.push(tempStringArr)
      // do whatever
    }
    console.log(tempArray)
  })
})

app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});

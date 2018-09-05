const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const request = require("request");
const express = require("express");

const PORT = process.env.PORT || 3500

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

request("https://www.teamrankings.com/mlb/stat/1st-inning-scored-percentage", (aerr, res, html) => {
  console.log("thing")
})

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});

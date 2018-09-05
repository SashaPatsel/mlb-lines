const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const request = require("request");
const express = require("express");

const PORT = process.env.PORT || 3500

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Containes an array containing, name, home and away score % for each team
const teamHomeAwayScore = [];

const teams = ["Arizona", "Atlanta", "Dodgers", "Milwaukee", "Cleveland", "Seattle", "Mets", "Colorado", "Yankees", "Washington", "St. Louis", "Boston", "Tampa Bay", "Detroit",  "Baltimore", "Kansas City", "Angels", "Oakland", "San Diego", "Pittsburgh", "Sox", "Philadelphia", "Cubs", "Houston", "Minnesota", "Cinncinai", "San Francisco", "Toronto", "Miami", "Texas"]

const urls = {
  "Arizona": "109/2018/Arizona%20Diamondbacks",
  "Atlanta": "144/2018/Atlanta%20Braves",
  "Dodgers": "119/2018/Los%20Angeles%20Dodgers",
  "Milwaukee": "158/2018/Milwaukee%20Brewers",
  "Cleveland": "114/2018/Cleveland%20Indians",
  "Seattle": "136/2018/Seattle%20Mariners",
  "Mets": "121/2018/New%20York%20Mets",
  "Colorado": "115/2018/Colorado%20Rockies",
  "Yankees": "147/2018/New%20York%20Yankees",
  "Washington": "120/2018/Washington%20Nationals",
  "St. Louis": "138/2018/St.%20Louis%20Cardinals",
  "Boston": "111/2018/Boston%20Red%20Sox",
  "Tampa Bay": "139/2018/Tampa%20Bay%20Rays",
  "Detroit": "116/2018/Detroit%20Tigers",
  "Baltimore": "110/2018/Baltimore%20Orioles",
  "Kansas City": "118/2018/Kansas%20City%20Royals",
  "Angels": "108/2018/Los%20Angeles%20Angels",
  "Oakland": "133/2018/Oakland%20Athletics",
  "San Diego": "135/2018/San%20Diego%20Padres",
  "Pittsburgh": "134/2018/Pittsburgh%20Pirates",
  "White Sox": "145/2018/Chicago%20White%20Sox",
  "Philadelphia": "143/2018/Philadelphia%20Phillies",
  "Cubs": "112/2018/Chicago%20Cubs",
  "Houston": "117/2018/Houston%20Astros",
  "Minnesota": "142/2018/Minnesota%20Twins",
  "Cinncinai": "113/2018/Cincinnati%20Reds",
  "San Francisco": "137/2018/San%20Francisco%20Giants",
  "Toronto": "141/2018/Toronto%20Blue%20Jays",
  "Miami": "146/2018/Miami%20Marlins",
  "Texas": "140/2018/Texas%20Rangers"
}



//This could be a code drill. Break an array up into sub arrays every x indices
function getTeamStats() {


  request("https://www.teamrankings.com/mlb/stat/1st-inning-scored-percentage", (err, res, html) => {
    let wholeString;
    const $ = cheerio.load(html)

    $("table.tr-table").each((i, element) => {
      const test = $(element).find("tbody").find("td.text-right").text();

      wholeString = test;
      let stringArr = wholeString.split("%")

      // console.log("hiuwqiurriux", stringArr)
      let tempArray = []
      let chunk = 6;
      for (let i = 0; i < stringArr.length; i += chunk) {
        tempStringArr = stringArr.slice(i, i + chunk);
        tempArray.push(tempStringArr)
        // do whatever
      }
      getHomeAway(tempArray)

    })
    console.log(teamHomeAwayScore)
  })

}

// `http://www.statcorner.com/team/${urls["San Franciso"]}`
function getXRA() {
  request("http://www.statcorner.com/team/137/2018/San%20Francisco%20Giants", (err, res, html) => {
    const $ = cheerio.load(html)
  console.log("loading")

  $("td.teamHeader").each((i, element) => { console.log($(element).text()) })
    // $("table.roster").each((i, element) => {


    //   const tableData =  $(element).find("td.rosterTopStat4").text()

    //   console.log("fooooo", tableData)

    // })

  })
}
getXRA()

function getHomeAway(arr) {

  for (let i = 0; i < arr.length - 1; i++) {
    let home = arr[i][3]
    let away = arr[i][4]

    teamHomeAwayScore.push(teams[i], home, away)
  }
}



app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});

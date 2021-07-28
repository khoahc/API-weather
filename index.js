const { text } = require("express");
const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "f211b6c3e7c9ab062fc1fc9f52a14672";
  const unit = "metric";
  const lang = "en";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit +
    "&lang=" +
    lang;
  https.get(url, function (response) {
    console.log(res.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const cityName = weatherData.name;
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(desc);
      res.write(
        "<h1>The temperature in " +
          cityName +
          " is " +
          temp +
          " degrees Celcius</h1>"
      );
      res.write("<p>The weather is currently " + desc + "</p>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("3000");
});

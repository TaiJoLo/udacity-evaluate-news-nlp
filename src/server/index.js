const dotenv = require("dotenv");
dotenv.config();

var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const port = process.env.PORT || 8081;

const app = express();

app.use(express.static("dist"));

console.log(__dirname);
console.log(
  "path.join(__dirname, '../../dist/index.html':",
  path.join(__dirname, "../../dist/index.html")
);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../../dist/index.html"));
  // res.sendFile("dist/index.html");
  // res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

console.log(`API key is ${process.env.API_KEY}`);

app.get("/api/key", (req, res) => {
  res.send({ apiKey: process.env.API_KEY });
});

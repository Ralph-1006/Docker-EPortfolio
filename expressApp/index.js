const { readFileSync, writeFileSync } = require("fs");
const express = require("express");
const app = express();
app.use(express.static("."));
btnCount = 0;
app.get("/btn", (req, res) => {
  res.sendStatus(200);
  const count = readFileSync("stats/button.txt", "utf-8");
  const countIncrement = parseInt(count) + 1;
  writeFileSync("stats/button.txt", String(countIncrement));
  console.log("button wurde: " + countIncrement + " geklickt");
  btnCount = countIncrement;
});
app.get("/", (req, res) => {
  const count = readFileSync("stats/aufrufe.txt", "utf-8");
  const countIncrement = parseInt(count) + 1;
  btnCount = readFileSync("stats/button.txt", "utf-8");
  writeFileSync("stats/aufrufe.txt", String(countIncrement));
  console.log("Aufrufe der Seite: " + countIncrement);
  res.send(`<!DOCTYPE html>
  <html>
    <head>
      <title>Docker-Page</title>
      <style>
        h1 {
          color: #2496ed;
        }
        input {
          background-color: #2496ed;
          border-radius: 10px;
          color: white;
        }
      </style>
    </head>
    <body>
      <h1>Das ist meine tolle Website</h1>
      <p>Das ist ein Beispiel für eine Website mit einem Docker Container</p>
      <h3>Die Seite wurde ${countIncrement} mal aufgerufen, der Button <span id="btnCount">${btnCount}</span> mal geklickt </h3>
      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet.
      </p>
      <p id="visited"></p>
      <input type="button" value="Klick mich :)" onclick="toggleImage()" />
      <img
        src="docker.png"
        id="whale"
        alt="docker whale"
        style="display: none; margin-left: auto; margin-right: auto; width: 30%"
      />
      <script>
        function toggleImage() {
          fetch("http://"+location.hostname+":5000/btn")
          if (document.getElementById("whale").style.display == "none") {
            document.getElementById("whale").style.display = "block";
          } else {
            document.getElementById("whale").style.display = "none";
          }
          document.getElementById("btnCount").innerHTML =  parseInt(document.getElementById("btnCount").innerText) + 1;
        }
      </script>
    </body>
  </html>
  `);
});

app.listen(5000, () => console.log("website running: http://127.0.0.1:5000/"));

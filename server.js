const express = require("express");
const app = express();
const port = 3000;

app.get(
  "/",
  () => console.log("Hello there"),
  (req, res) => {
    res.send("Hello World!");
  }
);

app.listen(port, () => {
  console.log(`Server is very running at http://localhost:${port}`);
});

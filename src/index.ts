import express from "express";
const app = express();
const port = process.env.PORT || "8080";

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

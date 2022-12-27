import express, { Application } from "express";

const app: Application = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Hello world!",
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;

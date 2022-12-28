import express, { Application } from "express";
import routes from "./routes";
import images from "./routes/api/images";

const app: Application = express();
const port = 3000;

app.use("/", routes);
app.use("/api/images", images);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;

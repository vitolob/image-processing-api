import { Router } from "express";
import fs from "fs";

const router = Router();

router.get("/", (req, res) => {
  const { filename, width, height } = req.query;

  fs.readFile(`./assets/${filename}`, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).type("image/jpeg").send(data);
    }
  });
});

export default router;

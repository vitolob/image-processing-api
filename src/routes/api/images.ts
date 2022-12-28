import { Router } from "express";
import fs from "fs";
import Sharp from "sharp";

const router = Router();

router.get("/", (req, res) => {
  const { filename, width, height } = req.query;

  Sharp(`./assets/${filename}`)
    .resize(Number(width), Number(height))
    .toBuffer()
    .then((data) => {
      res.set("Content-Type", "image/jpeg");
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

export default router;

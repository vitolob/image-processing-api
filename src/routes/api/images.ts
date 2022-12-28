import { Router } from "express";
import { existsSync, mkdirSync } from "fs";
import Sharp from "sharp";

const router = Router();
const cacheDir = "./assets/cache";

router.get("/", (req, res) => {
  const { filename, width, height } = req.query;

  // Check if resized image exists
  const cachePath = `${process.cwd()}/${cacheDir}/${width}x${height}-${filename}`;
  if (existsSync(cachePath)) {
    res.sendFile(cachePath);
    return;
  }

  // Resize and save image in cache
  Sharp(`./assets/${filename}`)
    .resize(Number(width), Number(height))
    .toBuffer()
    .then((data) => {
      // Create cache directory if it's first image
      if (!existsSync(cacheDir)) {
        mkdirSync(cacheDir);
      }

      // Save resized image to cache
      Sharp(data)
        .toFile(cachePath)
        .then(() => {
          res.set("Content-Type", "image/jpeg");
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

export default router;

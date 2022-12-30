import { Router, Request, Response } from "express";
import { existsSync } from "fs";
import { resizeImage, saveImageToCache } from "../../utils/image-processing";

const router = Router();

router.get("/", (req: Request, res: Response): void => {
  const { filename, width, height } = req.query;

  // Check if resized image exists
  const cachePath = `${process.cwd()}/assets/cache/${width}x${height}-${filename}`;
  if (existsSync(cachePath)) {
    res.sendFile(cachePath);
    return;
  }

  // Resize and save image in cache
  resizeImage(filename as string, Number(width), Number(height))
    .then((data) => {
      return saveImageToCache(
        data,
        filename as string,
        Number(width),
        Number(height)
      );
    })
    .then(() => {
      res.set("Content-Type", "image/jpeg");
      res.sendFile(cachePath);
    })
    .catch((err) => {
      if (err.message.includes("file is missing")) {
        res.status(404).send({ error: err.message });
      } else {
        res.status(500).send({ error: err.message });
      }
    });
});

export default router;

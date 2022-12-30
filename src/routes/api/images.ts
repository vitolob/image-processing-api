import { Router, Request, Response } from "express";
import { existsSync } from "fs";
import { resizeImage, saveImageToCache } from "../../utils/image-processing";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const { filename, width, height } = req.query;

  // Check if resized image exists
  const cachePath = `${process.cwd()}/assets/cache/${width}x${height}-${filename}`;
  if (existsSync(cachePath)) {
    res.sendFile(cachePath);
    return;
  }

  try {
    // Resize and save image in cache
    const data = await resizeImage(
      filename as string,
      Number(width),
      Number(height)
    );
    await saveImageToCache(
      data,
      filename as string,
      Number(width),
      Number(height)
    );

    res.set("Content-Type", "image/jpeg");
    res.sendFile(cachePath);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes("file is missing")) {
        res.status(404).send({ error: err.message });
      } else {
        res.status(500).send({ error: err.message });
      }
    } else {
      throw err;
    }
  }
});

export default router;

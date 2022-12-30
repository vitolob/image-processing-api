import { existsSync, mkdirSync } from "fs";
import Sharp from "sharp";

export const resizeImage = async (
  filename: string,
  width: number,
  height: number
): Promise<Buffer> => {
  try {
    return await Sharp(`./assets/${filename}`).resize(width, height).toBuffer();
  } catch (err) {
    throw err;
  }
};

export const saveImageToCache = async (
  data: Buffer,
  filename: string,
  width: number,
  height: number
): Promise<void> => {
  const cacheDir = "./assets/cache";
  const cachePath = `${process.cwd()}/${cacheDir}/${width}x${height}-${filename}`;

  // Create cache directory if it does not exist
  if (!existsSync(cacheDir)) {
    mkdirSync(cacheDir);
  }

  // Save image to cache
  try {
    await Sharp(data).toFile(cachePath);
  } catch (err) {
    throw err;
  }
};

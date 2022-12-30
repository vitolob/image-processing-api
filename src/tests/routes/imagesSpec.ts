import app from "../../index";
import supertest from "supertest";
import { existsSync } from "fs";
import sharp from "sharp";

const request = supertest(app);

describe("GET /api/images endpoint", () => {
  it("should return a 200 status code and an image file", async () => {
    const response = await request
      .get("/api/images")
      .query({ filename: "fjord.jpg", width: "200", height: "200" });

    expect(response.status).toBe(200);
    expect(response.type).toBe("image/jpeg");
  });

  it("should resize the image", async () => {
    const response = await request
      .get("/api/images")
      .query({ filename: "fjord.jpg", width: "300", height: "300" });
    expect(response.status).toBe(200);

    // Get resized image and compare its dimensions to the expected dimensions
    const image = sharp(response.body);
    const metadata = await image.metadata();
    expect(metadata.width).toEqual(300);
    expect(metadata.height).toEqual(300);
  });

  it("should cache the resized image", async () => {
    const res = await request
      .get("/api/images")
      .query({ filename: "fjord.jpg", width: 100, height: 100 });
    expect(res.status).toBe(200);

    const cachePath = `${process.cwd()}/assets/cache/100x100-fjord.jpg`;
    expect(existsSync(cachePath)).toBe(true);
  });
});

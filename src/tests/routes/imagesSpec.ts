import app from "../../index";
import supertest from "supertest";
import { existsSync } from "fs";
import sharp from "sharp";
import * as fs from "fs";

const request = supertest(app);

describe("GET /api/images endpoint", () => {
  beforeEach(() => {
    // Create the 'assets/cache' directory if it does not exist
    if (!fs.existsSync("assets/cache")) {
      fs.mkdirSync("assets/cache");
    }
  });

  afterEach(() => {
    // Delete the cached image after each test case
    fs.unlinkSync("assets/cache/100x100-test-image.jpg");
  });

  it("should return a 200 status code and an image file", async () => {
    const response = await request
      .get("/api/images")
      .query({ filename: "test-image.jpg", width: "100", height: "100" });

    expect(response.status).toBe(200);
    expect(response.type).toBe("image/jpeg");
  });

  it("should resize the image", async () => {
    const response = await request
      .get("/api/images")
      .query({ filename: "test-image.jpg", width: "100", height: "100" });
    expect(response.status).toBe(200);

    // Get resized image and compare its dimensions to the expected dimensions
    const image = sharp(response.body);
    const metadata = await image.metadata();
    expect(metadata.width).toEqual(100);
    expect(metadata.height).toEqual(100);
  });

  it("should cache the resized image", async () => {
    const res = await request
      .get("/api/images")
      .query({ filename: "test-image.jpg", width: 100, height: 100 });
    expect(res.status).toBe(200);

    const cachePath = `${process.cwd()}/assets/cache/100x100-test-image.jpg`;
    expect(existsSync(cachePath)).toBe(true);
  });
});

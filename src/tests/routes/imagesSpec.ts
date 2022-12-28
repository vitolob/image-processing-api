import app from "../../index";
import supertest from "supertest";

const request = supertest(app);

describe("GET /api/images endpoint", () => {
  it("should return a 200 status code and an image file", async () => {
    const response = await request
      .get("/api/images")
      .query({ filename: "fjord.jpg", width: "200", height: "200" });

    expect(response.status).toBe(200);
    expect(response.type).toBe("image/jpeg");
  });
});

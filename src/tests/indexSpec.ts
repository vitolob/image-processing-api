import app from "../index";
import supertest from "supertest";

const request = supertest(app);

describe("GET / endpoint", () => {
  it("should return a 200 status code", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});

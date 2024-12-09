import app from "../04-log.js";
import request from "supertest";

describe("Express App Routes", () => {
  it("should return a success message for the root route", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Your request reached the server");
  });

  it("should return a success message for the /log route", async () => {
    const response = await request(app).get("/log");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Your request reached the log route");
  });

  it("should return 404 for an unknown route", async () => {
    const response = await request(app).get("/unknown");
    expect(response.statusCode).toBe(404);
  });
});

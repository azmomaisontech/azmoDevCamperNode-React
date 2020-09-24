const request = require("supertest");
const User = require("../../../models/User");
const Bootcamp = require("../../../models/Bootcamp");

jest.setTimeout(30000);

describe("Protect & Authorize Middleware", () => {
  let server;
  let userToken;
  let publisherToken;

  beforeAll(async () => {
    server = require("../../../server");

    const user = await request(server)
      .post("/api/v1/auth/register")
      .send({
        name: "a",
        email: "a@test.com",
        password: "123456"
      });

    const agent = await request(server)
      .post("/api/v1/auth/register")
      .send({
        name: "b",
        email: "b@test.com",
        password: "123456",
        role: "publisher"
      });

    userToken = user.body.token;
    publisherToken = agent.body.token;
  });

  afterAll(async () => {
    await server.close();
    await User.deleteMany({});
    await Bootcamp.deleteMany({});
  });

  describe("Auth Route - Protect Middleware", () => {
    it("Should return 401 and unauthorized error if user is not logged in", async () => {
      const res = await request(server).get("/api/v1/auth/me");
      expect(res.status).toBe(401);
      expect(res.body.error).toMatch(/Unauthorized/i);
    });

    it("Should return 200 if user is logged in", async () => {
      const res = await request(server)
        .get("/api/v1/auth/me")
        .set("Authorization", "Bearer " + userToken);
      expect(res.status).toBe(200);
    });
  });

  describe("Bootcamp Route - Authorize Middleware", () => {
    let token;
    const exec = async () => {
      return await request(server)
        .post("/api/v1/bootcamps")
        .set("Authorization", "Bearer " + token)
        .send({ name: "c", description: "c", address: "c", careers: ["Web Development"] });
    };

    it("Should return 401 error if user is not a publisher", async () => {
      token = userToken;
      const res = await exec();
      expect(res.status).toBe(403);
      expect(res.body.error).toMatch(/cannot perform this/i);
    });

    it("Should get return 201 if user is a publisher", async () => {
      token = publisherToken;
      const res = await exec();
      expect(res.body.data).toHaveProperty("name", "c");
      expect(res.status).toBe(201);
    });
  });
});

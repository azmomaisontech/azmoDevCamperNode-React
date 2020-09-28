const request = require("supertest");
const User = require("../../../models/User");
jest.setTimeout(30000);

describe("/api/v1/auth", () => {
  let server;
  let token;
  let user;
  beforeAll(async () => {
    server = require("../../../server");
  });

  afterAll(async () => {
    await User.deleteMany({});
    await server.close();
  });

  describe("Register a new user ", () => {
    const exec = async () => {
      return await request(server)
        .post("/api/v1/auth/register")
        .send(user);
    };

    it("Should return 400 error if name field is empty", async () => {
      user = { name: "", email: "a@test.com", password: "testing" };
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/add a name/i);
    });

    it("Should return 400 error if email field is empty", async () => {
      user = { name: "a", email: "", password: "testing" };
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/add an email/i);
    });

    it("Should return 400 error if email field is invalid", async () => {
      user = { name: "a", email: "aaa.com", password: "testing" };
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/invalid/i);
    });

    it("Should return 400 error if password field is empty", async () => {
      user = { name: "a", email: "a@test.com", password: "" };
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/add a password/i);
    });

    it("Should return 400 error if password length is < 6", async () => {
      user = { name: "a", email: "a@test.com", password: "12345" };
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/shorter/i);
    });

    it("Should return 201 and user info if user registered successfully", async () => {
      user = { name: "a", email: "a@test.com", password: "testing" };
      const res = await exec();
      expect(res.status).toBe(201);
      expect(res.body.data).toHaveProperty("name", "a");
    });
  });

  describe("Login User", () => {
    const exec = async () => {
      return await request(server)
        .post("/api/v1/auth/login")
        .send(user);
    };

    it("Should return 404 error if email field is empty", async () => {
      user = { email: "", password: "testing" };
      const res = await exec();
      expect(res.status).toBe(404);
      expect(res.body.error).toMatch(/Please enter email/i);
    });

    it("Should return 404 error if password field is empty", async () => {
      user = { email: "a@test.com", password: "" };
      const res = await exec();
      expect(res.status).toBe(404);
      expect(res.body.error).toMatch(/password/i);
    });

    it("Should return 401 error if username doesn't match", async () => {
      user = { email: "b@test.com", password: "testing" };
      const res = await exec();
      expect(res.status).toBe(401);
      expect(res.body.error).toMatch(/Invalid/i);
    });

    it("Should return 401 error if password doesn't match", async () => {
      user = { email: "a@test.com", password: "testin" };
      const res = await exec();
      expect(res.status).toBe(401);
      expect(res.body.error).toMatch(/Invalid/i);
    });

    it("Should return 200 and user info if user login successfully", async () => {
      user = { name: "a", email: "a@test.com", password: "testing" };
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty("name", "a");
    });
  });

  describe("Forgot Password Route", () => {});
});

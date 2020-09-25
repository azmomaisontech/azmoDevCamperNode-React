const request = require("supertest");
const User = require("../../../models/User");
const Bootcamp = require("../../../models/Bootcamp");
const mongoose = require("mongoose");
jest.setTimeout(30000);

describe("/api/v1/bootcamps", () => {
  let server;
  let firstToken;
  let secondToken;
  beforeAll(async () => {
    server = require("../../../server");
    let firstUser = new User({
      name: "a",
      email: "a@test.com",
      password: "123456",
      role: "publisher"
    });
    let secondUser = new User({
      name: "b",
      email: "b@test.com",
      password: "123456",
      role: "publisher"
    });
    await firstUser.save();
    await secondUser.save();
    firstToken = await firstUser.getSignedJwtToken();
    secondToken = await secondUser.getSignedJwtToken();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Bootcamp.deleteMany({});
    await server.close();
  });

  describe("Create a bootcamp", () => {
    let bootcamp;
    const exec = async () => {
      return await request(server)
        .post("/api/v1/bootcamps")
        .set("Authorization", "Bearer " + firstToken)
        .send(bootcamp);
    };

    afterEach(async () => {
      await Bootcamp.deleteMany({});
    });

    it("Should return 400 error if user has already published a bootamp", async () => {
      bootcamp = { name: "a", description: "b", address: "9 Queens road, London", careers: ["Other"] };
      await exec();
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/Maximum/i);
    });

    it("Should return 500 error, if user enters a bootcamp name that already exist", async () => {
      bootcamp = { name: "a", description: "b", address: "9 Queens road, London", careers: ["Other"] };
      await exec();
      firstToken = secondToken;
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/Already/i);
    });

    it("Should return 201 after creating a bootcamp", async () => {
      bootcamp = { name: "a", description: "b", address: "9 Queens road, London", careers: ["Other"] };
      const res = await exec();
      expect(res.status).toBe(201);
      expect(res.body.data).toHaveProperty("name", "a");
    });
  });

  describe("Create a bootcamp and run this block of test", () => {
    let newBootcamp;
    beforeAll(async () => {
      newBootcamp = await request(server)
        .post("/api/v1/bootcamps")
        .set("Authorization", "Bearer " + firstToken)
        .send({ name: "a", description: "b", address: "9 Queens road, London", careers: ["Other"] });
    });

    afterAll(async () => {
      await Bootcamp.deleteMany({});
    });

    describe("Get all bootcamps", () => {
      it("Should return 200 and all bootcamps in DB", async () => {
        const res = await request(server).get("/api/v1/bootcamps");
        expect(res.status).toBe(200);
        expect(res.body.data).toContainEqual(expect.objectContaining({ name: "a" }));
      });
    });

    describe("Get a bootcamp", () => {
      let id;
      const exec = async () => {
        return await request(server).get(`/api/v1/bootcamps/${id}`);
      };

      it("Should return 404 error if user provides an invalid id", async () => {
        id = 1;
        const res = await exec();
        expect(res.status).toBe(404);
        expect(res.body.error).toMatch(/Not found/i);
      });

      it("Should return 404 error if user provides a valid Id that matches no bootcamp on DB", async () => {
        id: mongoose.Types.ObjectId();
        const res = await exec();
        expect(res.status).toBe(404);
        expect(res.body.error).toMatch(/Not found/i);
      });

      it("Should return 200 and the correct agency with matching id", async () => {
        id = newBootcamp.body.data._id;
        const res = await exec();
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("name", "a");
      });
    });

    describe("Update a bootcamp", () => {
      let id;

      const exec = async () => {
        return await request(server)
          .put(`/api/v1/bootcamps/${id}`)
          .set("Authorization", "Bearer " + firstToken)
          .send({ name: "b" });
      };

      it("Should return 404 error if bootcamp is not found with the provided Id", async () => {
        id = mongoose.Types.ObjectId();
        const res = await exec();
        expect(res.status).toBe(404);
        expect(res.body.error).toMatch(/Not found/i);
      });

      it("Should return 200 and the new updated info", async () => {
        id = newBootcamp.body.data._id;
        const res = await exec();
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("name", "b");
      });

      it("Should return 401 error if user is not the owner", async () => {
        id = newBootcamp.body.data._id;
        let newUser = new User({
          name: "C",
          email: "c@test.com",
          password: "123456",
          role: "publisher"
        });
        await newUser.save();
        firstToken = await newUser.getSignedJwtToken();

        const res = await exec();
        expect(res.status).toBe(401);
        expect(res.body.error).toMatch(/Cannot perform/i);
      });
    });
  });
});

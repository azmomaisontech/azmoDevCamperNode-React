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

    const firstUser = await request(server)
      .post("/api/v1/auth/register")
      .send({ name: "a", email: "a@test.com", password: "testing", role: "publisher" });

    const secondUser = await request(server)
      .post("/api/v1/auth/register")
      .send({ name: "b", email: "b@test.com", password: "testing", role: "publisher" });

    firstToken = firstUser.body.token;
    secondToken = secondUser.body.token;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Bootcamp.deleteMany({});
    await server.close();
  });

  describe("Create a bootcamp", () => {
    let bootcamp;
    let token;
    const exec = async () => {
      return await request(server)
        .post("/api/v1/bootcamps")
        .set("Authorization", "Bearer " + token)
        .send(bootcamp);
    };

    afterEach(async () => {
      await Bootcamp.deleteMany({});
    });

    it("Should return 400 error if user has already published a bootamp", async () => {
      token = firstToken;
      bootcamp = { name: "a", description: "b", address: "9 Queens road, London", careers: ["Other"] };
      await exec();
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/Maximum/i);
    });

    it("Should return 500 error, if user enters a bootcamp name that already exist", async () => {
      token = firstToken;
      bootcamp = { name: "a", description: "b", address: "9 Queens road, London", careers: ["Other"] };
      await exec();
      token = secondToken;
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/Already/i);
    });

    it("Should return 201 after creating a bootcamp", async () => {
      token = firstToken;
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
      let token;
      const exec = async () => {
        return await request(server)
          .put(`/api/v1/bootcamps/${id}`)
          .set("Authorization", "Bearer " + token)
          .send({ name: "b" });
      };

      it("Should return 404 error if bootcamp is not found with the provided Id", async () => {
        id = mongoose.Types.ObjectId();
        token = firstToken;
        const res = await exec();
        expect(res.status).toBe(404);
        expect(res.body.error).toMatch(/Not found/i);
      });

      it("Should return 401 error if user is not the owner", async () => {
        id = newBootcamp.body.data._id;
        token = secondToken;
        const res = await exec();
        expect(res.status).toBe(401);
        expect(res.body.error).toMatch(/Cannot perform/i);
      });

      it("Should return 200 and the new updated info", async () => {
        id = newBootcamp.body.data._id;
        token = firstToken;
        const res = await exec();
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("name", "b");
      });
    });

    describe("Upload photo", () => {
      let id;
      let image;
      let token;
      const exec = async () => {
        return await request(server)
          .put(`/api/v1/bootcamps/${id}/photo`)
          .set("Authorization", "Bearer " + token)
          .attach("file", image);
      };

      it("Should return 404 error if user provide an invalid Id", async () => {
        id = 1;
        image = __dirname + "/testImage/correct.jpg";
        token = firstToken;
        const res = await exec();
        expect(res.status).toBe(404);
      });

      it("Should return 404 error if no bootcamp with the id exist", async () => {
        id = mongoose.Types.ObjectId();
        image = __dirname + "/testImage/correct.jpg";
        token = firstToken;
        const res = await exec();
        expect(res.status).toBe(404);
      });

      it("Should return 400 error if no file was uploaded", async () => {
        id = newBootcamp.body.data._id;
        image = "";
        token = firstToken;
        const res = await exec();
        expect(res.status).toBe(400);
        expect(res.body.error).toMatch(/upload a file/i);
      });

      it("Should return 400 error if uploaded file is not of type image", async () => {
        id = newBootcamp.body.data._id;
        image = __dirname + "/testImage/pdf.pdf";
        token = firstToken;
        const res = await exec();
        expect(res.status).toBe(400);
        expect(res.body.error).toMatch(/upload/i);
      });

      it("Should return 400 error if uploaded file larger than 1MB", async () => {
        id = newBootcamp.body.data._id;
        image = __dirname + "/testImage/large.jpg";
        token = firstToken;
        const res = await exec();
        expect(res.status).toBe(400);
        expect(res.body.error).toMatch(/less/i);
      });

      it("Should just return 200 and the filename", async () => {
        id = newBootcamp.body.data._id;
        image = __dirname + "/testImage/correct.jpg";
        token = firstToken;
        const res = await exec();
        expect(res.status).toBe(200);
        expect(res.body.data).toMatch(/photo/);
      });
    });

    describe("Delete a Bootcamp", () => {
      let id;
      let token;
      const exec = async () => {
        return await request(server)
          .delete(`/api/v1/bootcamps/${id}`)
          .set("Authorization", "Bearer " + token);
      };

      it("Should return 404 error if bootcamp is not found with the provided Id", async () => {
        id = mongoose.Types.ObjectId();
        token = firstToken;
        const res = await exec();
        expect(res.status).toBe(404);
        expect(res.body.error).toMatch(/Not found/i);
      });

      it("Should return 401 error if user is not the owner", async () => {
        id = newBootcamp.body.data._id;
        token = secondToken;
        const res = await exec();
        expect(res.status).toBe(401);
      });

      it("Should return 200 if bootcamp is deleted successfully", async () => {
        id = newBootcamp.body.data._id;
        token = firstToken;
        const res = await exec();
        expect(res.status).toBe(200);
      });
    });
  });
});

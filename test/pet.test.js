const request = require("supertest");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const app = require("../app");
const expect = chai.expect;

chai.use(chaiAsPromised);

describe("Functional tests - pet", () => {
  it("should fail to create a pet without a firstName", async () => {
    const res = await request(app).post("/pets").send({
      lastName: "Smith",
      age: "16",
      color: "blue",
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
  });

  it("should create a pet", async () => {
    const pet = {
      name: "Kaiser",
      age: 16,
      color: "blue",
    };
    const res = await request(app).post("/pets").send(pet);
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(pet.name);
    expect(res.body.age).to.equal(pet.age);
    expect(res.body.color).to.equal(pet.color);
  });

  it("should fail in getting a pet with an invalid name", async () => {
    const res = await request(app).get("/pets/KaiserDome");
    expect(res.status).to.equal(404);
    expect(res.text).to.equal('"Pet not found"');
  });

  it("should succeed in getting a pet", async () => {
    const res = await request(app).get("/pets/Kaiser");
    expect(res.status).to.equal(200);
  });

  it("should fail in deleting the pet with an invalid name", async () => {
    const res = await request(app).delete("/pets/KaiserDome");
    expect(res.status).to.equal(404);
    expect(res.text).to.equal('"Pet not found"');
  });

  it("should succeed in deleting a pet", async () => {
    const res = await request(app).delete("/pets/Kaiser");
    expect(res.status).to.equal(200);
  });
});

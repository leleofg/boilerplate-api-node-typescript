import request from "supertest";
import app from "../../src/app";
import * as faker from "faker";
import { CreateUser, Login, UpdateUser } from "../../src/interfaces/User";
import { setup } from "../setup-test";

setup();
let userId: string;
let tokenAuth: string;

describe("User", () => {
  beforeAll(async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    const userCreated = await request(app)
      .post("/users")
      .send({
        birthDate: new Date(),
        email,
        name: faker.name.findName(),
        password,
        phone: faker.phone.phoneNumber(),
      } as CreateUser);

    userId = userCreated.body.id;

    const { token } = (
      await request(app)
        .post("/login")
        .send({ email, password } as Login)
    ).body;

    tokenAuth = token;
  });

  describe("getUsers", () => {
    it("should receive status 200 when get users", async () => {
      const response = await request(app).get("/users").auth(tokenAuth, { type: "bearer" });

      expect(response.status).toBe(200);
    });
  });

  describe("getUserById", () => {
    it("should receive status 500 when searching for a user with id uuid invalid", async () => {
      const response = await request(app).get("/users/1").auth(tokenAuth, { type: "bearer" });

      expect(response.status).toBe(500);
    });

    it("should receive status 201 when return an user", async () => {
      const response = await request(app).get(`/users/${userId}`).auth(tokenAuth, { type: "bearer" });

      expect(response.status).toBe(200);
    });
  });

  describe("createUser", () => {
    it("should receive status 201 when create an user", async () => {
      const userCreated = await request(app).post("/users").send({
        birthDate: new Date(),
        email: faker.internet.email(),
        name: faker.name.findName(),
        password: faker.internet.password(),
        phone: faker.phone.phoneNumber(),
      });

      expect(userCreated.status).toBe(201);
    });
  });

  describe("editUser", () => {
    it("should receive status 401 when edit an user different userId token", async () => {
      const userUpdated = await request(app)
        .put("/users/1")
        .send({
          name: faker.name.findName(),
          phone: faker.phone.phoneNumber(),
          updatedAt: new Date(),
        } as UpdateUser)
        .auth(tokenAuth, { type: "bearer" });

      expect(userUpdated.status).toBe(401);
    });

    it("should receive status 200 when edit an user", async () => {
      const userUpdated = await request(app)
        .put(`/users/${userId}`)
        .send({
          name: faker.name.findName(),
          phone: faker.phone.phoneNumber(),
          updatedAt: new Date(),
        } as UpdateUser)
        .auth(tokenAuth, { type: "bearer" });

      expect(userUpdated.status).toBe(200);
    });
  });

  describe("deleteUser", () => {
    it("should receive status 401 deleted an user different userId token", async () => {
      const userDeleted = await request(app).delete("/users/1").auth(tokenAuth, { type: "bearer" });

      expect(userDeleted.status).toBe(401);
    });

    it("should receive status 200 when delete an user", async () => {
      const userDeleted = await request(app).delete(`/users/${userId}`).auth(tokenAuth, { type: "bearer" });

      expect(userDeleted.status).toBe(200);
    });
  });
});

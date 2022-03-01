import mongoose from "mongoose";
import supertest from "supertest";
import createServer from "../utils/createServer";
import * as UserService from "../services/user.service";
import * as SessionService from "../services/session.service";
import { createUserSessionHandler } from "../controllers/session.controller";

const server = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  email: "jane.doe@example.com",
  fullName: "Jane Doe",
};

const userInput = {
  fullName: "Jane Doe",
  phoneNumber: 9022218455,
  email: "test@example.com",
  password: "Password123",
  passwordConfirmation: "Password123",
};

const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: userId,
  valid: true,
  userAgent: "PostmanRuntime/7.28.4",
  createdAt: new Date("2021-09-30T13:31:07.674Z"),
  updatedAt: new Date("2021-09-30T13:31:07.674Z"),
  __v: 0,
};

describe("user", () => {
  // user registration

  describe("create new user", () => {
    it("should return 200 and the user payload", async () => {
        const createUserServiceMock = jest.fn((): any => userInput);
            
        jest.spyOn(UserService, "createUser").mockImplementation(() => createUserServiceMock());

        const {body, statusCode} = await supertest(server).post(`/api/users`).send(userInput);
        
        expect(statusCode).toBe(200);
        expect(body).toEqual(userInput);
        expect(createUserServiceMock).toHaveBeenCalledTimes(1);
    });
  });

});

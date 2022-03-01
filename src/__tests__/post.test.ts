import supertest from "supertest";
import * as PostService from "../services/post.service";
import createServer from "../utils/createServer";
import mongoose from "mongoose";
import { createPost } from "../services/post.service";
import { signJwt } from "../utils/jwt.utils";

const server = createServer();

const userId = new mongoose.Types.ObjectId().toString();
const accessTokenPrivateKey = "config/accessTokenKey/jwtRS256.key";

const postInput = {
  title: "new post",
  postBody: "new post body.",
};

const postPayload = {
  title: "new post",
  postBody: "new post body.",
  detailDescription: "php2.",
  _id: "621988bf325015209a9c3e75",
  postId: "post_28t87ihlbh",
  createdAt: "2022-02-26T01:56:15.123Z",
  updatedAt: "2022-02-26T01:56:15.123Z",
  __v: 0
};

const userPayload = {
  _id: userId,
  email: "jane.doe@example.com",
  name: "Jane Doe",
};

describe("posts", () => {

  describe("get the list of all post", () => {
    it("should return a 200 and the list of all posts", async () => {
        const findAllPostServiceMock = jest.fn((): any => [postInput]);
            
        jest.spyOn(PostService, "findAllPost").mockImplementation(() => findAllPostServiceMock());

        const {body, statusCode} = await supertest(server).get(`/api/posts`);
        
        expect(statusCode).toBe(200);
        expect(body).toEqual([postInput]);
        expect(findAllPostServiceMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("create post", () => {
    it("should return a 200 and return created post payload", async () => {
        const createPostServiceMock = jest.fn((): any => postPayload);
        
        jest.spyOn(PostService, "createPost").mockImplementation(() => createPostServiceMock());

        const jwt = signJwt(userPayload, accessTokenPrivateKey);
        
        const {body, statusCode} = await supertest(server).post(`/api/posts`).set("Authorization", `Bearer ${jwt}`).send(postInput);

        expect(statusCode).toBe(200);
        expect(body).toEqual(postPayload);
        expect(createPostServiceMock).toHaveBeenCalledTimes(1);
    });
  });

  // describe("get single post and update it", () => {
  //   it("should return a 200 and the single post", async () => {
  //       const findAndUpdatePostServiceMock = jest.fn((): any => postPayload);
            
  //       jest.spyOn(PostService, "findAndUpdatePost").mockImplementation(() => findAndUpdatePostServiceMock());

  //       const jwt = signJwt(userPayload, accessTokenPrivateKey);

  //       const {body, statusCode} = await supertest(server).put(`/api/posts/${postPayload.postId}`).set("Authorization", `Bearer ${jwt}`).send(postInput);
        
  //       expect(statusCode).toBe(200);
  //       expect(body).toEqual(postPayload);
  //       expect(findAndUpdatePostServiceMock).toHaveBeenCalledTimes(1);

  //   });
  // });

});
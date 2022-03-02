import { Express, Request, Response } from "express";
import {
  createPostHandler,
  getPostHandler,
  updatePostHandler,
  deletePostHandler,
  getAllPostHandler,
} from "./controllers/post.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controllers/session.controller";
import { createUserHandler } from "./controllers/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
  updatePostSchema,
} from "./schemas/post.schema";
import { createSessionSchema } from "./schemas/session.schema";
import { createUserSchema } from "./schemas/user.schema";

function routes(server: Express) {
  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              type: object
   *              required:
   *                - fullName
   *                - phoneNumber
   *                - email
   *                - password
   *                - passwordConfirmation
   *              properties:
   *                fullName:
   *                  type: string
   *                  default: Taiwo Hassan
   *                phoneNumber:
   *                  type: number
   *                  default: 9022218455
   *                email:
   *                  type: string
   *                  default: taiwo@example.com
   *                password:
   *                  type: string
   *                  default: Password123
   *                passwordConfirmation:
   *                  type: string
   *                  default: Password123
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              properties:
   *                fullName:
   *                  type: string
   *                phoneNumber:
   *                  type: number
   *                email:
   *                  type: string
   *                _id:
   *                  type: string
   *                createdAt:
   *                  type: string
   *                updatedAt:
   *                  type: string
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  server.post("/api/users", validateResource(createUserSchema), createUserHandler);

  /**
   * @openapi
   * '/api/sessions':
   *  post:
   *     tags:
   *     - User
   *     summary: Login a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              type: object
   *              required:
   *                - email
   *                - password
   *              properties:
   *                email:
   *                  type: string
   *                  default: taiwo@example.com
   *                password:
   *                  type: string
   *                  default: Password123
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              properties:
   *                  accessToken:
   *                    type: string
   *                  refreshToken:
   *                    type: string
   *     409:
   *       description: Conflict
   *     400:
   *       description: Bad request
   */
  server.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  server.get("/api/sessions", requireUser, getUserSessionsHandler);

  server.delete("/api/sessions", requireUser, deleteSessionHandler);

  /**
   * @openapi
   * '/api/posts':
   *  get:
   *     tags:
   *     - Posts
   *     summary: Get a all post
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              properties:
   *                  _id:
   *                    type: string
   *                  title:
   *                    type: string
   *                  postBody:
   *                    type: string
   *       404:
   *         description: Post not found
   */
  server.get("/api/posts", getAllPostHandler);

  /**
   * @openapi
   * '/api/posts':
   *  post:
   *     tags:
   *     - Posts
   *     summary: Create new post
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              type: object
   *              required:
   *                - title
   *                - postBody
   *              properties:
   *                title:
   *                  type: string
   *                  default: Man Utd match
   *                postBody:
   *                  type: string
   *                  default: this is new sure man utd old with over 5.50 sure old.
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              properties:
   *                  title:
   *                    type: string
   *                  postBody:
   *                    type: string
   *     409:
   *       description: Conflict
   *     400:
   *       description: Bad request       
   * 
   */
  server.post(
    "/api/posts",
    validateResource(createPostSchema),
    createPostHandler
  );

  server.put(
    "/api/posts/:postId",
    [requireUser, validateResource(updatePostSchema)],
    updatePostHandler
  );

  server.get(
    "/api/posts/:postId",
    validateResource(getPostSchema),
    getPostHandler
  );

  server.delete(
    "/api/posts/:postId",
    [requireUser, validateResource(deletePostSchema)],
    deletePostHandler
  );
}

export default routes;

import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    postBody: string({
      required_error: "Post body is required",
    }),
  }),
};

const params = {
  params: object({
    postId: string({
      required_error: "postId is required",
    }),
  }),
};

export const createPostSchema = object({
  ...payload,
});

export const updatePostSchema = object({
  ...payload,
  ...params,
});

export const deletePostSchema = object({
  ...params,
});

export const getPostSchema = object({
  ...params,
});

export type CreatePostInput = TypeOf<typeof createPostSchema>;
export type UpdatePostInput = TypeOf<typeof updatePostSchema>;
export type ReadPostInput = TypeOf<typeof getPostSchema>;
export type DeletePostInput = TypeOf<typeof deletePostSchema>;

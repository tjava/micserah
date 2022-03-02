import { Request, Response } from "express";
import {
  CreatePostInput,
  UpdatePostInput,
} from "../schemas/post.schema";
import {
  createPost,
  deletePost,
  findAllPost,
  findAndUpdatePost,
  findPost,
} from "../services/post.service";

export async function createPostHandler(
  req: Request<{}, {}, CreatePostInput["body"]>,
  res: Response
) {
  const userId = "621edc1eb2be5bd8c500c376";
  // const userId = res.locals.user._id;

  const body = req.body;

  const post = await createPost({ ...body, user: userId });

  return res.send(post);
}

export async function updatePostHandler(
  req: Request<UpdatePostInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const postId = req.params.postId;
  const update = req.body;

  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  if (String(post.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedPost = await findAndUpdatePost({ postId }, update, {
    new: true,
  });

  return res.send(updatedPost);
}

export async function getAllPostHandler(req: Request, res: Response) {
  const post = await findAllPost();

  if (!post) {
    return res.sendStatus(404);
  }

  return res.send(post);
}

export async function getPostHandler(
  req: Request<UpdatePostInput["params"]>,
  res: Response
) {
  const postId = req.params.postId;
  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  return res.send(post);
}

export async function deletePostHandler(
  req: Request<UpdatePostInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const postId = req.params.postId;

  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  if (String(post.user) !== userId) {
    return res.sendStatus(403);
  }

  await deletePost({ postId });

  return res.sendStatus(200);
}

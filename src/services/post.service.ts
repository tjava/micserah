import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import PostModel, {
  PostDocument,
  PostInput,
} from "../models/post.model";

export async function createPost(input: PostInput) {

  try {
    const result = await PostModel.create(input);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function findAllPost() {

  try {
    const result = await PostModel.find({}).select("title").select("postBody");
    return result;
  } catch (error) {

    throw error;
  }
}

export async function findPost(
  query: FilterQuery<PostDocument>,
  options: QueryOptions = { lean: true }
) {

  try {
    const result = await PostModel.findOne(query, {}, options);
    return result;
  } catch (error) {

    throw error;
  }
}

export async function findAndUpdatePost(
  query: FilterQuery<PostDocument>,
  update: UpdateQuery<PostDocument>,
  options: QueryOptions
) {
  return PostModel.findOneAndUpdate(query, update, options);
}

export async function deletePost(query: FilterQuery<PostDocument>) {
  return PostModel.deleteOne(query);
}

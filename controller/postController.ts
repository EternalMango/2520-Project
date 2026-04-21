import { stringify } from "querystring";
import * as db from "../fake-db";

// Make calls to your db from this file!
async function getPosts(n = 5, sub: string) {
  return db.getPosts(n, sub);
}

function editComment(comment_id: string, changes = {}) {
  return db.editComment;
}

function getUser(id: string) {
  return db.getUser(id);
}

function getSubs() {
  return db.getSubs();
}

function getPost(id: string) {
  return db.getPost(id);
}

function editPost(id: string, changes = {}) {
  return db.editPost(id, changes);
}

function addComment(post_id: string, creator: string, description: string) {
  return db.addComment(post_id, creator, description);
}
function deletePost(postid: string) {
  return db.deletePost(postid);
}

async function createPost(
  title: string,
  link: string,
  creator: string,
  description: string,
  subgroup: string,
) {
  return db.addPost(title, link, creator, description, subgroup);
}

async function voteForPosts(id: string, value: number, userId: number) {
  const votes = db.getVotesForPost(Number(id));
  for (let vote of votes) {
    //
  }
}

function deleteComment(comment_id: string) {
  return db.deleteComment(comment_id);
}

export {
  getPosts,
  getUser,
  getSubs,
  createPost,
  voteForPosts,
  getPost,
  editPost,
  deletePost,
  addComment,
  editComment,
  deleteComment,
};

import * as db from "../fake-db";

// Make calls to your db from this file!
async function getPosts(n = 5, sub: string) {
  return db.getPosts(n, sub);
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

async function createPost(
  title: string,
  link: string,
  creator: string,
  description: string,
  subgroup: string,
) {
  return db.addPost(title, link, creator, description, subgroup);
}

export {
  getPosts,
  getUser,
  getSubs,
  createPost,
  getPost,
  editPost,
  addComment,
};

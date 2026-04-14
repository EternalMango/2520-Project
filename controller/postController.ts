import * as db from "../fake-db";

// Make calls to your db from this file!
async function getPosts(n = 5, sub = undefined) {
  return db.getPosts(n, sub);
}

function getUser(id: string) {
  return db.getUser(id);
}

function getPost(id: string) {
  return db.getPost(id);
}

function editPost(id: string, changes = {}) {
  return db.editPost(id, changes);
}

export { getPosts, getUser, getPost, editPost };

import * as db from "../fake-db";

// Make calls to your db from this file!
async function getPosts(n = 5, sub = undefined) {
  return db.getPosts(n, sub);
}

function getUser(id: number) {
  return db.getUser(id);
}

export { getPosts, getUser };

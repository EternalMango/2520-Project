import * as db from "../fake-db";

// Make calls to your db from this file!
async function getPosts(n = 5, sub = undefined) {
  return db.getPosts(n, sub);
}

function getUser(id: string) {
  return db.getUser(id);
}

function getSubs() {
  return db.getSubs();
}

export { 
  getPosts, 
  getUser,
  getSubs
};

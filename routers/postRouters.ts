// @ts-nocheck
import express from "express";
import * as database from "../controller/postController";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", async (req, res) => {
  let posts = await database.getPosts(20);
  posts = posts.map((post) => {
    return { ...post, creator: database.getUser(post.creator) };
  });
  const user = await req.user; //
  res.render("posts", { posts, user });
});

router.get("/create", ensureAuthenticated, (req, res) => {
  res.render("createPosts");
});

router.post("/create", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
});

router.get("/show/:postid", async (req, res) => {
  // ⭐ TODO
  //   shows post title, post link, timestamp, and creator
  // also has a list of all comments related to this post
  // each of these should show the comment description, creator, and timestamp
  // optionally, each comment could have a link to delete it
  // if you're logged in, a form for commenting should show
  // req.params.postid
  let posts = await database.getPosts(1, req.params.postid);
  posts = posts.map((post) => {
    return { ...post, creator: database.getUser(post.creator) };
  });
  const user = await req.user;
  res.render("individualPost", { posts });
});

router.get("/edit/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
});

router.post("/edit/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
});

router.get("/deleteconfirm/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
});

router.post("/delete/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
});

router.post(
  "/comment-create/:postid",
  ensureAuthenticated,
  async (req, res) => {
    // ⭐ TODO
  },
);

export default router;

// @ts-nocheck
import express from "express";
import * as database from "../controller/postController";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { create } from "domain";

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
  const {title, link, description, subgroup} = req.body;
  const creator = (await req.user).id;
  //console.log({ creator });
  const newpost = await database.createPost(title, link, creator, description, subgroup);
  res.render("createPosts")
  console.log(newpost)
  //res.render("individualPost", { database.getPost(), currentuser});
  //res.redirect("individualPost", { newpost })

  //res.redirect("individualPost", {}) //this should redirect to the individual post you just made
});

router.get("/show/:postid", async (req, res) => {
  // ⭐ TODO
  // req.params.postid
  let postids = await database.getPost(req.params.postid); // gets specifc post
  const user = await req.user;
  res.render("individualPost", { postids, user });
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

router.get("/upvote/:postid", ensureAuthenticated, async (req, res) => {
  const user = await req.user;
  database.voteForPost(req.params.postid, 1, user.id)
})
router.get("/downvote/:postid", ensureAuthenticated, async (req, res) => {
  const user = await req.user;
  database.voteForPost(req.params.postid, -1, user.id)
})
 
export default router;

// @ts-nocheck
import express from "express";
import * as database from "../controller/postController";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { title } from "process";
import { create } from "domain";
import { appendFileSync, link } from "fs";
import { link } from "fs";
import { deletePost } from "../fake-db";

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
  const { title, link, description, subgroup } = req.body;
  const creator = (await req.user).id;
  //console.log({ creator });
  const newpost = await database.createPost(
    title,
    link,
    creator,
    description,
    subgroup,
  );
  res.render("createPosts");
  console.log(newpost);
  //res.render("individualPost", { database.getPost(), currentuser});
  //res.redirect("individualPost", { newpost })

  //res.redirect("individualPost", {}) //this should redirect to the individual post you just made
});

router.get("/show/:postid", async (req, res) => {
  const postids = await database.getPost(req.params.postid); //gets specifc postid
  const user = await req.user;
  res.render("individualPost", { postids, user });
});

router.get("/edit/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
  const toEdit = await database.getPost(req.params.postid);
  const user = await req.user;
  res.render("editPost", { toEdit, user });
});

router.post("/edit/:postid", ensureAuthenticated, async (req, res) => {
  const changes = {
    title: req.body.titleChange,
    description: req.body.descriptionChange,
    subgroup: req.body.subChange,
  };
  const postEdits = await database.editPost(req.params.postid, changes);
  const user = await req.user;
  res.redirect(`/posts/show/${req.params.postid}`);
});

router.get("/deleteconfirm/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
  // const postId = req.params.postid;
  res.render("deletePost", { postId: req.params.postid })
});

router.post("/delete/:postid", ensureAuthenticated, async (req, res) => {
  const postId = req.params.postid;
  database.deletePost(postId);
});

router.get(
  "/comments/show/:commentid",
  ensureAuthenticated,
  async (req, res) => {
    const getComment = await database.getPost(req.params.commentid);
    const user = await req.user;
    res.render("createComment", { user, getComment });
  },
);

router.get(
  "/comments/deleteconfirm/:commentid",
  ensureAuthenticated,
  async (require, res) => {
    // triggered by /comments/show/:commentid
  },
);

router.post(
  "/comment-create/:postid",
  ensureAuthenticated,
  async (req, res) => {
    const user = await req.user;
    const creator = user.id;
    const comments = await database.addComment(
      req.params.postid,
      creator,
      req.body.comment,
    );
    res.redirect(`/posts/show/${req.params.postid}`);
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

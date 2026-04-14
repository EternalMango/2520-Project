// @ts-nocheck
import express from "express";
import * as database from "../controller/postController";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { title } from "process";
import { create } from "domain";
import { link } from "fs";

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
  let preEdit = {
    title: toEdit.title,
    description: toEdit.description,
  };
  const user = await req.user;
  res.render("editPost", { toEdit, preEdit, user });
});

router.post("/edit/:postid", ensureAuthenticated, async (req, res) => {
  const changes = {
    title: req.body.titleChange,
    description: req.body.descriptionChange,
    link: req.body.linkChange,
    subgroup: req.body.subChange,
  };
  const postEdits = await database.editPost(req.params.postid, changes);
  const user = await req.user;
  res.redirect(`/posts/show/${req.params.postid}`);
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

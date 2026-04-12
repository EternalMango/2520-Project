// const { ensureAuthenticated } = require("../middleware/checkAuth");
import express from "express";
import * as database from "../controller/postController";
const router = express.Router();

router.get("/list", async (req, res) => {
  // ⭐ TODO
  let sublist = await database.getSubs();
  //console.log(sublist);
  res.render("subs", {sublist});
});

router.get("/show/:subname", async (req, res) => {
  // ⭐ TODO
  let currentsub = await database.getPosts(20, req.params.subname);
  const subpost = await req.body.subgroup;
  res.render("sub", { currentsub });
});

export default router;  
const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const dotenv = require("dotenv").config();

const router = express.Router();

async function checkForPosts() {
  const posts = await loadPostsCollection();
  const postCount = await posts.countDocuments();
  return postCount > 0;
}

let post_id;

async function setInitialPostId() {
  if (await checkForPosts()) {
    const posts = await loadPostsCollection();
    const maxPostId = await posts.findOne({}, { sort: { post_id: -1 } });
    post_id = maxPostId.post_id;
  } else {
    post_id = 0;
  }
}

setInitialPostId();

// Get Posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Post
router.post("/", async (req, res) => {
  /* if (!(await checkForPosts())) {
    let post_id = 0;
  }*/
  const posts = await loadPostsCollection();
  const maxPostId = await posts.findOne({}, { sort: { post_id: -1 } });
  post_id = maxPostId.post_id + 1;
  //post_id += 1;
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date(),
    post_id: post_id,
  });
  res.status(201).send();
});

// Delete Post
router.delete("/:id", async (req, res) => {
  const mongodb = require("mongodb");
  const posts = await loadPostsCollection();

  await posts.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
  console.log("Deleted file data from MongoDB...");
  res.status(200).send({});
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  });

  return client.db("vue_express").collection("posts");
}

module.exports = router;

// new comment - test

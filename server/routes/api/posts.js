const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const dotenv = require("dotenv").config();
const { S3 } = require("aws-sdk");

const router = express.Router();

async function checkForPosts() {
  const posts = await loadPostsCollection();
  const postCount = await posts.countDocuments();
  return postCount > 0;
}

let post_id;

async function setInitialPostId() {
  const posts = await loadPostsCollection();
  const s3 = new S3();

  let maxPostId = 1;
  if (await checkForPosts()) {
    const post = await posts.findOne({}, { sort: { post_id: -1 } });
    maxPostId = post.post_id;
  }

  let maxS3Id = 1;
  const s3Param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix: "models/",
  };
  const objects = await s3.listObjectsV2(s3Param).promise();
  if (objects.Contents.length > 0) {
    maxS3Id = objects.Contents.reduce((max, obj) => {
      const s3_id = parseInt(obj.Key.match(/models\/(\d+)\.(obj|glb)$/)[1], 10);
      return s3_id > max ? s3_id : max;
    }, 0);
  }

  post_id = Math.max(maxPostId, maxS3Id);
}

setInitialPostId();

// Get Posts
router.get("/", async (req, res) => {
  const userEmail = req.query.userEmail;
  console.log(userEmail);
  const posts = await loadPostsCollection();
  const filteredPosts = await posts.find({ user_email: userEmail }).toArray(); // posts.find({ userId: userId })
  res.send(filteredPosts); // Send the filtered posts as the response
  // res.send(await posts.find({}).toArray());
});

// Add Post
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await setInitialPostId(); // Compute the new post_id value
  post_id += 1;
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date(),
    post_id: post_id,
    user_email: req.body.userEmail,
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
module.exports.post_id = post_id;
module.exports.loadPostsCollection = loadPostsCollection;
module.exports.setInitialPostId = setInitialPostId;
module.exports.checkForPosts = checkForPosts;

//module.exports = router;

// new comment - test

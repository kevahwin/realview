const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const dotenv = require("dotenv").config();
const { S3 } = require("aws-sdk");
const { s3Uploadv2 } = require("./s3service.js");

const router = express.Router();

// Get Posts
router.get("/", async (req, res) => {
  const userEmail = req.query.userEmail;
  console.log(userEmail);
  const posts = await loadPostsCollection();
  const filteredPosts = await posts.find({ user_email: userEmail }).toArray(); // posts.find({ userId: userId })
  res.send(filteredPosts); // Send the filtered posts as the response
});

// Add Post
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  const { text, userEmail, id } = req.body;
  await posts.insertOne({
    text: text,
    createdAt: new Date(),
    post_id: id, // use the file ID as the post ID
    user_email: userEmail,
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

module.exports.loadPostsCollection = loadPostsCollection;

const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get Posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

let post_id = 0;
// Add Post
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  post_id += 1;
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
  res.status(200).send({});
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://groupproject:GroupProject123@cluster0.w5ojlli.mongodb.net/test",
    {
      useNewUrlParser: true,
    }
  );

  return client.db("vue_express").collection("posts");
}

module.exports = router;

// new comment - test
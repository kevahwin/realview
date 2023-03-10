/**********************************************
 * UPLOAD.JS: Uploads a files to Amazon S3     *
 ***********************************************/
const dotenv = require("dotenv").config();
const express = require("express");
const mongodb = require("mongodb");
const multer = require("multer");
const aws = require("aws-sdk");
const {
  s3Uploadv2,
  s3GetBucketContents,
  s3GetFile,
  s3GetFileLink,
  s3DeleteFile,
  s3DeleteObjFile,
} = require("./s3service");
const User = require("../../models/userModel");
const ERROR_FILE_TYPE = "Only glb files are allowed.";
const MAX_SIZE = 1024 * 1024 * 10; // MAX SIZE OF 10 MB

const router = express.Router();

//Creating storage for S3
const storage = multer.memoryStorage();

// // Uploaded file validation using multer, incl. logic for local storage, file size, and file type
const upload = multer({
  storage,
  limits: {
    fileSize: MAX_SIZE,
  },
  fileFilter: (req, file, cb) => {
    if (
      !file.originalname.endsWith(".glb") &&
      !file.originalname.endsWith(".obj")
    ) {
      const error = new Error("Wrong file type");
      error.code = "ERROR_FILE_TYPE";
      return cb(error, false);
    }
    cb(null, true);
  },
});


//POST Single Upload to S3
router.post("/", upload.single("file"), async (req, res) => {
  const userEmail = req.body.user_email;
  const randomId = req.body.randomId;

  //Upload the file
  const result = await s3Uploadv2(req.file, userEmail, randomId);

  //Send JSON response to check
  res.json({ file: req.file, result });
});

//GET list of all uploads from S3
router.get("/", async (req, res) => {
  const bucketData = await s3GetBucketContents();
  res.json({ bucketData });
});

//GET upload from S3 to local directory
router.get("/local", async (req, res) => {
  const fileData = await s3GetFile();
  res.json({ fileData });
});

//GET item.glb Link from S3 by id
router.get("/:id", async (req, res) => {
  const fileLink = await s3GetFileLink(req.params.id);
  res.json({ fileLink });
});

//DELETE item.glb file from S3 by id
router.delete("/:id", async (req, res) => {
  // delete the post from S3
  try {
    console.log(`Trying to delete ${req.params.id}`);
    await s3DeleteFile(req.params.id);
    await s3DeleteObjFile(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete post from S3");
  }
});

//Error Handling (Must Come After POST Request)
router.use(function (err, req, res, next) {
  if (err.code === "ERROR_FILE_TYPE") {
    res.status(422).json({ error: "Only .glb and .obj files are allowed!" });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: "Too large file." });
    return;
  }
});

module.exports = router;

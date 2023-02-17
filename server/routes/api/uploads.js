/**********************************************
 * UPLOAD.JS: Uploads a files to Amazon S3     *
 ***********************************************/
const dotenv = require("dotenv").config();
const express = require("express");
const mongodb = require("mongodb");
const multer = require("multer");
// const fs = require("fs")
// const multerS3 = require('multer-s3');
const aws = require("aws-sdk");
const {
  s3Uploadv2,
  s3GetBucketContents,
  s3GetFile,
  s3GetFileLink,
} = require("./s3service");
const User = require("../../models/userModel");
const ERROR_FILE_TYPE = "Only glb files are allowed.";
const MAX_SIZE = 1024 * 1024 * 10; // MAX SIZE OF 100MB

const router = express.Router();

// Uploading to local disk to a destination and with a given filename
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, '../client/public/models/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, 'item.glb');
//     }
// });

//Creating storage for S3
const storage = multer.memoryStorage();

// // Uploaded file validation using multer, incl. logic for local storage, file size, and file type
const upload = multer({
  storage, //: storage,
  limits: {
    fileSize: MAX_SIZE,
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.endsWith(".glb")) {
      const error = new Error("Wrong file type");
      error.code = "ERROR_FILE_TYPE";
      return cb(error, false);
    }
    cb(null, true);
  },
});

//Multer S3
// const s3 = new aws.S3();
// const upload = multer({
//     storage: multerS3({
//         bucket: process.env.AWS_BUCKET_NAME,
//         s3: s3,
//         // acl:"public-read",
//         key: (req, file, cb) => {
//             cb(null, `models/item.glb`);
//         }
//     }),
//     limits: {
//         fileSize: MAX_SIZE
//     },
//     fileFilter: (req, file, cb) => {
//         if (!file.originalname.endsWith('.glb')) {
//             const error = new Error("Wrong file type");
//             error.code = "ERROR_FILE_TYPE";
//             return cb(error, false);
//         }
//         cb(null, true);
//     }
// });

// //Single Upload to S3
// router.post('/', upload.single('file'), async (req, res) => {
//     try{
//         const file = req.file;
//         console.log(file);
//         res.status(200).json({
//             success: true,
//             message: "File uploaded successfully",
//             data: {
//                 file
//             }
//         });

//     }catch(error){
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: "File upload failed",
//             error: error.message
//         })
//     }
//     //console.log(req.file);
//     //res.send(`Successfully uploaded ${req.file.originalname} to ${req.file.location}`);
//     //res.send(`Successfully uploaded ${req.file.originalname} to ${result.Location }`)
// });

//POST Single Upload to S3
router.post("/", upload.single("file"), async (req, res) => {
  // if(err){
  //     return res.status(400).json({success: false, message: err.message});
  // }
  //Upload the file
  const result = await s3Uploadv2(req.file);

  //Get the fileLink (Hardcoded now - should be dynamic in future from req.file.location)
  //const filename = "item";
  const fileLink = await s3GetFileLink(filename);

  //Await a UserSchema with field objectURL and store fileLink there
  await User.create({ objectUrl: fileLink });

  //Send JSON response to check
  res.json({ file: req.file, result, fileLink });
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
  // const filePath = '../client/public/models/';
  // writeFileToLocalDirectory(fileData, filePath);
});

//GET item.glb Link from S3 by id
router.get("/:id", async (req, res) => {
  const fileLink = await s3GetFileLink(req.params.id);
  res.json({ fileLink });
});

//Error Handling (Must Come After POST Request)
router.use(function (err, req, res, next) {
  if (err.code === "ERROR_FILE_TYPE") {
    res.status(422).json({ error: "Only .glb files are allowed!" });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: "Too large file." });
    return;
  }
});

module.exports = router;

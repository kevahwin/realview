const { S3 } = require("aws-sdk");
const { loadPostsCollection } = require("./posts.js");

//Upload file to s3
exports.s3Uploadv2 = async (file, userEmail, id) => {
  const s3 = new S3();
  const posts = await loadPostsCollection();
  let key = `models/${id}.glb`;
  if (file.originalname.endsWith(".obj")) {
    key = `models/${id}.obj`;
  }
  const uploadParam = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
  };
  const uploadResult = await s3.upload(uploadParam).promise();
  const postData = {
    id: id,
    user_email: userEmail,
    text: "file1",
    post_id: id, // same as the S3 file name
  };
  return uploadResult;
};

//Get List of Contents in S3 Bucket
exports.s3GetBucketContents = async () => {
  const s3 = new S3();

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    MaxKeys: 10,
  };

  const bucketData = await s3.listObjects(param).promise();
  return bucketData || {};
};

//Get file from S3 Bucket to Local File
exports.s3GetFile = async () => {
  const s3 = new S3();

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `models/item.glb`,
  };

  return await s3.getObject(param).promise();
};

//Get link to file from S3 Bucket
exports.s3GetFileLink = async (id) => {
  const s3 = new S3();

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `models/${id}.glb`,
  };

  return await s3.getSignedUrl("getObject", param);
};

// Delete file from S3 - Default (.GLB)
exports.s3DeleteFile = async (id) => {
  const s3 = new S3();

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `models/${id}.glb`,
  };
  return await s3.deleteObject(param, function (err, data) {
    console.log(`Data before: ${data}`);
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully deleted file from S3 bucket");
      console.log(`Data after: ${data}`);
    }
  });
};

// Delete file from S3 - (.OBJ)
exports.s3DeleteObjFile = async (id) => {
  const s3 = new S3();

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key:  `models/${id}.obj`,
  };
  return await s3.deleteObject(param, function (err, data) {
    console.log(`Data before: ${data}`);
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully deleted file from S3 bucket");
      console.log(`Data after: ${data}`);
    }
  });
};

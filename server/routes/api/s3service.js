const { S3 } = require("aws-sdk");
const multer = require("multer");

post_id = 0;
//Upload file to s3
exports.s3Uploadv2 = async (file) => {
  const s3 = new S3();

  post_id += 1;
  let key = `models/${post_id}.glb`;
  if (file.originalname.endsWith(".obj")) {
    key = `models/${post_id}.obj`;
  }
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
  };
  return await s3.upload(param).promise();
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

// Delete file from S3 -
exports.s3DeleteFile = async (id) => {
  const s3 = new S3();

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `models/${id}.glb`,
  };

  return await s3.deleteObject(param, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully deleted file from bucket");
      console.log(data);
    }
  });
};

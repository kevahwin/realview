const { S3 } = require("aws-sdk");
const multer = require("multer");

//Upload file to s3
exports.s3Uploadv2 = async (file) => {
  const s3 = new S3();

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `models/item.glb`,
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

//Try to Get Files from S3 - Doesnt work
// exports.s3GetFile = async() => {
//     const s3 = new S3();

//     const param = {
//         Bucket: process.env.AWS_BUCKET_NAME
//     };

//     s3.config.setPromisesDependency();
//     s3.config.update(param);
//     // return await s3.listObjectsV2({
//     //     Bucket: process.env.AWS_BUCKET_NAME
//     // }).promise();

//     const response = await s3.listObjectsV2({
//         Bucket: process.env.AWS_BUCKET_NAME
//     }).promise();

//     return response;

// };

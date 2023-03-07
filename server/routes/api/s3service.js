const { S3 } = require("aws-sdk");
const multer = require("multer");
//const { post_id } = require("./posts.js");
const { loadPostsCollection } = require("./posts.js");

const { checkForPosts } = require("./posts.js");

// Get the highest post_id in the S3 bucket

/*async function getMaxPostId() {
  const s3 = new S3();

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix: "models/",
  };

  const objects = await s3.listObjectsV2(param).promise();
  const maxPostId = objects.Contents.reduce((max, obj) => {
    const post_id = parseInt(obj.Key.match(/models\/(\d+)\.(obj|glb)$/)[1], 10);
    return post_id > max ? post_id : max;
  }, 0);

  return maxPostId;
}
*/

async function setInitialPostId() {
  if (await checkForPosts()) {
    const posts = await loadPostsCollection();
    const maxPostId = await posts.findOne({}, { sort: { post_id: -1 } });
    const s3 = new S3();
    const param = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: "models/",
    };
    const objects = await s3.listObjectsV2(param).promise();
    const maxS3Id = objects.Contents.reduce((max, obj) => {
      const s3_id = parseInt(obj.Key.match(/models\/(\d+)\.(obj|glb)$/)[1], 10);
      return s3_id > max ? s3_id : max;
    }, 0);
    post_id = Math.max(maxPostId.post_id, maxS3Id);
  } else {
    post_id = 1;
  }
}

setInitialPostId();

// Set the initial value of post_id based on the highest post_id in the S3 bucket

//post_id = 0;

//Upload file to s3
exports.s3Uploadv2 = async (file) => {
  const s3 = new S3();
  const posts = await loadPostsCollection();
  const maxPostId = await posts.findOne({}, { sort: { post_id: -1 } });
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix: "models/",
  };
  const objects = await s3.listObjectsV2(param).promise();
  const maxS3Id = objects.Contents.reduce((max, obj) => {
    const s3_id = parseInt(obj.Key.match(/models\/(\d+)\.(obj|glb)$/)[1], 10);
    return s3_id > max ? s3_id : max;
  }, 0);
  post_id = Math.max(maxPostId.post_id, maxS3Id) + 1;
  let key = `models/${post_id}.glb`;
  if (file.originalname.endsWith(".obj")) {
    key = `models/${post_id}.obj`;
  }
  const uploadParam = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
  };
  return await s3.upload(uploadParam).promise();
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
    Key: `models/${id}.glb` || `models/${id}.obj`,
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

const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const upload = async () => {
  const params = {
    ACL: "public-read",
    Body: "hello world",
    ContentType: "text/html",
    Bucket: "wornoffkeys",
    Key: "file-from-lambda.txt",
  };

  return await new Promise((resolve, reject) => {
    s3.putObject(params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const main = async (event) => {
  console.log("Event:", event);
  return upload();
};
exports.handler = main;

const filesystem = require("fs");
const aws = require("aws-sdk");
const fileDeleteHandler = (files) => {
  files.forEach((file) => {
    filesystem.unlink(file, (error) => {
      if (error) {
        throw error;
      }
    });
  });
};

const awsFileUploadHandler = (fileName, fileBody) => {
  const s3Bucket = new aws.S3();
  s3Bucket
    .upload({
      Bucket: "zombie-hat",
      Key: fileName,
      Body: fileBody,
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

module.exports = fileDeleteHandler;

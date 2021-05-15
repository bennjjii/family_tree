const uploadFile = require("./middleware/upload");
const fs = require("fs");
const baseUrl = process.env.BASE_URL;
const AWS = require("aws-sdk");
// Configure aws
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

let s3 = new AWS.S3();

const upload_controller = async (req, res, next) => {
  //console.log(req);
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    //console.log(req.file);

    // res.status(200).send({
    //   message: "Uploaded the file successfully: " + req.file.originalname,
    // });
    //file is now buffered
    next();
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  console.log(directoryPath);

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

const download_aws = async (req, res) => {
  let data = await s3
    .getObject({
      Bucket: "geneolos3bucket",
      Key: "user_images/union.png",
    })
    .promise();
  let file = Buffer.from(data.Body).toString("base64");
  console.log(file);

  let image = "<img src='data:image/jpeg;base64," + file + "'" + "/>";

  res.send(image);

  //res.status(200).send();
};

module.exports = {
  upload_controller,
  getListFiles,
  download,
  download_aws,
};

const sharp = require("sharp");

const resizeAndSave = async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }

  console.log(req.file);
  const filename = req.file.originalname;
  const newFilename = filename.substr(0, filename.lastIndexOf(".")) || filename;
  await sharp(req.file.buffer)
    //can do clever stuff here like crop to focus on the face
    .resize(240, 240)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`${__basedir}/resources/static/assets/uploads/${newFilename}.jpeg`);
  res.sendStatus(200);
};

module.exports = resizeAndSave;

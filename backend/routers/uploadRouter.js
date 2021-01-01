import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();


const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
  console.log("inside / api");
  console.log("-------------------------");

  res.send(`/${req.file.path}`);
});

const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;

aws.config.update({
    secretAccessKey: secretAccessKey,
    accessKeyId: accessKeyId,
    region: 'us-east-2',
    signatureVersion: 'v4'
});

var s3 = new aws.S3();

const storageS3 = multerS3({
  s3,
  bucket: 'unsad-bucket',
  acl: 'public-read',
  // contentType: multerS3.AUTO_CONTENT_TYPE,
  // metadata: function (req, file, cb) {
  //   console.log("metadata");
  //   cb(null, {fieldName: file.fieldname});
  // },

  key: function (req, file, cb) {
      console.log("key");
      console.log(aws.config);
      cb(null, file.originalname); //use Date.now() for unique file keys
  }
})

var uploadS3 = multer({
  storage: storageS3
});

uploadRouter.post('/s3', uploadS3.single('image'), (req, res) => {
  console.log("inside /s3 api");
  console.log("sssssssssssssssssssssssss");
  res.send(`${req.file.location}`);
});

export default uploadRouter;
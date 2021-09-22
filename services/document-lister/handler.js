const AWS = require('aws-sdk');
const S3DocumentReposity = require('./src/repository/s3-document-repository');

const s3 = new AWS.S3();
const s3DocumentRepository = new S3DocumentReposity(s3);

exports.run = async () => {
  try {
    const documents = await s3DocumentRepository.list();

    return { statusCode: 200, body: JSON.stringify({ documents }) };
  } catch (err) {
    console.log(err);
    return { statusCode: err.statusCode, Body: JSON.stringify({ error: err.code }) };
  }
};

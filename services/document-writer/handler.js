const AWS = require('aws-sdk');
const uuid = require('uuid');
const S3DocumentReposity = require('./src/repository/s3-document-repository');

exports.run = async (event) => {
  const body = JSON.parse(event.body);
  const { document } = body;
  try {
    const s3 = new AWS.S3();
    const s3DocumentRepository = new S3DocumentReposity(s3, uuid.v4);

    const key = await s3DocumentRepository.create(JSON.stringify(document));

    return { statusCode: 201, body: JSON.stringify({ key, document }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err }) };
  }
};

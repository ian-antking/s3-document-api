const AWS = require('aws-sdk');
const S3DocumentReposity = require('./src/repository/s3-document-repository');

const ERROR_CODES = {
  NotFound: 404,
  AccessDenied: 401,
};

exports.run = async (event) => {
  const { key } = event.pathParameters;

  try {
    const s3 = new AWS.S3();
    const s3DocumentRepository = new S3DocumentReposity(s3);

    const document = await s3DocumentRepository.get(key);

    return { statusCode: 200, body: JSON.stringify({ document, key }) };
  } catch (err) {
    const { message } = err;
    return { statusCode: ERROR_CODES[message], body: JSON.stringify({ error: message }) };
  }
};

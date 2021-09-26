const AWS = require('aws-sdk');
const createDocumentSchema = require('./src/schema/create-document-request');
const S3DocumentReposity = require('./src/repository/s3-document-repository');

const s3 = new AWS.S3();
const s3DocumentRepository = new S3DocumentReposity(s3);

exports.run = async (event) => {
  const { key } = event.pathParameters;
  const data = JSON.parse(event.body);
  const { value, error } = createDocumentSchema.validate(data);

  if (error) {
    return { statusCode: 401, body: JSON.stringify({ errors: error.details }) };
  }

  try {
    const documentKey = await s3DocumentRepository.create(value, key);

    return {
      statusCode: 200,
      body: JSON.stringify({ key: documentKey, data: value }),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode,
      Body: JSON.stringify({ error: err.code }),
    };
  }
};

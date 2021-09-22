const AWS = require('aws-sdk');
const uuid = require('uuid');
const createDocumentSchema = require('./src/schema/create-document-request');
const S3DocumentReposity = require('./src/repository/s3-document-repository');

const s3 = new AWS.S3();
const s3DocumentRepository = new S3DocumentReposity(s3, uuid.v4);

exports.run = async (event) => {
  const data = JSON.parse(event.body);
  const { value, error } = createDocumentSchema.validate(data);

  if (error) {
    return { statusCode: 401, body: JSON.stringify({ errors: error.details }) };
  }

  try {
    const key = await s3DocumentRepository.create(value);

    return { statusCode: 201, body: JSON.stringify({ key, data: value }) };
  } catch (err) {
    return { statusCode: err.statusCode, Body: JSON.stringify({ error: err.code }) };
  }
};

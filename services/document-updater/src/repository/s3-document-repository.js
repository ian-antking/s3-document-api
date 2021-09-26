module.exports = class S3DocumentReposity {
  constructor(s3Client) {
    this.s3 = s3Client;
  }

  async create({ document, name }, key) {
    const object = {
      Key: key,
      Bucket: process.env.BUCKET_NAME,
      Body: JSON.stringify(document),
      Tagging: `name=${name}`,
    };

    await this.s3.putObject(object).promise();
    return object.Key;
  }
};

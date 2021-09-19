module.exports = class S3DocumentReposity {
  constructor(s3Client, keyGen) {
    this.s3 = s3Client;
    this.keyGen = keyGen;
  }

  async create(document) {
    const object = {
      Key: this.keyGen(),
      Bucket: process.env.BUCKET_NAME,
      Body: document,
    };

    try {
      await this.s3.putObject(object).promise();
      return object.Key;
    } catch (err) {
      throw new Error(err);
    }
  }
};

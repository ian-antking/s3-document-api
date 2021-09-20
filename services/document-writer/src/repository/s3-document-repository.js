module.exports = class S3DocumentReposity {
  constructor(s3Client, keyGen) {
    this.s3 = s3Client;
    this.keyGen = keyGen;
  }

  async create({ document, name }) {
    const object = {
      Key: this.keyGen(),
      Bucket: process.env.BUCKET_NAME,
      Body: JSON.stringify(document),
      Tagging: `name=${name}`,
    };

    try {
      await this.s3.putObject(object).promise();
      return object.Key;
    } catch (err) {
      throw new Error(err);
    }
  }
};

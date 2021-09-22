module.exports = class S3DocumentReposity {
  constructor(s3Client) {
    this.s3 = s3Client;
  }

  async get(Key) {
    const params = {
      Key,
      Bucket: process.env.BUCKET_NAME,
    };

    const response = await this.s3.getObject(params).promise();
    const data = JSON.parse(response.Body.toString('utf-8'));

    return data;
  }
};

module.exports = class S3DocumentReposity {
  constructor(s3Client) {
    this.s3 = s3Client;
  }

  async get(Key) {
    const params = {
      Key,
      Bucket: process.env.BUCKET_NAME,
    };

    try {
      const response = await this.s3.getObject(params).promise();
      const data = JSON.parse(response.Body.toString('utf-8'));

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (err) {
      const { code } = err;
      throw new Error(code);
    }
  }
};

module.exports = class S3DocumentReposity {
  constructor(s3Client) {
    this.s3 = s3Client;
  }

  async get(Key) {
    const params = {
      Key,
      Bucket: process.env.BUCKET_NAME,
    };

    const { TagSet } = await this.s3.getObjectTagging(params).promise();

    const response = await this.s3.getObject(params).promise();
    const document = JSON.parse(response.Body.toString('utf-8'));

    const nameTag = TagSet.find((tag) => tag.Key === 'name');

    const name = nameTag.Value;

    return { document, name };
  }
};

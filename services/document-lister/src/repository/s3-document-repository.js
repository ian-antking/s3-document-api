module.exports = class S3DocumentReposity {
  constructor(s3Client) {
    this.s3 = s3Client;
  }

  async getAllObjects() {
    const params = {
      Bucket: process.env.BUCKET_NAME,
    };
    const response = await this.s3.listObjectsV2(params).promise();
    return response;
  }

  async list() {
    const documents = await this.getAllObjects();
    const enrichedDocuments = await Promise.all(
      documents.Contents.map(
        (document) => new Promise((resolve, reject) => {
          const { Key } = document;
          const params = {
            Bucket: process.env.BUCKET_NAME,
            Key,
          };
          this.s3
            .getObjectTagging(params)
            .promise()
            .then((data) => {
              const { TagSet } = data;
              resolve({ Key, TagSet });
            })
            .catch((err) => reject(err));
        }),
      ),
    );
    return enrichedDocuments;
  }
};

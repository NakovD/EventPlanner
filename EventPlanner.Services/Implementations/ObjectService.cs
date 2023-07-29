namespace EventPlanner.Services.Implementations
{
    using Amazon.S3;
    using Amazon.S3.Model;
    using Contracts;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Identity.Client;
    using System.Threading.Tasks;

    public class ObjectService : IObjectService
    {
        private readonly IConfiguration configuration;

        private readonly IAmazonS3 s3Client;

        private readonly string bucketName;

        public ObjectService(IConfiguration configuration, IAmazonS3 s3Client)
        {
            this.configuration = configuration;
            this.s3Client = s3Client;
            bucketName = configuration["Objectstore:DocumentsBucket"]!;

            AmazonS3Config? config = s3Client.Config as AmazonS3Config;

            if (config != null)
            {
                config.ForcePathStyle = true;
            }
        }

        public async Task<(byte[] data, string contentType)> GetObject(string objectKey)
        {
            byte[] data = null!;
            string contentType = null!;

            var request = new GetObjectRequest()
            {
                BucketName = bucketName,
                Key = objectKey,
            };

            try
            {
                var response = await s3Client.GetObjectAsync(request);
                contentType = response.Headers.ContentType;

                using (var memoryStream = new MemoryStream())
                {
                    response.ResponseStream.CopyTo(memoryStream);
                    data = memoryStream.ToArray();
                }

            }
            catch (AmazonS3Exception ex)
            {
                throw new ApplicationException("Error getting document in S3", ex);
            }

            return (data, contentType);
        }

        public string GetPresignedUrl(string objectKey, double duration = 0, string contentType = "application/octet-stream")
        {
            var request = new GetPreSignedUrlRequest()
            {
                BucketName = bucketName,
                ContentType = contentType,
                Key = objectKey,
            };

            var presignedUrl = s3Client.GetPreSignedURL(request);


            return presignedUrl;
        }

        public async Task<string> SaveObject(byte[] obj, string contentType = "application/octet-stream")
        {
            var key = Guid.NewGuid().ToString();

            return await SaveObject(obj, key, contentType);
        }

        public async Task<string> SaveObject(byte[] obj, string objectKey, string contentType = "application/octet-stream")
        {
            using MemoryStream memoryStream = new MemoryStream(obj);

            var request = new PutObjectRequest()
            {
                BucketName = bucketName,
                Key = objectKey,
                InputStream = memoryStream,
                ContentType = contentType
            };

            try
            {
                var response = await s3Client.PutObjectAsync(request);
            }
            catch (AmazonS3Exception ex)
            {
                throw new ApplicationException("Error storing object.", ex);
            }

            return objectKey;
        }
    }
}

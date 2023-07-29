namespace EventPlanner.Services.Contracts
{

    public interface IObjectService
    {
        Task<string> SaveObject(byte[] obj, string contentType = "application/octet-stream");

        Task<string> SaveObject(byte[] obj, string objectKey, string contentType = "application/octet-stream");

        string GetPresignedUrl(string objectKey, double duration = 0.0, string contentType = "application/octet-stream");

        Task<(byte[] data, string contentType)> GetObject(string objectKey);
    }
}

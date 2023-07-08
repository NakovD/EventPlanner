namespace EventPlanner.Services.Contracts
{
    public interface IJsonService
    {
        string Serialize<T>(T entity) where T : class;

        T? Deserialize<T>(string json) where T : class;
    }
}

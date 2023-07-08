namespace EventPlanner.Services.Implementations
{
    using Contracts;
    using System.Text.Json;

    public class JsonService : IJsonService
    {
        public T? Deserialize<T>(string json) where T : class => JsonSerializer.Deserialize<T>(json);

        public string Serialize<T>(T entity) where T : class => JsonSerializer.Serialize(entity);
    }
}

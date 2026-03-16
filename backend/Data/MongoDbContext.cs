using MongoDB.Driver;
using GymApi.Models;

namespace GymApi.Data;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(string connectionString, string databaseName)
    {
        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
    }

    public IMongoCollection<ContactMessage> ContactMessages =>
        _database.GetCollection<ContactMessage>("ContactMessages");
}

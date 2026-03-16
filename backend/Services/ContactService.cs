using MongoDB.Driver;
using GymApi.Models;
using GymApi.Data;

namespace GymApi.Services;

public interface IContactService
{
    Task<ContactMessage> CreateContactMessageAsync(ContactMessage message);
    Task<List<ContactMessage>> GetAllContactMessagesAsync();
    Task<ContactMessage?> GetContactMessageByIdAsync(string id);
    Task UpdateContactMessageAsync(string id, ContactMessage message);
    Task DeleteContactMessageAsync(string id);
}

public class ContactService : IContactService
{
    private readonly MongoDbContext _context;

    public ContactService(MongoDbContext context)
    {
        _context = context;
    }

    public async Task<ContactMessage> CreateContactMessageAsync(ContactMessage message)
    {
        if (string.IsNullOrWhiteSpace(message.Name))
            throw new ArgumentException("Name is required");

        if (string.IsNullOrWhiteSpace(message.Email))
            throw new ArgumentException("Email is required");

        if (string.IsNullOrWhiteSpace(message.Message))
            throw new ArgumentException("Message is required");

        // Basic email validation
        if (!message.Email.Contains("@") || !message.Email.Contains("."))
            throw new ArgumentException("Invalid email format");

        message.CreatedAt = DateTime.UtcNow;
        await _context.ContactMessages.InsertOneAsync(message);
        return message;
    }

    public async Task<List<ContactMessage>> GetAllContactMessagesAsync()
    {
        return await _context.ContactMessages
            .Find(Builders<ContactMessage>.Filter.Empty)
            .SortByDescending(c => c.CreatedAt)
            .ToListAsync();
    }

    public async Task<ContactMessage?> GetContactMessageByIdAsync(string id)
    {
        return await _context.ContactMessages
            .Find(c => c.Id == id)
            .FirstOrDefaultAsync();
    }

    public async Task UpdateContactMessageAsync(string id, ContactMessage message)
    {
        var update = Builders<ContactMessage>.Update
            .Set(c => c.IsRead, message.IsRead)
            .Set(c => c.Name, message.Name)
            .Set(c => c.Email, message.Email)
            .Set(c => c.Message, message.Message);

        await _context.ContactMessages.UpdateOneAsync(
            c => c.Id == id,
            update
        );
    }

    public async Task DeleteContactMessageAsync(string id)
    {
        await _context.ContactMessages.DeleteOneAsync(c => c.Id == id);
    }
}

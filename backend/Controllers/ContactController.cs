using Microsoft.AspNetCore.Mvc;
using GymApi.Models;
using GymApi.Services;

namespace GymApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;
    private readonly ILogger<ContactController> _logger;

    public ContactController(IContactService contactService, ILogger<ContactController> logger)
    {
        _contactService = contactService;
        _logger = logger;
    }

    /// <summary>
    /// Submit a new contact message
    /// </summary>
    /// <param name="message">Contact message data</param>
    /// <returns>Created contact message</returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<ContactMessage>> CreateContactMessage([FromBody] ContactMessage message)
    {
        try
        {
            if (message == null)
            {
                return BadRequest(new { message = "Contact message data is required" });
            }

            var createdMessage = await _contactService.CreateContactMessageAsync(message);
            _logger.LogInformation($"New contact message created from {message.Email}");
            
            return CreatedAtAction(nameof(GetContactMessage), 
                new { id = createdMessage.Id }, 
                createdMessage);
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning($"Validation error: {ex.Message}");
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error creating contact message: {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError, 
                new { message = "An error occurred while processing your request" });
        }
    }

    /// <summary>
    /// Get all contact messages (Admin only)
    /// </summary>
    /// <returns>List of all contact messages</returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<List<ContactMessage>>> GetAllContactMessages()
    {
        try
        {
            var messages = await _contactService.GetAllContactMessagesAsync();
            return Ok(messages);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error retrieving contact messages: {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError, 
                new { message = "An error occurred while retrieving messages" });
        }
    }

    /// <summary>
    /// Get a specific contact message by ID
    /// </summary>
    /// <param name="id">Contact message ID</param>
    /// <returns>Contact message details</returns>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<ContactMessage>> GetContactMessage(string id)
    {
        try
        {
            var message = await _contactService.GetContactMessageByIdAsync(id);
            
            if (message == null)
            {
                return NotFound(new { message = "Contact message not found" });
            }

            return Ok(message);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error retrieving contact message: {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError, 
                new { message = "An error occurred while retrieving the message" });
        }
    }

    /// <summary>
    /// Update a contact message
    /// </summary>
    /// <param name="id">Contact message ID</param>
    /// <param name="message">Updated contact message data</param>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateContactMessage(string id, [FromBody] ContactMessage message)
    {
        try
        {
            var existingMessage = await _contactService.GetContactMessageByIdAsync(id);
            
            if (existingMessage == null)
            {
                return NotFound(new { message = "Contact message not found" });
            }

            await _contactService.UpdateContactMessageAsync(id, message);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error updating contact message: {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError, 
                new { message = "An error occurred while updating the message" });
        }
    }

    /// <summary>
    /// Delete a contact message
    /// </summary>
    /// <param name="id">Contact message ID</param>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteContactMessage(string id)
    {
        try
        {
            var existingMessage = await _contactService.GetContactMessageByIdAsync(id);
            
            if (existingMessage == null)
            {
                return NotFound(new { message = "Contact message not found" });
            }

            await _contactService.DeleteContactMessageAsync(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error deleting contact message: {ex.Message}");
            return StatusCode(StatusCodes.Status500InternalServerError, 
                new { message = "An error occurred while deleting the message" });
        }
    }
}

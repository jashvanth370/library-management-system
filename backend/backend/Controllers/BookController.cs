using backend.DTOs;
using backend.Modals;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly IBookService _bookService;

    public BooksController(IBookService bookService)
    {
        _bookService = bookService;
    }

    private int GetUserId()
    {
        var idValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(idValue) || !int.TryParse(idValue, out var id))
        {
            throw new UnauthorizedAccessException("User id claim is missing or invalid.");
        }

        return id;
    }

    [HttpGet("my")]
    public async Task<IActionResult> GetMyBooks()
    {
        var userId = GetUserId();

        var books = await _bookService.GetAllAsync(userId);

        return Ok(books);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllBooks()
    {

        var books = await _bookService.GetAllAsync();

        return Ok(books);
    }

    [HttpPost]
    public async Task<IActionResult> Create(BookDto dto)
    {
        var userId = GetUserId();

        await _bookService.CreateAsync(dto, userId);

        return Ok(new
        {
            message = "Book created successfully"
        });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, BookDto dto)
    {
        try
        {
            var userId = GetUserId();
            await _bookService.UpdateAsync(id, dto, userId);
            return Ok(new { message = "Book updated successfully" });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while updating the book.", error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var userId = GetUserId();
            await _bookService.DeleteAsync(id, userId);
            return Ok(new { message = "Book deleted successfully" });
        }
        catch (KeyNotFoundException ex)
        {
            return StatusCode(403, new { message = "You do not have permission to delete this book, or the book does not exist." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while deleting the book.", error = ex.Message });
        }
    }
}
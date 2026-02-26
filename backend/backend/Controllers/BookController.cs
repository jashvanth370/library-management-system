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

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAll()
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
        var userId = GetUserId();

        await _bookService.UpdateAsync(id, dto, userId);

        return Ok(new
        {
            message = "Book updated successfully"
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userId = GetUserId();

        await _bookService.DeleteAsync(id, userId);

        return Ok(new
        {
            message = "Book deleted successfully"
        });
    }
}
using backend.DTOs;
using backend.Modals;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRepository;

        public BookService(IBookRepository bookRepo)
        {
            _bookRepository = bookRepo;
        }

        public async Task<List<Book>> GetAllAsync()
            => await _bookRepository.GetAllAsync();

        public async Task<List<Book>> GetAllAsync(int userId)
            => await _bookRepository.GetAllAsync(userId);

        public async Task CreateAsync(BookDto dto, int userId)
        {
            var book = new Book
            {
                Title = dto.Title,
                Author = dto.Author,
                Description = dto.Description,
                UserId = userId
            };

            await _bookRepository.AddAsync(book);
        }

        public async Task UpdateAsync(int id, BookDto dto, int userId)
        {
            var book = await _bookRepository.GetByIdAsync(id, userId)
                       ?? throw new KeyNotFoundException("Book not found or access denied");

            book.Title = dto.Title;
            book.Author = dto.Author;
            book.Description = dto.Description;
            book.UpdatedAt = DateTime.UtcNow;

            await _bookRepository.UpdateAsync(book);
        }

        public async Task DeleteAsync(int id, int userId)
        {
            var book = await _bookRepository.GetByIdAsync(id, userId)
                       ?? throw new KeyNotFoundException("Book not found or access denied");

            await _bookRepository.DeleteAsync(book);
        }
    }
}
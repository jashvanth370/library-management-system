using backend.DTOs;
using backend.Modals;

namespace backend.Services.Interfaces
{
    public interface IBookService
    {
        Task<List<Book>> GetAllAsync();
        Task<List<Book>> GetAllAsync(int userId);
        Task CreateAsync(BookDto dto, int userId);
        Task UpdateAsync(int id, BookDto dto, int userId);
        Task DeleteAsync(int id, int userId);
    }
}

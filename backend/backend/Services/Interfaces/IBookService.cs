using backend.DTOs;
using backend.Modals;

namespace backend.Services.Interfaces
{
    public interface IBookService
    {
        Task<List<Book>> GetAllAsync();
        Task CreateAsync(BookDto dto);
        Task UpdateAsync(int id, BookDto dto);
        Task DeleteAsync(int id);
    }
}

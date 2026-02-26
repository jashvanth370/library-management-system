using backend.Modals;

namespace backend.Repositories.Interfaces
{
    public interface IBookRepository
    {
        Task<List<Book>> GetAllAsync();
        Task<List<Book>> GetAllAsync(int userId);
        Task<Book?> GetByIdAsync(int id);
        Task<Book?> GetByIdAsync(int id, int userId);
        Task AddAsync(Book book);
        Task UpdateAsync(Book book);
        Task DeleteAsync(Book book);
    }
}

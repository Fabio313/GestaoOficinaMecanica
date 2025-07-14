using Domain.Entities;

namespace Domain.Interfaces.Repositories
{
    public interface IClienteRepository
    {
        public Task<List<Cliente>> GetAllAsync();
        public Task<Cliente> GetByIdAsync(string id);
        public Task CreateAsync(Cliente cliente);
        public Task UpdateAsync(string id, Cliente cliente);
        public Task DeleteAsync(string id);
    }
}

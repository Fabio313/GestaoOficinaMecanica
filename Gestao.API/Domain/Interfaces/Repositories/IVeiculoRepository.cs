using Domain.Entities;

namespace Domain.Interfaces.Repositories
{
    public interface IVeiculoRepository
    {
        Task<List<Veiculo>> GetAllAsync();
        Task<Veiculo?> GetByIdAsync(string id);
        Task<Veiculo?> GetByPlacaAsync(string placa);
        Task CreateAsync(Veiculo veiculo);
        Task UpdateAsync(string id, Veiculo veiculo);
        Task DeleteAsync(string id);
    }
}
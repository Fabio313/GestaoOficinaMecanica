using Domain.Entities;

namespace Domain.Interfaces.Repositories
{
    public interface IOrdemDeServicoRepository
    {
        Task<List<OrdemDeServico>> GetAllAsync();
        Task<OrdemDeServico?> GetByIdAsync(string id);
        Task<List<OrdemDeServico>> GetByClienteIdAsync(string clienteId);
        Task<List<OrdemDeServico>> GetByVeiculoIdAsync(string veiculoId);
        Task CreateAsync(OrdemDeServico ordem);
        Task UpdateAsync(string id, OrdemDeServico ordem);
        Task DeleteAsync(string id);
    }
}
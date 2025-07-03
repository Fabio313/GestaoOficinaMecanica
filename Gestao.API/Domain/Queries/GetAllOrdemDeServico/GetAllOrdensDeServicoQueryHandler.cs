using Domain.Entities;
using Domain.Interfaces.Repositories;

namespace Domain.Queries.GetAllOrdemDeServico
{
    public class GetAllOrdensDeServicoQueryHandler(IOrdemDeServicoRepository ordemRepository)
    {
        private readonly IOrdemDeServicoRepository _ordemRepository = ordemRepository;

        public async Task<List<OrdemDeServico>> HandleAsync(GetAllOrdensDeServicoQuery query)
        {
            return await _ordemRepository.GetAllAsync();
        }
    }
}
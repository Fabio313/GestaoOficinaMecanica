using Domain.Entities;
using Domain.Interfaces.Repositories;

namespace Domain.Queries.GetOrdemDeServicoById
{
    public class GetOrdemDeServicoByIdQueryHandler(IOrdemDeServicoRepository ordemRepository)
    {
        private readonly IOrdemDeServicoRepository _ordemRepository = ordemRepository;

        public async Task<OrdemDeServico?> HandleAsync(GetOrdemDeServicoByIdQuery query)
        {
            return await _ordemRepository.GetByIdAsync(query.Id);
        }
    }
}
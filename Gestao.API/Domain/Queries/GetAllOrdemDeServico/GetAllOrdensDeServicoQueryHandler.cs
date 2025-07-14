using Domain.Entities;
using Domain.Interfaces.Repositories;
using MediatR;

namespace Domain.Queries.GetAllOrdemDeServico
{
    public class GetAllOrdensDeServicoQueryHandler(IOrdemDeServicoRepository ordemRepository) : IRequestHandler<GetAllOrdensDeServicoQuery, List<OrdemDeServico>>
    {
        private readonly IOrdemDeServicoRepository _ordemRepository = ordemRepository;

        public async Task<List<OrdemDeServico>> Handle(GetAllOrdensDeServicoQuery request, CancellationToken cancellationToken)
        {
            return await _ordemRepository.GetAllAsync();
        }
    }
}
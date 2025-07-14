using Domain.Entities;
using Domain.Interfaces.Repositories;
using MediatR;

namespace Domain.Queries.GetOrdemDeServicoById
{
    public class GetOrdemDeServicoByIdQueryHandler(IOrdemDeServicoRepository ordemRepository) : IRequestHandler<GetOrdemDeServicoByIdQuery, OrdemDeServico>
    {
        private readonly IOrdemDeServicoRepository _ordemRepository = ordemRepository;

        public async Task<OrdemDeServico> Handle(GetOrdemDeServicoByIdQuery request, CancellationToken cancellationToken)
        {
            return await _ordemRepository.GetByIdAsync(request.Id);
        }
    }
}
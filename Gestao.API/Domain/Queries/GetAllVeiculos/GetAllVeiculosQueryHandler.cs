using Domain.Entities;
using Domain.Interfaces.Repositories;
using MediatR;

namespace Domain.Queries.GetAllVeiculos
{
    public class GetAllVeiculosQueryHandler(IVeiculoRepository veiculoRepository) : IRequestHandler<GetAllVeiculosQuery, List<Veiculo>>
    {
        private readonly IVeiculoRepository _veiculoRepository = veiculoRepository;

        public async Task<List<Veiculo>> Handle(GetAllVeiculosQuery query, CancellationToken cancellationToken)
        {
            return await _veiculoRepository.GetAllAsync();
        }
    }
}
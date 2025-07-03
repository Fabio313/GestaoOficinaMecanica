using Domain.Entities;
using Domain.Interfaces.Repositories;

namespace Domain.Queries.GetVeiculoById
{
    public class GetVeiculoByIdQueryHandler(IVeiculoRepository veiculoRepository)
    {
        private readonly IVeiculoRepository _veiculoRepository = veiculoRepository;

        public async Task<Veiculo?> HandleAsync(GetVeiculoByIdQuery query)
        {
            return await _veiculoRepository.GetByIdAsync(query.Id);
        }
    }
}
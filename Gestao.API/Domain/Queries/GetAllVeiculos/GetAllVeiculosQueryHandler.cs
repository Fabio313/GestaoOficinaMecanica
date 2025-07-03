using Domain.Entities;
using Domain.Interfaces.Repositories;

namespace Domain.Queries.GetAllVeiculos
{
    public class GetAllVeiculosQueryHandler(IVeiculoRepository veiculoRepository)
    {
        private readonly IVeiculoRepository _veiculoRepository = veiculoRepository;

        public async Task<List<Veiculo>> HandleAsync(GetAllVeiculosQuery query)
        {
            return await _veiculoRepository.GetAllAsync();
        }
    }
}
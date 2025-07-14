using Domain.Entities;
using Domain.Interfaces.Repositories;
using MediatR;

namespace Domain.Queries.GetVeiculoById
{
    public class GetVeiculoByIdQueryHandler(IVeiculoRepository veiculoRepository) : IRequestHandler<GetVeiculoByIdQuery, Veiculo>
    {
        private readonly IVeiculoRepository _veiculoRepository = veiculoRepository;

        public async Task<Veiculo> Handle(GetVeiculoByIdQuery request, CancellationToken cancellationToken)
        {
            return await _veiculoRepository.GetByIdAsync(request.Id);
        }
    }
}
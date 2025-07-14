using Domain.Entities;
using Domain.Interfaces.Repositories;
using MediatR;

namespace Domain.Queries.GetAllCliente
{
    public class GetAllClientesQueryHandler(IClienteRepository clienteRepository) : IRequestHandler<GetAllClientesQuery, List<Cliente>>
    {
        private readonly IClienteRepository _clienteRepository = clienteRepository;

        public async Task<List<Cliente>> Handle(GetAllClientesQuery request, CancellationToken cancellationToken)
        {
            return await _clienteRepository.GetAllAsync();
        }
    }
}
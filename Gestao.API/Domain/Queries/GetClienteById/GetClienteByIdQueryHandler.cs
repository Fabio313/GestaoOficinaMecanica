using Domain.Entities;
using Domain.Interfaces.Repositories;

namespace Domain.Queries.GetClienteById
{
    public class GetClienteByIdQueryHandler(IClienteRepository clienteRepository)
    {
        private readonly IClienteRepository _clienteRepository = clienteRepository;

        public async Task<Cliente?> HandleAsync(GetClienteByIdQuery query)
        {
            return await _clienteRepository.GetByIdAsync(query.Id);
        }
    }
}
using Domain.Entities;
using Domain.Interfaces.Repositories;

namespace Domain.Queries.GetAllCliente
{
    public class GetAllClientesQueryHandler(IClienteRepository clienteRepository)
    {
        private readonly IClienteRepository _clienteRepository = clienteRepository;

        public async Task<List<Cliente>> HandleAsync(GetAllClientesQuery query)
        {
            return await _clienteRepository.GetAllAsync();
        }
    }
}
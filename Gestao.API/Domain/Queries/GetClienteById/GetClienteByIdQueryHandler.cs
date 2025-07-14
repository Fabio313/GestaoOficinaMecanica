using Domain.Entities;
using Domain.Interfaces.Repositories;
using MediatR;

namespace Domain.Queries.GetClienteById
{
    public class GetClienteByIdQueryHandler(IClienteRepository clienteRepository) : IRequestHandler<GetClienteByIdQuery, Cliente>
    {
        private readonly IClienteRepository _clienteRepository = clienteRepository;

        public async Task<Cliente> Handle(GetClienteByIdQuery request, CancellationToken cancellationToken)
        {
            return await _clienteRepository.GetByIdAsync(request.Id);
        }
    }
}
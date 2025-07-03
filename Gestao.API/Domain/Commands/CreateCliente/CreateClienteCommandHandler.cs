using Domain.Entities;
using Domain.Interfaces.Repositories;
using MediatR;

namespace Domain.Commands.CreateCliente
{
    public class CreateClienteCommandHandler(IClienteRepository clienteRepository) : IRequestHandler<CreateClienteCommand, CreateClienteCommandResponse>
    {
        private readonly IClienteRepository _clienteRepository = clienteRepository;

        public async Task<CreateClienteCommandResponse> Handle(CreateClienteCommand request, CancellationToken cancellationToken)
        {
            var cliente = new Cliente(
                id: Guid.NewGuid().ToString(),
                nome: request.Nome,
                telefone: request.Telefone
            );

            await _clienteRepository.CreateAsync(cliente);
            return new CreateClienteCommandResponse(cliente.Id, cliente.Nome, cliente.Telefone);
        }
    }
}

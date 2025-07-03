using Domain.Entities;
using Domain.Interfaces.Repositories;
using MediatR;

namespace Domain.Commands.UpdateCliente
{
    public class UpdateClienteCommandHandler(IClienteRepository clienteRepository) : IRequestHandler<UpdateClienteCommand, UpdateClienteCommandResponse>
    {
        private readonly IClienteRepository _clienteRepository = clienteRepository;

        public async Task<UpdateClienteCommandResponse> Handle(UpdateClienteCommand request, CancellationToken cancellationToken)
        {
            var cliente = new Cliente(
                id: request.Id,
                nome: request.Nome,
                telefone: request.Telefone
            );

            await _clienteRepository.UpdateAsync(request.Id, cliente);
            return new UpdateClienteCommandResponse(cliente.Id, cliente.Nome, cliente.Telefone);
        }
    }
}
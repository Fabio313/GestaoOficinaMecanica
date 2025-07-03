using Domain.Entities;
using Domain.Interfaces.Repositories;
using MediatR;

namespace Domain.Commands.CreateVeiculo
{
    public class CreateVeiculoCommandHandler(IVeiculoRepository veiculoRepository) : IRequestHandler<CreateVeiculoCommand, CreateVeiculoCommandResponse>
    {
        private readonly IVeiculoRepository _veiculoRepository = veiculoRepository;

        public async Task<CreateVeiculoCommandResponse> Handle(CreateVeiculoCommand request, CancellationToken cancellationToken)
        {
            var veiculo = new Veiculo(
                id: Guid.NewGuid().ToString(),
                clienteId: request.ClienteId,
                placa: request.Placa,
                modelo: request.Modelo,
                ano: request.Ano
            );

            await _veiculoRepository.CreateAsync(veiculo);
            return new CreateVeiculoCommandResponse(
                veiculo.Id, 
                veiculo.ClienteId, 
                veiculo.Placa,
                veiculo.Modelo, 
                veiculo.Ano
                );
        }
    }
}
using Domain.Entities;
using Domain.Interfaces.Repositories;
using MediatR;

namespace Domain.Commands.UpdateVeiculo
{
    public class UpdateVeiculoCommandHandler(IVeiculoRepository veiculoRepository) : IRequestHandler<UpdateVeiculoCommand, UpdateVeiculoCommandResponse>
    {
        private readonly IVeiculoRepository _veiculoRepository = veiculoRepository;

        public async Task<UpdateVeiculoCommandResponse> Handle(UpdateVeiculoCommand request, CancellationToken cancellationToken)
        {
            var veiculo = new Veiculo(
                id: request.Id,
                clienteId: request.ClienteId,
                placa: request.Placa,
                modelo: request.Modelo,
                ano: request.Ano
            );

            await _veiculoRepository.UpdateAsync(request.Id, veiculo);
            return new UpdateVeiculoCommandResponse(veiculo.Id, veiculo.ClienteId, veiculo.Placa, veiculo.Modelo, veiculo.Ano);
        }
    }
}
using MediatR;

namespace Domain.Commands.UpdateVeiculo
{
    public class UpdateVeiculoCommand(
        string id,
        string clienteId,
        string placa,
        string modelo,
        int ano
    ) : IRequest<UpdateVeiculoCommandResponse>
    {
        public string Id { get; } = id;
        public string ClienteId { get; } = clienteId;
        public string Placa { get; } = placa;
        public string Modelo { get; } = modelo;
        public int Ano { get; } = ano;
    }
}
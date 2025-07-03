using MediatR;

namespace Domain.Commands.CreateVeiculo
{
    public class CreateVeiculoCommand(
        string clienteId,
        string placa,
        string modelo,
        int ano
    ) : IRequest<CreateVeiculoCommandResponse>
    {
        public string ClienteId { get; } = clienteId;
        public string Placa { get; } = placa;
        public string Modelo { get; } = modelo;
        public int Ano { get; } = ano;
    }
}
namespace Domain.Commands.CreateVeiculo
{
    public class CreateVeiculoCommandResponse(
        string id,
        string clienteId,
        string placa,
        string modelo,
        int ano
    )
    {
        public string Id { get; set; } = id;
        public string ClienteId { get; set; } = clienteId;
        public string Placa { get; set; } = placa;
        public string Modelo { get; set; } = modelo;
        public int Ano { get; set; } = ano;
    }
}
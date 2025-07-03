namespace Domain.Commands.UpdateVeiculo
{
    public class UpdateVeiculoCommandResponse
    {
        public string Id { get; set; }
        public string ClienteId { get; set; }
        public string Placa { get; set; }
        public string Modelo { get; set; }
        public int Ano { get; set; }

        public UpdateVeiculoCommandResponse(string id, string clienteId, string placa, string modelo, int ano)
        {
            Id = id;
            ClienteId = clienteId;
            Placa = placa;
            Modelo = modelo;
            Ano = ano;
        }
    }
}
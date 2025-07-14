using MediatR;
using System.Text.Json.Serialization;

namespace Domain.Commands.UpdateVeiculo
{
    public class UpdateVeiculoCommand : IRequest<UpdateVeiculoCommandResponse>
    {
        [JsonIgnore]
        public string Id { get; set; }
        public string ClienteId { get; set; }
        public string Placa { get; set; }
        public string Modelo { get; set; }
        public int Ano { get; set; }
    }
}
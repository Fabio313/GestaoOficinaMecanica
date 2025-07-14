using MediatR;
using System.Text.Json.Serialization;

namespace Domain.Commands.UpdateCliente
{
    public class UpdateClienteCommand : IRequest<UpdateClienteCommandResponse>
    {
        [JsonIgnore]
        public string Id { get; set; }
        public string Nome { get; set; }
        public string Telefone { get; set; }
    }
}
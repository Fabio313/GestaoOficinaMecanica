using MediatR;

namespace Domain.Commands.UpdateCliente
{
    public class UpdateClienteCommand(
        string id,
        string nome,
        string telefone
    ) : IRequest<UpdateClienteCommandResponse>
    {
        public string Id { get; } = id;
        public string Nome { get; } = nome;
        public string Telefone { get; } = telefone;
    }
}
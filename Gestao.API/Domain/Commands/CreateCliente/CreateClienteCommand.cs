using MediatR;

namespace Domain.Commands.CreateCliente
{
    public class CreateClienteCommand(
        string nome,
        string telefone) : IRequest<CreateClienteCommandResponse>
    {
        public string Nome { get; } = nome;
        public string Telefone { get; } = telefone;
    }
}   

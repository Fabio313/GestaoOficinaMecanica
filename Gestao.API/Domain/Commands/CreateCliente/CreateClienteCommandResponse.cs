namespace Domain.Commands.CreateCliente
{
    public class CreateClienteCommandResponse(
        string id,
        string nome,
        string telefone)
    {
        public string Id { get; set; } = id;
        public string Nome { get; set; } = nome;
        public string Telefone { get; set; } = telefone;
    }
}

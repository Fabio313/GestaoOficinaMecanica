namespace Domain.Entities
{ 
    public class Cliente(
        string id,
        string nome,
        string telefone)
    {
        public string Id { get; set; } = id;
        public string Nome { get; set; } = nome;
        public string Telefone { get; set; } = telefone;
    }
}
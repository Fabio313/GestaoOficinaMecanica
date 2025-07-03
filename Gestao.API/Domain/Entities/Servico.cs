namespace Domain.Entities
{
    public class Servico(
        string nome,
        string descricao,
        decimal preco,
        int quantidade)
    {
        public string Nome { get; set; } = nome;
        public string Descricao { get; set; } = descricao;
        public decimal Preco { get; set; } = preco;
        public int Quantidade { get; set; } = quantidade;
    }
}

using Domain.Enum;
using Domain.Entities;

namespace Domain.Commands.UpdateOrdemDeServico
{
    public class UpdateOrdemDeServicoCommandResponse(
        string id,
        string clienteId,
        string veiculoId,
        string descricaoProblema,
        IEnumerable<Servico> servicos,
        OSStatusEnum status,
        decimal valorTotal,
        decimal valorPago,
        DateTime dataAbertura,
        DateTime? dataFechamento
    )
    {
        public string Id { get; set; } = id;
        public string ClienteId { get; set; } = clienteId;
        public string VeiculoId { get; set; } = veiculoId;
        public string DescricaoProblema { get; set; } = descricaoProblema;
        public IEnumerable<Servico> Servicos { get; set; } = servicos;
        public OSStatusEnum Status { get; set; } = status;
        public decimal ValorTotal { get; set; } = valorTotal;
        public decimal ValorPago { get; set; } = valorPago;
        public DateTime DataAbertura { get; set; } = dataAbertura;
        public DateTime? DataFechamento { get; set; } = dataFechamento;
    }
}
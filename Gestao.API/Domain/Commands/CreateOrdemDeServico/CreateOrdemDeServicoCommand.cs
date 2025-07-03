using MediatR;
using Domain.Enum;
using Domain.Entities;

namespace Domain.Commands.CreateOrdemDeServico
{
    public class CreateOrdemDeServicoCommand(
        string clienteId,
        string veiculoId,
        string descricaoProblema,
        IEnumerable<Servico> servicos,
        OSStatusEnum status,
        decimal valorTotal,
        decimal valorPago,
        DateTime dataAbertura,
        DateTime? dataFechamento
    ) : IRequest<CreateOrdemDeServicoCommandResponse>
    {
        public string ClienteId { get; } = clienteId;
        public string VeiculoId { get; } = veiculoId;
        public string DescricaoProblema { get; } = descricaoProblema;
        public IEnumerable<Servico> Servicos { get; } = servicos;
        public OSStatusEnum Status { get; } = status;
        public decimal ValorTotal { get; } = valorTotal;
        public decimal ValorPago { get; } = valorPago;
        public DateTime DataAbertura { get; } = dataAbertura;
        public DateTime? DataFechamento { get; } = dataFechamento;
    }
}
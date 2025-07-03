using MediatR;
using Domain.Enum;
using Domain.Entities;
using System;

namespace Domain.Commands.UpdateOrdemDeServico
{
    public class UpdateOrdemDeServicoCommand(
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
    ) : IRequest<UpdateOrdemDeServicoCommandResponse>
    {
        public string Id { get; } = id;
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
using MediatR;
using Domain.Enum;
using Domain.Entities;
using System.Text.Json.Serialization;

namespace Domain.Commands.UpdateOrdemDeServico
{
    public class UpdateOrdemDeServicoCommand : IRequest<UpdateOrdemDeServicoCommandResponse>
    {
        [JsonIgnore]
        public string Id { get;  set; }
        public string ClienteId { get; set; }
        public string VeiculoId { get; set; }
        public string DescricaoProblema { get; set; }
        public IEnumerable<Servico> Servicos { get; set; }
        public OSStatusEnum Status { get; set; }
        public decimal ValorTotal { get; set; }
        public decimal ValorPago { get; set; }
        public DateTime DataAbertura { get; set; }
        public DateTime? DataFechamento { get; set; }
    }
}
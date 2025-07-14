using Domain.Entities;
using MediatR;

namespace Domain.Queries.GetOrdemDeServicoById
{
    public class GetOrdemDeServicoByIdQuery(string id) : IRequest<OrdemDeServico>
    {
        public string Id { get; } = id;
    }
}
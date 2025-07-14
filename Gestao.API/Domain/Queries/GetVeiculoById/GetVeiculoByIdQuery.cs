using Domain.Entities;
using MediatR;

namespace Domain.Queries.GetVeiculoById
{
    public class GetVeiculoByIdQuery(string id) : IRequest<Veiculo>
    {
        public string Id { get; } = id;
    }
}
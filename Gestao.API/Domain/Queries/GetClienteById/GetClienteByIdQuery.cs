using Domain.Entities;
using MediatR;

namespace Domain.Queries.GetClienteById
{
    public class GetClienteByIdQuery(string id) : IRequest<Cliente>
    {
        public string Id { get; } = id;
    }
}
using Domain.Entities;
using MediatR;

namespace Domain.Queries.GetAllCliente
{
    public class GetAllClientesQuery : IRequest<List<Cliente>> { }
}
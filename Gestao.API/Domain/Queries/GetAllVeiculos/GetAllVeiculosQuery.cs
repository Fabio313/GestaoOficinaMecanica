using Domain.Entities;
using MediatR;

namespace Domain.Queries.GetAllVeiculos
{
    public class GetAllVeiculosQuery : IRequest<List<Veiculo>> { }
}
using Domain.Entities;
using MediatR;

namespace Domain.Queries.GetAllOrdemDeServico
{
    public class GetAllOrdensDeServicoQuery : IRequest<List<OrdemDeServico>> { }
}
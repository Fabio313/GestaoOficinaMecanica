namespace Domain.Queries.GetOrdemDeServicoById
{
    public class GetOrdemDeServicoByIdQuery(string id)
    {
        public string Id { get; } = id;
    }
}
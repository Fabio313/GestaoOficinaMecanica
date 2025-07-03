namespace Domain.Queries.GetClienteById
{
    public class GetClienteByIdQuery(string id)
    {
        public string Id { get; } = id;
    }
}
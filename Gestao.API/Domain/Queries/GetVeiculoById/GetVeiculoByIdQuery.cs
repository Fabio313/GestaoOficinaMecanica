namespace Domain.Queries.GetVeiculoById
{
    public class GetVeiculoByIdQuery(string id)
    {
        public string Id { get; } = id;
    }
}
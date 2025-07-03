using Domain.Entities;
using Domain.Interfaces.Repositories;
using MongoDB.Driver;

namespace Infraestructure.Repositories
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly IMongoCollection<Cliente> _clientes;

        public ClienteRepository(string connectionString, string databaseName, string collectionName)
        {
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(databaseName);
            _clientes = database.GetCollection<Cliente>(collectionName);
        }

        public async Task<List<Cliente>> GetAllAsync()
        {
            return await _clientes.Find(_ => true).ToListAsync();
        }

        public async Task<Cliente?> GetByIdAsync(string id)
        {
            return await _clientes.Find(c => c.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(Cliente cliente)
        {
            await _clientes.InsertOneAsync(cliente);
        }

        public async Task UpdateAsync(string id, Cliente cliente)
        {
            await _clientes.ReplaceOneAsync(c => c.Id == id, cliente);
        }

        public async Task DeleteAsync(string id)
        {
            await _clientes.DeleteOneAsync(c => c.Id == id);
        }
    }
}
using Domain.Entities;
using Domain.Interfaces.Repositories;
using MongoDB.Driver;

namespace Infraestructure.Repositories
{
    public class OrdemDeServicoRepository : IOrdemDeServicoRepository
    {
        private readonly IMongoCollection<OrdemDeServico> _ordens;

        public OrdemDeServicoRepository(string connectionString, string databaseName, string collectionName)
        {
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(databaseName);
            _ordens = database.GetCollection<OrdemDeServico>(collectionName);
        }

        public async Task<List<OrdemDeServico>> GetAllAsync()
        {
            return await _ordens.Find(_ => true).ToListAsync();
        }

        public async Task<OrdemDeServico> GetByIdAsync(string id)
        {
            return await _ordens.Find(o => o.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<OrdemDeServico>> GetByClienteIdAsync(string clienteId)
        {
            return await _ordens.Find(o => o.ClienteId == clienteId).ToListAsync();
        }

        public async Task<List<OrdemDeServico>> GetByVeiculoIdAsync(string veiculoId)
        {
            return await _ordens.Find(o => o.VeiculoId == veiculoId).ToListAsync();
        }

        public async Task CreateAsync(OrdemDeServico ordem)
        {
            await _ordens.InsertOneAsync(ordem);
        }

        public async Task UpdateAsync(string id, OrdemDeServico ordem)
        {
            await _ordens.ReplaceOneAsync(o => o.Id == id, ordem);
        }

        public async Task DeleteAsync(string id)
        {
            await _ordens.DeleteOneAsync(o => o.Id == id);
        }
    }
}
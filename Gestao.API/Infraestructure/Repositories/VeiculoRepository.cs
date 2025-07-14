using Domain.Entities;
using Domain.Interfaces.Repositories;
using MongoDB.Driver;

namespace Infraestructure.Repositories
{
    public class VeiculoRepository : IVeiculoRepository
    {
        private readonly IMongoCollection<Veiculo> _veiculos;

        public VeiculoRepository(string connectionString, string databaseName, string collectionName)
        {
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(databaseName);
            _veiculos = database.GetCollection<Veiculo>(collectionName);
        }

        public async Task<List<Veiculo>> GetAllAsync()
        {
            return await _veiculos.Find(_ => true).ToListAsync();
        }

        public async Task<Veiculo> GetByIdAsync(string id)
        {
            return await _veiculos.Find(v => v.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Veiculo> GetByPlacaAsync(string placa)
        {
            return await _veiculos.Find(v => v.Placa == placa).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(Veiculo veiculo)
        {
            await _veiculos.InsertOneAsync(veiculo);
        }

        public async Task UpdateAsync(string id, Veiculo veiculo)
        {
            await _veiculos.ReplaceOneAsync(v => v.Id == id, veiculo);
        }

        public async Task DeleteAsync(string id)
        {
            await _veiculos.DeleteOneAsync(v => v.Id == id);
        }
    }
}
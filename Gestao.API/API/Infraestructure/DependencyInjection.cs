using Domain.Interfaces.Repositories;
using Infraestructure.Repositories;
using System.Reflection;

namespace API.Infraestructure
{
    public class DependencyInjection
    {
        private static readonly string _clienteCollection = "clientes";
        private static readonly string _veiculoCollection = "veiculos";
        private static readonly string _OSCollection = "ordensServico";

        public static void Inject(WebApplicationBuilder builder)
        {
            InjectRepositories(builder);
            InjectMediatR(builder);
        }

        public static void InjectRepositories(WebApplicationBuilder builder)
        {
            var mongoConnectionString = builder.Configuration.GetConnectionString("MongoDb");
            var mongoDatabaseName = builder.Configuration["DatabaseName"];

            builder.Services.AddSingleton<IClienteRepository>(
                _ => new ClienteRepository(mongoConnectionString, mongoDatabaseName, _clienteCollection));
            builder.Services.AddSingleton<IVeiculoRepository>(
                _ => new VeiculoRepository(mongoConnectionString, mongoDatabaseName, _veiculoCollection));
            builder.Services.AddSingleton<IOrdemDeServicoRepository>(
                _ => new OrdemDeServicoRepository(mongoConnectionString, mongoDatabaseName, _OSCollection));
        }

        public static void InjectMediatR(WebApplicationBuilder builder)
        {
            builder.Services.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssembly(typeof(Domain.Commands.CreateCliente.CreateClienteCommand).Assembly);
            });
        }
    }
}

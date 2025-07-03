using Domain.Interfaces.Repositories;
using Infraestructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Configura��es de conex�o (pode vir de appsettings.json)
var mongoConnectionString = builder.Configuration.GetConnectionString("MongoDb");
var mongoDatabaseName = builder.Configuration["MongoDbDatabase"];
var clienteCollection = "clientes";
var veiculoCollection = "veiculos";
var ordemCollection = "ordensDeServico";

// Registro dos reposit�rios
builder.Services.AddSingleton<IClientRepository>(
    _ => new ClienteRepository(mongoConnectionString, mongoDatabaseName, clienteCollection));
builder.Services.AddSingleton<IVeiculoRepository>(
    _ => new VeiculoRepository(mongoConnectionString, mongoDatabaseName, veiculoCollection));
builder.Services.AddSingleton<IOrdemDeServicoRepository>(
    _ => new OrdemDeServicoRepository(mongoConnectionString, mongoDatabaseName, ordemCollection));

// Outros servi�os padr�o
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
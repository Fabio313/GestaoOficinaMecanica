using Domain.Entities;
using Domain.Interfaces.Repositories;
using MediatR;

namespace Domain.Commands.CreateOrdemDeServico
{
    public class CreateOrdemDeServicoCommandHandler(IOrdemDeServicoRepository ordemRepository) : IRequestHandler<CreateOrdemDeServicoCommand, CreateOrdemDeServicoCommandResponse>
    {
        private readonly IOrdemDeServicoRepository _ordemRepository = ordemRepository;

        public async Task<CreateOrdemDeServicoCommandResponse> Handle(CreateOrdemDeServicoCommand request, CancellationToken cancellationToken)
        {
            var ordem = new OrdemDeServico(
                id: Guid.NewGuid().ToString(),
                clienteId: request.ClienteId,
                veiculoId: request.VeiculoId,
                descricaoProblema: request.DescricaoProblema,
                servicos: request.Servicos,
                status: request.Status,
                valorTotal: request.ValorTotal,
                valorPago: request.ValorPago,
                dataAbertura: request.DataAbertura,
                dataFechamento: request.DataFechamento
            );

            await _ordemRepository.CreateAsync(ordem);
            return new CreateOrdemDeServicoCommandResponse(
                ordem.Id,
                ordem.ClienteId,
                ordem.VeiculoId,
                ordem.DescricaoProblema,
                ordem.Servicos,
                ordem.Status,
                ordem.ValorTotal,
                ordem.ValorPago,
                ordem.DataAbertura,
                ordem.DataFechamento
            );
        }
    }
}
using Domain.Entities;
using Domain.Interfaces.Repositories;
using MediatR;

namespace Domain.Commands.UpdateOrdemDeServico
{
    public class UpdateOrdemDeServicoCommandHandler(IOrdemDeServicoRepository ordemRepository) : IRequestHandler<UpdateOrdemDeServicoCommand, UpdateOrdemDeServicoCommandResponse>
    {
        private readonly IOrdemDeServicoRepository _ordemRepository = ordemRepository;

        public async Task<UpdateOrdemDeServicoCommandResponse> Handle(UpdateOrdemDeServicoCommand request, CancellationToken cancellationToken)
        {
            var ordem = new OrdemDeServico(
                id: request.Id,
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

            await _ordemRepository.UpdateAsync(request.Id, ordem);
            return new UpdateOrdemDeServicoCommandResponse(
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
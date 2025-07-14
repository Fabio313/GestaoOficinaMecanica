using Domain.Commands.CreateOrdemDeServico;
using Domain.Commands.UpdateOrdemDeServico;
using Domain.Queries.GetAllOrdemDeServico;
using Domain.Queries.GetOrdemDeServicoById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/ordensdeservico")]
    public class OrdemDeServicoController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        public async Task<ActionResult<CreateOrdemDeServicoCommandResponse>> Create([FromBody] CreateOrdemDeServicoCommand command)
        {
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UpdateOrdemDeServicoCommandResponse>> Update(string id, [FromBody] UpdateOrdemDeServicoCommand command)
        {
            command.Id = id;

            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var result = await _mediator.Send(new GetAllOrdensDeServicoQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(string id)
        {
            var result = await _mediator.Send(new GetOrdemDeServicoByIdQuery(id));
            if (result == null)
                return NotFound();
            return Ok(result);
        }
    }
}
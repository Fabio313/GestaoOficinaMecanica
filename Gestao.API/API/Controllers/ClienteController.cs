using Domain.Commands.CreateCliente;
using Domain.Commands.UpdateCliente;
using Domain.Queries.GetAllCliente;
using Domain.Queries.GetClienteById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/clientes")]
    public class ClienteController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        public async Task<ActionResult<CreateClienteCommandResponse>> Create([FromBody] CreateClienteCommand command)
        {
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UpdateClienteCommandResponse>> Update(string id, [FromBody] UpdateClienteCommand command)
        {
            if (id != command.Id)
                return BadRequest("Id mismatch.");

            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var result = await _mediator.Send(new GetAllClientesQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(string id)
        {
            var result = await _mediator.Send(new GetClienteByIdQuery(id));
            if (result == null)
                return NotFound();
            return Ok(result);
        }
    }
}
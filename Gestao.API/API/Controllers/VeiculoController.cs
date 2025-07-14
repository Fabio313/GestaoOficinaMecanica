using Domain.Commands.CreateVeiculo;
using Domain.Commands.UpdateVeiculo;
using Domain.Queries.GetAllVeiculos;
using Domain.Queries.GetVeiculoById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/veiculos")]
    public class VeiculoController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        public async Task<ActionResult<CreateVeiculoCommandResponse>> Create([FromBody] CreateVeiculoCommand command)
        {
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UpdateVeiculoCommandResponse>> Update(string id, [FromBody] UpdateVeiculoCommand command)
        {
            command.Id = id;

            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var result = await _mediator.Send(new GetAllVeiculosQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(string id)
        {
            var result = await _mediator.Send(new GetVeiculoByIdQuery(id));
            if (result == null)
                return NotFound();
            return Ok(result);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetcore.Services;
using dotnetcore.Models;
using dotnetcore.Exceptions;
using dotnetcore.Models.Commands;
using System.Net;

namespace dotnetcore.Controllers
{
    [Route("api/[controller]")]
    public sealed class HeroesController : Controller
    {
        private readonly IHeroService _heroService;

        public HeroesController(IHeroService heroService)
        {
            _heroService = heroService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _heroService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                return Ok(await _heroService.GetOne(id));
            }
            catch (ArgumentNullException)
            {
                return BadRequest();
            }
            catch (DocumentNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet("search/{name}")]
        public async Task<IActionResult> Search(string name)
        {
            try
            {
                return Ok(await _heroService.SearchByName(name));
            }
            catch (ArgumentNullException)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CreateHeroCommand command)
        {
            try
            {
                Hero hero = await _heroService.Create(command);
                return CreatedAtAction(nameof(Get), new { id = hero.Id }, hero);
            }
            catch (Exception exception) when (exception is ArgumentException || exception is FailedValidationException)
            {
                return BadRequest();
            }
            catch (DuplicateDocumentException)
            {
                return StatusCode((int)HttpStatusCode.Conflict);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody]ChangeHeroNameCommand command)
        {
            try
            {
                await _heroService.ChangeName(id, command);
                return Ok();
            }
            catch (Exception exception) when (exception is ArgumentException || exception is FailedValidationException || exception is InvalidOperationException)
            {
                return BadRequest();
            }
            catch (DocumentNotFoundException)
            {
                return NotFound();
            }
            catch (DuplicateDocumentException)
            {
                return StatusCode((int)HttpStatusCode.Conflict);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                await _heroService.Delete(id);
                return Ok();
            }
            catch (ArgumentNullException)
            {
                return BadRequest();
            }
            catch (DocumentNotFoundException)
            {
                return NotFound();
            }
        }
    }
}

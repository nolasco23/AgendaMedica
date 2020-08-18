using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AgendaMedica.Models;

namespace AgendaMedica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ConsultasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Consultas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Consulta>>> GetConsultas()
        {
            return await _context.Consultas.ToListAsync();
        }

        // GET: api/Consultas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Consulta>> GetConsulta(int id)
        {
            var consulta = await _context.Consultas.FindAsync(id);

            if (consulta == null)
            {
                return NotFound();
            }

            return consulta;
        }

        // PUT: api/Consultas/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<ActionResult<Consulta>> PutConsulta(int id, Consulta consulta)
        {
            if (id != consulta.id)
            {
                return BadRequest();
            }

            _context.Entry(consulta).State = EntityState.Modified;

            try
            {
                IQueryable<Consulta> listaConsultas = from objeto in _context.Consultas select objeto;

                var obj = await listaConsultas
                        .Where(data => (
                            (data.DataInicio <= consulta.DataInicio && data.HoraInicio <= consulta.HoraInicio) &&
                            (data.DataFim >= consulta.DataFim && data.HoraFim >= consulta.HoraFim)
                         ||
                            (
                                data.DataInicio <= consulta.DataFim && data.HoraInicio <= consulta.HoraFim &&
                                data.DataFim >= consulta.DataFim && data.HoraFim >= consulta.HoraFim
                            )
                        )).FirstOrDefaultAsync();
                if (obj == null)
                {
                    await _context.SaveChangesAsync();
                    return null;
                }
                else
                {
                    return (obj);
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConsultaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // return NoContent();
        }

        // POST: api/Consultas
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Consulta>> PostConsulta(Consulta consulta)
        {
            IQueryable<Consulta> listaConsultas = from objeto in _context.Consultas select objeto;

            var obj = await listaConsultas
                    .Where(data => (

                        (data.DataInicio <= consulta.DataInicio && data.HoraInicio <= consulta.HoraInicio) &&
                        (data.DataFim >= consulta.DataFim && data.HoraFim >= consulta.HoraFim)

                     ||
                        (
                            data.DataInicio <= consulta.DataFim && data.HoraInicio <= consulta.HoraFim &&
                            data.DataFim >= consulta.DataFim && data.HoraFim >= consulta.HoraFim
                        )

                    )).FirstOrDefaultAsync();
            if (obj == null)
            {
                _context.Consultas.Add(consulta);
                await _context.SaveChangesAsync();
                CreatedAtAction("GetConsulta", new { id = consulta.id }, consulta);
                return null;
            }
            else
            {
                return (obj);
            }

        }

        // DELETE: api/Consultas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Consulta>> DeleteConsulta(int id)
        {
            var consulta = await _context.Consultas.FindAsync(id);
            if (consulta == null)
            {
                return NotFound();
            }

            _context.Consultas.Remove(consulta);
            await _context.SaveChangesAsync();

            return consulta;
        }

        private bool ConsultaExists(int id)
        {
            return _context.Consultas.Any(e => e.id == id);
        }
    }
}

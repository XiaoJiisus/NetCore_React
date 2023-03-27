using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FirstReact.Models;

namespace FirstReact.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TareaController : ControllerBase
{
    private readonly ReactProjectsContext _context;

    private readonly ILogger<TareaController > _logger;

    public TareaController(ILogger<TareaController> logger, ReactProjectsContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    [Route("Lista")]
    public async Task<IActionResult> Lista()
    {
        try
        {
            var lst = await _context.Tareas.OrderByDescending(x => x.IdTarea).ThenBy(t => t.FechaRegistro).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lst);
        }
        catch
        {
            return StatusCode(StatusCodes.Status400BadRequest, "Error");
        }
    }

    [HttpPost]
    [Route("Guardar")]
    public async Task<IActionResult> Guardar([FromBody]Tarea request)
    {
        try
        {
            await _context.Tareas.AddAsync(request);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Ok");
        }
        catch
        {
            return StatusCode(StatusCodes.Status400BadRequest, "Error");
        }
    }

    [HttpDelete]
    [Route("Cerrar/{id:int}")]
    public async Task<IActionResult> Cerrar(int id)
    {
        try
        {
            var taskToDel = await _context.Tareas.Where(x => x.IdTarea == id).FirstOrDefaultAsync();
            _context.Tareas.Remove(taskToDel);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Ok");
        }
        catch
        {
            return StatusCode(StatusCodes.Status400BadRequest, "Error");
        }
    }
}

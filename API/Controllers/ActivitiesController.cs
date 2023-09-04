using Microsoft.AspNetCore.Mvc;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
public class ActivitiesController : BaseAPIController
{
    private readonly ApplicationDataContext _context;

    public ActivitiesController(ApplicationDataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await _context.Activities.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        return await _context.Activities.FindAsync(id);
    }
}

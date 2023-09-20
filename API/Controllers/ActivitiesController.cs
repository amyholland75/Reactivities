using Microsoft.AspNetCore.Mvc;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;

namespace API.Controllers;
public class ActivitiesController : BaseAPIController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        Console.WriteLine("In controller getting list");
        return await Mediator.Send(new List.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        Console.WriteLine(id.ToString());
        return await Mediator.Send(new Details.Query{Id = id}); //curly bracket here are object inialiser
    }

    [HttpPost] //this is a post endpoint
    public async Task<IActionResult> CreateActivity(Activity activity)
    {
        await Mediator.Send(new Create.Command {Activity = activity}); //What if this fails???
        return Ok(); //OK is 200 ok
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditActivity(Guid id, Activity activity)
    {
        activity.Id = id;
        await Mediator.Send(new Edit.Command {Activity = activity}); 
        return Ok(); //OK is 200 ok
    }

    [HttpDelete("{id}")] //id is a route parameter
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
        await Mediator.Send(new Delete.Command {Id = id}); 
        return Ok(); //OK is 200 ok
    }          
}

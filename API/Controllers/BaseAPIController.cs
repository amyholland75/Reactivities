using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers; //file scoped namespace

[ApiController]
[Route("api/[controller]")]

//this allows contorllers to be as thin as possible
public class BaseAPIController : ControllerBase
{
    private IMediator _mediator;

    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
    //expression bodied property with a lamda expresion
    //??= is a null coalessing assigment operator, checkes if _mediator and only if will run the right hand code

    

        
}
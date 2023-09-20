using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
         public class Command : IRequest
        { 
            public Activity Activity { get; set; }

        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly ApplicationDataContext _context;
            private readonly IMapper _mapper;

            public Handler(ApplicationDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                //activity.Title = request.Activity.Title ?? activity.Title; //null coalessing - how does this work if not allowing null?
                //Use auto mapper instead
                _mapper.Map(request.Activity, activity);

                await _context.SaveChangesAsync(); //will save changes to database
            }
        }       
    }
}
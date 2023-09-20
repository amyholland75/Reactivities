using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore.Update.Internal;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        //Commands do not return data
        public class Command : IRequest
        { 
            public Activity Activity { get; set; }

        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly ApplicationDataContext _context;

            public Handler(ApplicationDataContext context)
            {
                _context = context;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                await _context.SaveChangesAsync();
            }
        }
    }
}
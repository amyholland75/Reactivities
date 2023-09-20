using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>> 
        {

        }

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly ApplicationDataContext _context;
            private readonly ILogger<List> _logger;

            //TODO what is the logger for how do we use it?
            public Handler(ApplicationDataContext context, ILogger<List> logger)
            {
                _context = context;
                _logger = logger;
            }


            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync();
            }
        }

    }
}
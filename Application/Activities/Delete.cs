using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        { 
            public Guid Id { get; set; }
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
                var activity = await _context.Activities.FindAsync(request.Id);

                //Happy path, will add validation and errors later on

                 _context.Remove(activity); //will save changes to database

                await _context.SaveChangesAsync();
            }
        }             
        
    }
}
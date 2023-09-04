using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class ApplicationDataContext : DbContext
    {
        public ApplicationDataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; } //table name will be Activities

    }
}
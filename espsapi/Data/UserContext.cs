using espsapi.Models;
using Microsoft.EntityFrameworkCore;

namespace espsapi.Data
{
    public class UserContext : DbContext

    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<UserDetails> UserDetails { get; set; }
        public DbSet<Stage> Stages { get; set; }

        public DbSet<Demande> Demandes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => { entity.HasIndex(e => e.Email).IsUnique(); });

             modelBuilder.Entity<User>()
        .HasOne(u => u.UserDetails)
        .WithOne(d => d.User)
        .HasForeignKey<UserDetails>(d => d.UserId)
        .IsRequired(false); // Make sure the relationship is optional

    modelBuilder.Entity<UserDetails>()
        .HasOne(d => d.User)
        .WithOne(u => u.UserDetails)
        .HasForeignKey<UserDetails>(d => d.UserId)
        .IsRequired(false); // Make sure the relationship is optional

        }
    }

    
}

using Microsoft.EntityFrameworkCore;

namespace AgendaMedica.Models
{
   public class AppDbContext : DbContext {
        public AppDbContext (DbContextOptions<AppDbContext> options) : base (options) { }

        public DbSet<Consulta> Consultas { get; set; }
        public DbSet<Paciente> Pacientes { get; set; }
        public object Consulta { get; internal set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AgendaMedica.Models;

    public class PacienteDbController : DbContext
    {
        public PacienteDbController (DbContextOptions<PacienteDbController> options)
            : base(options)
        {
        }

        public DbSet<AgendaMedica.Models.Paciente> Paciente { get; set; }
    }

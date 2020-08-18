using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AgendaMedica.Models;

    public class ConsultaDbController : DbContext
    {
        public ConsultaDbController (DbContextOptions<ConsultaDbController> options)
            : base(options)
        {
        }

        public DbSet<AgendaMedica.Models.Consulta> Consulta { get; set; }
    }

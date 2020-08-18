using System; 
// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;

namespace AgendaMedica.Models
{
    public class Paciente {
        public int id { get; set; }
        public string nome { get; set; } 
        public DateTime nascimento { get; set; }
    }
}
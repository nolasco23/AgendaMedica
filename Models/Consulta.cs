using System;
namespace AgendaMedica.Models
{
    public class Consulta
    {
        public int id { get; set; }
        public int IdPaciente { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public DateTime HoraInicio { get; set; }
        public DateTime HoraFim { get; set; }
        public String Observacoes { get; set; }
    }
}
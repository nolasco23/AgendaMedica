using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AgendaMedica.Migrations
{
    public partial class AgendaMigrations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Consultas",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdPaciente = table.Column<int>(nullable: false),
                    DataInicio = table.Column<DateTime>(nullable: false),
                    DataFim = table.Column<DateTime>(nullable: false),
                    HoraInicio = table.Column<DateTime>(nullable: false),
                    HoraFim = table.Column<DateTime>(nullable: false),
                    Observacoes = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Consultas", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Pacientes",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nome = table.Column<string>(nullable: true),
                    nascimento = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pacientes", x => x.id);
                });

            migrationBuilder.Sql ("INSERT INTO Pacientes (nome, nascimento) VALUES ('Renato Nolasco','1992/09/23')");
            migrationBuilder.Sql ("INSERT INTO Pacientes (nome, nascimento) VALUES ('Edgar Santos','1942/09/13')");
            migrationBuilder.Sql ("INSERT INTO Pacientes (nome, nascimento) VALUES ('Ilton Costa','1962/09/03')");
            migrationBuilder.Sql ("INSERT INTO Pacientes (nome, nascimento) VALUES ('Karina Silva','1992/09/23')");
            migrationBuilder.Sql ("INSERT INTO Pacientes (nome, nascimento) VALUES ('Jeferson Rocha','1942/09/13')");
            migrationBuilder.Sql ("INSERT INTO Pacientes (nome, nascimento) VALUES ('Clayton Gomes','1962/09/03')");

            migrationBuilder.Sql ("INSERT INTO Consultas (IdPaciente,DataInicio,DataFim,HoraInicio,HoraFim,Observacoes) VALUES ( '1', '2020-08-12', '2020-08-28',  '21:59', '23:59', 'Tstes')");
            migrationBuilder.Sql ("INSERT INTO Consultas (IdPaciente,DataInicio,DataFim,HoraInicio,HoraFim,Observacoes) VALUES ('2','2020-08-12','2020-08-28','21:59','23:59', 'Ittix')");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Consultas");

            migrationBuilder.DropTable(
                name: "Pacientes");
        }
    }
}

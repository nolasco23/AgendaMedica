# Agenda Médica

<p align="center">
  <img alt="" src="http://www.itixti.com.br/images/logo-dark@2x.png" /></p>

Criar uma aplicação que simule uma agenda de compromissos de um consultório médico. Onde o(a) atendente poderá incluir, buscar, alterar e excluir os registros.

## Requisitos Funcionais
* O sistema deve apresentar os seguintes campos: Nome do paciente, Data de nascimento, Data e hora inicial da consulta, Data e hora final da consulta, e um campo de Observações.
* O sistema não deve permitir o agendamento de duas ou mais consultas no mesmo range de datas.
* A data final não pode ser menor que a data inicial.

## Requisitos Técnicos
* Linguagem C#.
* Banco de dados MS SQL Server.
* Criar testes unitários para a solução.
* Desenvolver a interface gráfica utilizando o framework Angular.

## Diferencial
* Utilizar o .NET Core

## Instalação
* dotnet restore
* dotnet build
* dotnet ef database update --context AppDbContext 
* dotnet run

## Configuração DB linux e Windows
* Windows: "ConnectionStrings": {
      "AgendeCompromissoDB": "Server=DESKTOP-ES91M7V;Initial Catalog=AgendeCompromissoDB;Trusted_Connection=True;MultipleActiveResultSets=true"
      
* Linux: "AgendeCompromissoDB":"Server=localhost;Database=AgendaCompromisso;MultipleActiveResultSets=true;User id=SA;Password=Minerva17;"
 }

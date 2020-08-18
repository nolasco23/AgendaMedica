export interface IConsulta {
    id: number;
    idPaciente: number;
    dataInicio: Date;
    dataFim: Date;
    horaInicio: Date;
    horaFim: Date;
    observacoes: string;
}

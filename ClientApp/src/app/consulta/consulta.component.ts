import { Component, OnInit } from '@angular/core';
import { IConsulta } from './consulta/consulta';
import { ConsultaService } from './consulta.service';
import { IPaciente } from '../paciente/paciente/paciente';

@Component({
    selector: 'app-consulta',
    templateUrl: './consulta.component.html',
    styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
    pacientes: any;
    consultas: IConsulta[];
    constructor(private consultaService: ConsultaService) { }

    ngOnInit() {
        this.consultaService.getPacientes().subscribe(pacientes =>
            this.pacientes = pacientes);
        this.carregaDados();
    }

    delete(consulta: IConsulta) {
        this.consultaService.deleteConsulta(consulta.id.toString())
            .subscribe(consulta => this.carregaDados()),
            error => console.error(error);
    }

    carregaDados() {
        this.consultaService.getConsultas()
            .subscribe(consultaWebAPI => this.consultas = consultaWebAPI),
            error => console.error(error);
    }

    getPacientNameById(id: number) {
        return this.pacientes.find(c => c.id === id).nome;
    }

}

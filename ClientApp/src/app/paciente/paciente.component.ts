import { Component, OnInit } from '@angular/core';
import { IPaciente } from './paciente/paciente';
import { PacienteService } from './paciente.service';


@Component({
	selector: 'app-paciente',
	templateUrl: './paciente.component.html',
	styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {


	pacientes: IPaciente[];
	constructor(private pacienteService: PacienteService) { }

	ngOnInit() {
		this.carregaDados();
	}

	delete(paciente: IPaciente) {
		this.pacienteService.deletePaciente(paciente.id.toString())
			.subscribe(paciente => this.carregaDados()),
			error => console.error(error);
	}

	carregaDados() {
		this.pacienteService.getPacientes()
			.subscribe(pacienteWebAPI => this.pacientes = pacienteWebAPI),
			error => console.error(error);
	}


}

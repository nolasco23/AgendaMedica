import { OnInit, Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ConsultaService } from "../consulta.service";
import { IConsulta } from "../consulta/consulta";
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteService } from "../../paciente/paciente.service";
import { IPaciente } from "src/app/paciente/paciente/paciente";


@Component({
	selector: 'app-consulta-form',
	templateUrl: './consulta-form.component.html',
	styleUrls: ['./consulta-form.component.css']
})
export class ConsultaFormComponent implements OnInit {


	pacientes: any[];
	paciente: number;
	formGroup: FormGroup;
	modoEdicao: boolean = false;
	consultaId: number;
	consultas: IConsulta[];

	constructor(private fb: FormBuilder, private consultaService: ConsultaService, private router: Router, private activateRoute: ActivatedRoute, private pacienteService: PacienteService) { }

	ngOnInit() {
		this.formGroup = this.fb.group({
			IdPaciente: '',
			DataInicio: '',
			DataFim: '',
			HoraInicio: '',
			HoraFim: '',
			Observacoes: ''
		});
		this.activateRoute.params.subscribe(params => {
			if (params["id"] == undefined) {
				return;
			}
			this.modoEdicao = true;
			this.consultaId = params["id"];
			this.consultaService.getConsulta(this.consultaId.toString())
				.subscribe(async consultas => await this.carregaFormulario(consultas)),
				error => console.error(error);
		});

		this.consultaService.getPacientes().subscribe(pacientes =>
			this.pacientes = pacientes);
	}
	async carregaFormulario(consulta: IConsulta) {
		debugger
		let patient = await this.pacienteService.getPaciente(consulta.idPaciente);
		this.formGroup.patchValue({
			IdPaciente: patient.id,
			DataFim: new Date(consulta.dataFim).toISOString().slice(0, 10),
			DataInicio: new Date(consulta.dataInicio).toISOString().slice(0, 10),
			HoraFim: new Date(consulta.horaFim).toISOString().slice(11, 16),
			HoraInicio: new Date(consulta.horaInicio).toISOString().slice(11, 16),
			Observacoes: consulta.observacoes
		});

	}

	async save() {
		let consulta: IConsulta = Object.assign({}, this.formGroup.value);
		console.log(consulta);

		if (this.modoEdicao) {
			consulta.id = this.consultaId;
			let consultaPaciente = await this.consultaService.updateConsulta(consulta).toPromise();
			if (consultaPaciente != null) {
				alert("Data e hora já agendada!");
			} else {
				this.OnSaveSucess();
			}
		} else {

			let consultaPaciente = await this.consultaService.createConsulta(consulta).toPromise();
			if (consultaPaciente != null) {
				alert("Data e hora já agendada!");
			} else {
				this.OnSaveSucess();
			}

		}
	}
	OnSaveSucess() {
		this.router.navigate(["/consulta"]);
	}
	RangeData() {
		let consulta = Object.assign({}, this.formGroup.value);
		if (consulta.DataFim < consulta.DataInicio) {
			alert("Favor, verifique a data! Data inicial é maior que a data final!")
			this.formGroup.patchValue({
				DataFim: ''
			});
			return;
		}
	}
	RangeHora() {
		let consulta = Object.assign({}, this.formGroup.value);
		if (consulta.DataInicio === consulta.DataFim) {
			if (consulta.HoraFim <= consulta.HoraInicio) {
				alert("Favor, verifique a hora! Hora inicial é maior que a hora final!")
				this.formGroup.patchValue({
					HoraFim: ''
				});
				return;
			}
		}
	}



}

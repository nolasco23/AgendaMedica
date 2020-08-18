import { OnInit, Component } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { PacienteService } from "../paciente.service";
import { IPaciente } from "../paciente/paciente";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-paciente-form',
	templateUrl: './paciente-form.component.html',
	styleUrls: ['./paciente-form.component.css']
})
export class PacienteFormComponent implements OnInit {


	formGroup: FormGroup;
	modoEdicao: boolean = false;
	pacienteId: number;

	constructor(private fb: FormBuilder, private pacienteService: PacienteService, private router: Router, private activateRoute: ActivatedRoute) { }

	async ngOnInit() {
		this.formGroup = this.fb.group({
			nome: '',
			nascimento: ''
		});

		this.activateRoute.params.subscribe(async params => {
			if (params["id"] == undefined) {
				return;
			}
			this.modoEdicao = true;
			this.pacienteId = params["id"];

			const pacienteWS = await this.pacienteService.getPaciente(this.pacienteId);
			this.carregaFormulario(pacienteWS);


		});
	}
	carregaFormulario(paciente: IPaciente) {
		this.formGroup.patchValue({
			nome: paciente.nome,
			nascimento: new Date(paciente.nascimento).toISOString().slice(0, 10)
		});
	}

	save() {
		let paciente: IPaciente = Object.assign({}, this.formGroup.value);
		if (this.modoEdicao) {

			paciente.id = this.pacienteId;
			this.pacienteService.updatePaciente(paciente)
				.subscribe(paciente => this.OnSaveSucess()),
				error => console.error(error);
		} else {
			this.pacienteService.createPaciente(paciente)
				.subscribe(paciente => this.OnSaveSucess()),
				error => console.error(error);
		}
	}
	OnSaveSucess() {
		this.router.navigate(["/paciente"]);
	}
}

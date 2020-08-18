import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPaciente } from './paciente/paciente';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PacienteService {
	private apiURL = this.baseUrl + "api/Pacientes";

	constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

	getPacientes(): Observable<IPaciente[]> {
		return this.http.get<IPaciente[]>(this.apiURL);
	}

	getPaciente(id: number): Promise<IPaciente> {
		return this.http.get<IPaciente>(this.apiURL + '/' + id).toPromise();
	}

	createPaciente(paciente: IPaciente): Observable<IPaciente> {
		return this.http.post<IPaciente>(this.apiURL, paciente);
	}

	updatePaciente(paciente: IPaciente): Observable<IPaciente> {
		return this.http.put<IPaciente>(this.apiURL + '/' + paciente.id, paciente);
	}

	deletePaciente(pacienteId: string): Observable<IPaciente> {
		return this.http.delete<IPaciente>(this.apiURL + '/' + pacienteId.toString());
	}

}
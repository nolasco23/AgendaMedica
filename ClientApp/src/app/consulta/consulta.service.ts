import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConsulta } from './consulta/consulta';
import { Observable } from 'rxjs';
import { IPaciente } from '../paciente/paciente/paciente';

@Injectable({
    providedIn: 'root'
})
export class ConsultaService {

    temppage: number = 0;
    pageField = [];
    exactPageList: any;
    pacientes: any;

    private apiURL = this.baseUrl + "api/Consultas";

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    pageOnLoad() {
        if (this.temppage == 0) {
            this.pageField = [];
            for (var a = 0; a < this.exactPageList; a++) {
                this.pageField[a] = this.temppage + 1;
                this.temppage = this.temppage + 1;
            }
        }
    }

    getConsultas(): Observable<IConsulta[]> {
        return this.http.get<IConsulta[]>(this.apiURL);
    }
    getConsulta(consultaId: string): Observable<IConsulta> {
        return this.http.get<IConsulta>(this.apiURL + '/' + consultaId);
    }

    createConsulta(consulta: IConsulta): Observable<IConsulta> {
        return this.http.post<IConsulta>(this.apiURL, consulta);
    }

    updateConsulta(consulta: IConsulta): Observable<IConsulta> {
        return this.http.put<IConsulta>(this.apiURL + '/' + consulta.id.toString(), consulta);
    }

    deleteConsulta(consultaId: string): Observable<IConsulta> {
        return this.http.delete<IConsulta>(this.apiURL + '/' + consultaId.toString());
    }

    getPacientes(): Observable<IPaciente[]> {
        this.pacientes = this.http.get<IPaciente[]>(this.baseUrl + "api/Pacientes");
        return this.pacientes;
    }

    getPaciente(id: number): Promise<IPaciente> {
        return this.http.get<IPaciente>(this.apiURL + '/' + id).toPromise();
    }




}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
// import { CounterComponent } from './counter/counter.component';
// import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { PacienteComponent } from './paciente/paciente.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { PacienteFormComponent } from './paciente/paciente-form/paciente-form.component';
import { ConsultaFormComponent } from './consulta/consulta-form/consulta-form.component';
import { PacienteService } from './paciente/paciente.service';
import { ConsultaService } from './consulta/consulta.service'; 


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent, 
    PacienteComponent,
    ConsultaComponent,
    PacienteFormComponent,
    ConsultaFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'paciente', component: PacienteComponent },
      { path: 'paciente-incluir', component: PacienteFormComponent },
      { path: 'paciente-editar/:id', component: PacienteFormComponent },
      { path: 'consulta', component: ConsultaComponent },
      { path: 'consulta-incluir', component: ConsultaFormComponent },
      { path: 'consulta-editar/:id', component: ConsultaFormComponent }
    ])
  ],
  providers: [PacienteService, ConsultaService],
  bootstrap: [AppComponent]
})
export class AppModule { }

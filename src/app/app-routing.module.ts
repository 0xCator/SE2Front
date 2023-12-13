import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './Views/landingpage/landingpage.component';
import { LoginSignComponent } from './Views/login-sign/login-sign.component';
import { NormalUserComponent } from './Views/normal-user/normal-user.component';
import { AmbulanceManagerComponent } from './Views/ambulance-manager/ambulance-manager.component';
import { AdminComponent } from './Views/admin/admin.component';
import { ViewUsersComponent } from './Views/admin/view-users/view-users.component';
import { ViewAmbulanceManagersComponent } from './Views/admin/view-ambulance-managers/view-ambulance-managers.component';
import { AdminMainComponent } from './Views/admin/admin-main/admin-main.component';
import { AmbulanceMainComponent } from './Views/ambulance-manager/ambulance-main/ambulance-main.component';
import { ManageCarsComponent } from './Views/ambulance-manager/manage-cars/manage-cars.component';
import { ManageHospitalsComponent } from './Views/ambulance-manager/manage-hospitals/manage-hospitals.component';
import { PatientComponent } from './Views/normal-user/patient/patient.component';
import { RelativeComponent } from './Views/normal-user/relative/relative.component';
import { PatientMainComponent } from './Views/normal-user/patient/patient-main/patient-main.component';
import { ManageRelativesComponent } from './Views/normal-user/patient/manage-relatives/manage-relatives.component';
import { MedicalHistoryComponent } from './Views/normal-user/patient/medical-history/medical-history.component';

const routes: Routes = [
  { path: '' , component: LandingpageComponent },
  { path: 'login' , component: LoginSignComponent },
  { path: 'user' , component: NormalUserComponent, children: [
    {path: '', redirectTo: 'patient', pathMatch: 'full'},
    { path: 'patient', component: PatientComponent, children: [
      { path: '', component: PatientMainComponent },
      { path: 'relatives', component: ManageRelativesComponent },
      { path: 'medical-history', component: MedicalHistoryComponent }
    ]},
    { path: 'relative', component: RelativeComponent}
  ]},
  { path: 'ambulance-manager' , component: AmbulanceManagerComponent, children: [
    { path: '', component: AmbulanceMainComponent },
    { path: 'cars', component: ManageCarsComponent },
    { path: 'hospitals', component: ManageHospitalsComponent}
  ] 
  },
  { path: 'admin', component: AdminComponent, children: [
      { path: '', component: AdminMainComponent },
      { path: 'users', component: ViewUsersComponent },
      { path: 'hospitals', component: ManageHospitalsComponent },
      { path: 'cars', component: ManageCarsComponent },
      { path: 'ambulance-managers', component: ViewAmbulanceManagersComponent}
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card'
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { GoogleMapsModule } from '@angular/google-maps'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireMessagingModule} from "@angular/fire/compat/messaging";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {NotificationService} from "./Services/notification.service";
import {MatMenuModule} from "@angular/material/menu";


import { environment } from "../environments/environment";
import { RelativeBlockComponent } from './Components/relative-block/relative-block.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    LoginSignComponent,
    NormalUserComponent,
    AmbulanceManagerComponent,
    AdminComponent,
    ViewUsersComponent,
    ViewAmbulanceManagersComponent,
    AdminMainComponent,
    AmbulanceMainComponent,
    ManageCarsComponent,
    ManageHospitalsComponent,
    PatientComponent,
    RelativeComponent,
    PatientMainComponent,
    ManageRelativesComponent,
    MedicalHistoryComponent,
    RelativeBlockComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatMenuModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,
    AngularFireAuthModule,
    MatProgressBarModule
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

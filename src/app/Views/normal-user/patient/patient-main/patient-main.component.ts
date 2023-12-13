import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { User } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-patient-main',
  templateUrl: './patient-main.component.html',
  styleUrls: ['./patient-main.component.css']
})

export class PatientMainComponent implements OnInit{
  currentUser?: User;
  isPaired?: boolean;
  token?: string;
  heartRate?: number; 
  bloodPressure?: string;

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.currentUser = new User(localStorage.getItem('_id'), this.userService);
      
    timer(0, 500).subscribe({
      next: (val)=>{
        this.currentUser?.getData().subscribe({
          next: (val)=> {
            this.isPaired = (val.patientData.pairedBracelet !== "-1") ? true : false;
            this.token = val.patientData.token;
            let bdPr = val.patientData.patientReadings.bloodPressure;
            this.bloodPressure = bdPr.systolic + "/" + bdPr.diastolic;
            this.heartRate = val.patientData.patientReadings.heartRate;
          }
        });
      }
    })
  }
}

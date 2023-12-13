import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {
  currentUser?: User;
  message: string = '';
  isSubmitted: boolean = false;

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.currentUser = new User(localStorage.getItem('_id'), this.userService);
    
    this.currentUser?.getData().subscribe({
          next: (val)=> {
            this.message = val.patientData.medicalHistory;
            this.isSubmitted = true;
          }
        });
  }

  onSubmit() {
    this.currentUser?.updateMedicalHistory(this.message).subscribe({
      next: (val)=>{
        console.log(val);
      }
    });
    this.isSubmitted = true;
  }
  onInput() {
    this.isSubmitted = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit{
  currentUser?: User;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
      this.currentUser = new User(localStorage.getItem('_id'), this.userService);
  }
}

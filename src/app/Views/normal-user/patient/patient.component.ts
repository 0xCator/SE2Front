import { Component, OnInit } from '@angular/core';
import {NotificationService} from 'src/app/Services/notification.service';
import { Notification } from 'src/app/Models/notification.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.requestPermission();
    this.notificationService.receiveMessage();

  }

}

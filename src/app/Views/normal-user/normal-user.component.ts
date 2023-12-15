import { Component } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import {NotificationService} from 'src/app/Services/notification.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-normal-user',
  templateUrl: './normal-user.component.html',
  styleUrls: ['./normal-user.component.css']
})
export class NormalUserComponent {
  currentUser?: User;
  fullName?: string;
  location!: {
    longitude: number;
    latitude: number;
  }
  isRelative?: boolean;
  constructor(private userService: UserService, private router: Router, private notification:NotificationService,private http:HttpClient) {}
  notifications: any[] = [];
  hasUnread: boolean = false;

  ngOnInit(): void {
    if (localStorage.getItem('userType') == null || localStorage.getItem('userType') !== '2') {
      this.router.navigate(['']);
    }

    this.currentUser = new User(localStorage.getItem('_id'), this.userService);

    this.currentUser?.getData().subscribe({
      next: (val)=> {
        this.isRelative = (val.relativeData.assignedPatients.length === 0) ? false : true
        this.fullName = val.userInfo.fullName;
        this.notification.currentUserName = val.username;
        this.notifications = val.notifications;
        this.notifications.reverse();
        this.hasUnread = false;
        this.location = val.patientData.patientReadings.location;
      }
    });
    this.notification.currentMessage.subscribe({
      next: (val)=>{
        this.notifications.unshift(val);
        this.hasUnread = true;
      }
    });

  }

  handleNotification(notification: Notification){
    if(this.notifications[0] === notification){
      if(notification.title === "Be careful!"){
        this.sendRequest();
      }
    }
  }

  sendRequest(){
    const api = 'http://localhost:3000/api/requests';
    const body = {
      userID:this.currentUser?.userID,
      location:this.location
    }
    this.http.post(api,body).subscribe({
      next: (val)=> {
        alert("Request sent!");
      }
    })
  }

markAsRead(){
  this.hasUnread = false;
}
  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}

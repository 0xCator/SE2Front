import { Component } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import {NotificationService} from 'src/app/Services/notification.service';
import {HttpClient} from '@angular/common/http';
import {HospitalService} from 'src/app/Services/hospital.service';
import {Hospital} from 'src/app/Models/hospital.model';

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
  constructor(private userService: UserService, private router: Router, private notification:NotificationService,private http:HttpClient,
             private hospitalService: HospitalService) {}
  notifications: any[] = [];
  hasUnread: boolean = false;
  nearestHospital!: Hospital;

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

  private findClosestHospital(){
    this.hospitalService.getAllHospitals().subscribe(
      (val)=>{
        let minDistance = Number.MAX_VALUE;
        val.forEach((hospital)=>{
          let location = this.currentUser?.userData.patientData.patientReadings.location;
          let dist = this.haversine(location?.latitude!, location?.latitude!, hospital.latitude!, hospital.longitude!);
          if (dist < minDistance) {
            minDistance = dist;
            this.nearestHospital = hospital;
          }
        })
      }
    )
  }

  private haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
    let R = 6372.8; // in kilometers
    let dLat = this.degToRad(lat2 - lat1);
    let dLon = this.degToRad(lon2 - lon1);
    lat1 = this.degToRad(lat1);
    lat2 = this.degToRad(lat2);

    let a = Math.pow(Math.sin(dLat / 2),2) + Math.pow(Math.sin(dLon / 2),2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.asin(Math.sqrt(a));
    return R * c;
  }

  private degToRad = (deg: number): number => {
    return deg * (Math.PI / 180.0);
  };
  sendRequest(){
    const api = 'http://localhost:3000/api/requests';
    this.findClosestHospital();
    const body = {
      userID:this.currentUser?.userID,
      location:this.location,
      nearestHospital:this.nearestHospital
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

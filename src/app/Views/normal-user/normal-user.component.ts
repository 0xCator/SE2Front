import { Component } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import {NotificationService} from 'src/app/Services/notification.service';

@Component({
  selector: 'app-normal-user',
  templateUrl: './normal-user.component.html',
  styleUrls: ['./normal-user.component.css']
})
export class NormalUserComponent {
  currentUser?: User;
  fullName?: String;
  isRelative?: boolean;
  constructor(private userService: UserService, private router: Router, private notification:NotificationService) {}
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
      }
    });
    this.notification.currentMessage.subscribe({
      next: (val)=>{
        this.notifications.unshift(val);
        this.hasUnread = true;
      }
    });

  }


markAsRead(){
  this.hasUnread = false;
}
  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}

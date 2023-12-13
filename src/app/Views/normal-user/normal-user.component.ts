import { Component } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-normal-user',
  templateUrl: './normal-user.component.html',
  styleUrls: ['./normal-user.component.css']
})
export class NormalUserComponent {
  currentUser?: User;
  fullName?: String;
  isRelative?: boolean;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
      this.currentUser = new User(localStorage.getItem('_id'), this.userService);
      
      this.currentUser.getData().subscribe({
        next: (val)=> {
          this.fullName = val.userInfo.fullName;
          this.isRelative = (val.relativeData.assignedPatients.length === 0) ? false : true
        }
      })
  }
}

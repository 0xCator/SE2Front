import { Component, OnInit } from '@angular/core';
import { userModel } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/user.service';

export interface UserTable {
  fullname?: string;
  username?: string;
  email?: string;
  remove: any;
}

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit{
  displayedColumns: string[] = ['fullname', 'username', 'email', 'remove'];
  dataSource?: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
      this.fillGroup();
  }

  fillGroup() {
    this.userService.getAllUsers().subscribe({
      next: (val)=> {
        let valueTable: UserTable[] = [];
        val.forEach((value)=> {
          if (value.userType == 2) {
            valueTable.push({
              fullname: value.userInfo.fullName,
              username: value.username,
              email: value.userInfo.email,
              remove: value._id
            });
          }
        });
        this.dataSource = valueTable;
      }
    });
  }

  removeUser(userID: any){
    this.userService.deleteUser(userID).subscribe((val)=>{
      this.fillGroup();
    });
  }
}

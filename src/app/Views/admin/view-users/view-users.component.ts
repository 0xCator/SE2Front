import { Component } from '@angular/core';

export interface UserTable {
  fullname: string;
  username: string;
  email: string;
  remove: any;
}

const ELEMENT_DATA: UserTable[] = [
  {fullname: 'Mohamed', username: 'user1', email: 'mohammed@gmail.com', remove: null},
];

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent {
  displayedColumns: string[] = ['fullname', 'username', 'email', 'remove'];
  dataSource = ELEMENT_DATA;
}

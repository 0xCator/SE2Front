import { Component } from '@angular/core';

export interface userRelativeTable {
  username: string;
  fullName: string;
  remove: any;
}

const ELEMENT_DATA: userRelativeTable[] = [
  {username: 'Mohamed', fullName:'Mohamed', remove: null},
];

@Component({
  selector: 'app-manage-relatives',
  templateUrl: './manage-relatives.component.html',
  styleUrls: ['./manage-relatives.component.css']
})
export class ManageRelativesComponent {
  displayedColumns: string[] = ['username', 'fullName', 'remove'];
  dataSource = ELEMENT_DATA;
  disabled=false;
}

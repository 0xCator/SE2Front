import { Component } from '@angular/core';

export interface AmbulanceManagerTable {
  managerUsername: string;
  remove: any;
}

const ELEMENT_DATA: AmbulanceManagerTable[] = [
  {managerUsername: 'user1', remove: null},
];

@Component({
  selector: 'app-view-ambulance-managers',
  templateUrl: './view-ambulance-managers.component.html',
  styleUrls: ['./view-ambulance-managers.component.css']
})
export class ViewAmbulanceManagersComponent {
  displayedColumns: string[] = ['managerUsername', 'remove'];
  dataSource = ELEMENT_DATA;
  disabled=false;
}

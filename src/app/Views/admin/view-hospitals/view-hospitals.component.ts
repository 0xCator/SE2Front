import { Component } from '@angular/core';

export interface HospitalTable {
  hospitalName: string;
  hospitalLocation: string;
}

const ELEMENT_DATA: HospitalTable[] = [
];

@Component({
  selector: 'app-view-hospitals',
  templateUrl: './view-hospitals.component.html',
  styleUrls: ['./view-hospitals.component.css']
})
export class ViewHospitalsComponent {
  displayedColumns: string[] = ['hospitalName', 'hospitalLocation'];
  dataSource = ELEMENT_DATA;
}

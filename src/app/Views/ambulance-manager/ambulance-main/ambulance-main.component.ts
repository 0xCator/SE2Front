import { Component } from '@angular/core';
export interface AmbulanceRequestTable {
  patientName: string;
  timeOfRequest: string;
  viewCase: any;
}

const ELEMENT_DATA: AmbulanceRequestTable[] = [
  {patientName: 'Mohamed', timeOfRequest:'5:55', viewCase: null},
  {patientName: 'Ali', timeOfRequest:'7:44', viewCase: null},
];

@Component({
  selector: 'app-ambulance-main',
  templateUrl: './ambulance-main.component.html',
  styleUrls: ['./ambulance-main.component.css']
})
export class AmbulanceMainComponent {
  displayedColumns: string[] = ['patientName', 'timeOfRequest', 'viewCase'];
  dataSource = ELEMENT_DATA;
  showCase=false;

  viewCase(caseID:any){
    this.showCase=true;
  }
}

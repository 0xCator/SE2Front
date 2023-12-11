import { Component } from '@angular/core';
export interface CarsTable {
  driverName: string;
  licensePlate: string;
  remove: any;
}

const ELEMENT_DATA: CarsTable[] = [
  {driverName: 'Mohamed', licensePlate:'80085', remove: null},
];

@Component({
  selector: 'app-manage-cars',
  templateUrl: './manage-cars.component.html',
  styleUrls: ['./manage-cars.component.css']
})
export class ManageCarsComponent {
  displayedColumns: string[] = ['driverName', 'licensePlate', 'remove'];
  dataSource = ELEMENT_DATA;
  disabled=false;
}

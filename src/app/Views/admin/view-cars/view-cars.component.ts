import { Component } from '@angular/core';

export interface CarTable {
  carName: string;
  driverName: string;
  licensePlate: string;
  state: string;
}

const ELEMENT_DATA: CarTable[] = [
];

@Component({
  selector: 'app-view-cars',
  templateUrl: './view-cars.component.html',
  styleUrls: ['./view-cars.component.css']
})

export class ViewCarsComponent {
  displayedColumns: string[] = ['carName', 'driverName', 'licensePlate', 'state'];
  dataSource = ELEMENT_DATA;
}
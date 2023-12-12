import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,FormControlName,Validators} from '@angular/forms';

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

export class ManageCarsComponent implements OnInit {
  displayedColumns: string[] = ['driverName', 'licensePlate', 'remove'];
  dataSource = ELEMENT_DATA;
  disabled=false;
  formgroup!:FormGroup;

  constructor(private formbuilder:FormBuilder){}
  
  ngOnInit(){
    this.formgroup = this.formbuilder.group({
      driverName:['',Validators.required],
      licensePlate:['',Validators.required],
    });
  }
}

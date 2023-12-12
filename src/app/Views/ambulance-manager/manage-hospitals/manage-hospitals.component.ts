import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,FormControlName,Validators} from '@angular/forms';
export interface HospitalsTable {
  hospitalName: string;
  locLatitude: string;
  locLongitude: string;
  remove: any;
}

const ELEMENT_DATA: HospitalsTable[] = [
  {hospitalName: 'Mohamed', locLatitude:'55555', locLongitude:'7777777' ,remove: null},
];

@Component({
  selector: 'app-manage-hospitals',
  templateUrl: './manage-hospitals.component.html',
  styleUrls: ['./manage-hospitals.component.css']
})
export class ManageHospitalsComponent {
  displayedColumns: string[] = ['hospitalName', 'locLatitude', 'locLongitude', 'remove'];
  dataSource = ELEMENT_DATA;
  disabled=false;
  formgroup!:FormGroup;

  constructor(private formbuilder:FormBuilder){
  }
  ngOnInit(){
    this.formgroup = this.formbuilder.group({
      hospitalName:['',Validators.required],
      latitude:['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      longitude:['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    });
  }
}

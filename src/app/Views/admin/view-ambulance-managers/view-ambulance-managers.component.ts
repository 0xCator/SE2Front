import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,FormControlName,Validators} from '@angular/forms';
export interface AmbulanceManagerTable {
  managerUsername: string;
  remove: any;
}

const ELEMENT_DATA: AmbulanceManagerTable[] = [
  {managerUsername: 'mohammed55555', remove: null},
  {managerUsername: 'mohammed1', remove: null},
  {managerUsername: 'mohammed333', remove: null},
];

@Component({
  selector: 'app-view-ambulance-managers',
  templateUrl: './view-ambulance-managers.component.html',
  styleUrls: ['./view-ambulance-managers.component.css'],
})
export class ViewAmbulanceManagersComponent implements OnInit {
  formgroup!:FormGroup;
  displayedColumns: string[] = ['managerUsername', 'remove'];
  dataSource = ELEMENT_DATA;
  disabled=false;
  constructor(private formbuilder:FormBuilder){
  }
  ngOnInit(){
    this.formgroup = this.formbuilder.group({
      username:['',Validators.required],
      password:['',Validators.required],
    });
  }
}

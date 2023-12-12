import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,FormControlName,Validators} from '@angular/forms';

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
  formgroup!:FormGroup;

  constructor(private formbuilder:FormBuilder){}
  
  ngOnInit(){
    this.formgroup = this.formbuilder.group({
      username:['',Validators.required],
    });
  }
}

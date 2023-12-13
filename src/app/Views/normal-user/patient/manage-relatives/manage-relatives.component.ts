import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,FormControlName,Validators} from '@angular/forms';
import { User } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/user.service';

export interface userRelativeTable{
  username: string;
  remove: any;
}

const ELEMENT_DATA: userRelativeTable[] = [];

@Component({
  selector: 'app-manage-relatives',
  templateUrl: './manage-relatives.component.html',
  styleUrls: ['./manage-relatives.component.css']
})

export class ManageRelativesComponent implements OnInit {
  displayedColumns: string[] = ['username', 'remove'];
  dataSource?: any;
  disabled=false;
  formgroup!:FormGroup;
  currentUser?: User;

  constructor(private formbuilder:FormBuilder, private userService: UserService){}
  
  ngOnInit(){
    this.currentUser = new User(localStorage.getItem('_id'), this.userService);

    this.currentUser?.getData().subscribe({
      next: (val)=> {
        val.patientData.relatives.forEach((i)=>{
          ELEMENT_DATA.push({
            username: i,
            remove: i
          })
        });
        this.dataSource=ELEMENT_DATA;
      }
    });

    this.formgroup = this.formbuilder.group({
      username:['',Validators.required],
    });
  }

  unassignRelative(username: string) {
    console.log(username);
  }
}

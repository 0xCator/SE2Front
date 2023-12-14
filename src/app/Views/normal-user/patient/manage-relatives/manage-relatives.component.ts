import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { User, userModel } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/user.service';

export interface userRelativeTable{
  username: string;
  remove: any;
}

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
  creationError = '';

  constructor(private formbuilder:FormBuilder, private userService: UserService){}
  
  ngOnInit(){
    this.currentUser = new User(localStorage.getItem('_id'), this.userService);

    this.fillGroup();

    this.formgroup = this.formbuilder.group({
      username:['',Validators.required],
    });
  }

  fillGroup() {
    this.currentUser?.getData().subscribe({
      next: (val)=> {
        let valueTable: userRelativeTable[] = [];
        val.patientData.relatives.forEach((value)=> {
          valueTable.push({
            username: value,
            remove: value
          });
        });
        this.dataSource = valueTable;
      }
    });
  }

  onSubmit() {
    //Compare to all users
    this.userService.getAllUsers().subscribe({
      next: (val) => {
        this.currentUser?.getData().subscribe({
          next: (value) => {
            if (this.isUnique(val, this.formgroup.value.username, value.patientData.relatives)) {
              this.userService.assignRelative(this.currentUser?.userID, this.formgroup.value.username).subscribe({
                next: (val)=>{
                  this.formgroup.reset();
                  this.creationError = '';
                  this.disabled = false;
                  this.fillGroup();
                }
              });
            } else {
              this.creationError = "Invalid username.";
            }
          }
        })
      }
    });
  }

  unassignRelative(username: string) {
    this.currentUser?.removeRelative(username).subscribe();
    this.fillGroup();
  }

  isUnique(val: userModel[], relativeUsername: string, relativeSet: string[]) {
    let result: boolean = false;
    val.forEach((val)=>{
      if (val.username == relativeUsername) {
        if (val._id !== this.currentUser?.userID && relativeSet.indexOf(val.username) && val.userType == 2) {
          if (result != true) {
            result = true;
          }
        }
      }
    });
    return result;
  }
}

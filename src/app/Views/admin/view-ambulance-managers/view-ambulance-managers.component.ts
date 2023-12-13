import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,FormControlName,Validators} from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { LoginService } from 'src/app/Services/login.service';
import djb2a from 'djb2a';
export interface AmbulanceManagerTable {
  managerUsername?: string;
  remove: any;
}

@Component({
  selector: 'app-view-ambulance-managers',
  templateUrl: './view-ambulance-managers.component.html',
  styleUrls: ['./view-ambulance-managers.component.css'],
})
export class ViewAmbulanceManagersComponent implements OnInit {
  formgroup!:FormGroup;
  displayedColumns: string[] = ['managerUsername', 'remove'];
  dataSource?: any;
  disabled=false;
  creationError='';
  constructor(private formbuilder:FormBuilder, private userService: UserService, private loginService: LoginService){}

  ngOnInit(){
    this.formgroup = this.formbuilder.group({
      username:['',Validators.required],
      password:['',[Validators.required, Validators.minLength(8)]],
    });
    this.fillGroup();
  }

  fillGroup() {
    this.userService.getAllUsers().subscribe({
      next: (val)=> {
        let valueTable: AmbulanceManagerTable[] = [];
        val.forEach((value)=> {
          if (value.userType == 1) {
            valueTable.push({
              managerUsername: value.username,
              remove: value._id
            });
          }
        });
        this.dataSource = valueTable;
      }
    });
  }

  onSubmit() {
    //Get all hospitals to compare
    this.loginService.userExists(this.formgroup.value.username).subscribe({
      next: (val)=>{
        if (val == null) {
          this.loginService.register({
            username: this.formgroup.value.username,
            password: djb2a(this.formgroup.value.password),
            userType: 1,
          }).subscribe({
            next: (val) => {
              this.formgroup.reset();
              this.creationError = '';
              this.disabled = false;
              this.fillGroup();
            }
          });
        } else {
          this.creationError = "This username already exists";
        }
      }
    });
  }

  removeManager(userID: any) {
    this.userService.deleteUser(userID).subscribe();
    this.fillGroup();
  }
}

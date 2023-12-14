import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-relative',
  templateUrl: './relative.component.html',
  styleUrls: ['./relative.component.css']
})
export class RelativeComponent implements OnInit {
  constructor(private userService: UserService, private router: Router){}

  currentUser?: User;
  isRelative?: boolean;
  relativeObjects: User[] = [];

  ngOnInit(): void {
    this.currentUser = new User(localStorage.getItem('_id'), this.userService);

    this.currentUser?.getData().subscribe({
      next: (val)=> {
        this.isRelative = (val.relativeData.assignedPatients.length === 0) ? false : true
        if (!this.isRelative) {
          this.router.navigate(['user']);
        } else {
        val.relativeData.assignedPatients.forEach((relativeID)=>{
          this.relativeObjects.push(new User(relativeID, this.userService));
        })
        }
      }
    });


  }  
}

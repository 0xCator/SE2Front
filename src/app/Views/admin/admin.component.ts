import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  constructor(private router: Router){}
  ngOnInit(): void {
    if (localStorage.getItem('userType') == null || localStorage.getItem('userType') !== '0') {
      this.router.navigate(['']);
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}

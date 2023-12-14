import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ambulance-manager',
  templateUrl: './ambulance-manager.component.html',
  styleUrls: ['./ambulance-manager.component.css']
})
export class AmbulanceManagerComponent {
  constructor(private router: Router){}
  ngOnInit(): void {
    if (localStorage.getItem('userType') == null || localStorage.getItem('userType') !== '1') {
      this.router.navigate(['']);
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}

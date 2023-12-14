import { Component, OnInit } from '@angular/core';
import { timer, Observable, mergeMap, share, switchMap, Subscription, distinctUntilChanged, debounceTime, throttleTime, interval, map } from 'rxjs';
import { Hospital } from 'src/app/Models/hospital.model';
import { HospitalService } from 'src/app/Services/hospital.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit{
  mapOptions: google.maps.MapOptions = {
    mapTypeControl: false, 
    streetViewControl: false,
 }
 private hospitalsSubscription!: Subscription;

 hospitalList?: Hospital[];
 constructor(private hospitalService: HospitalService) {}

 ngOnInit(): void {
  this.hospitalsSubscription = this.hospitalService.hospitals$.subscribe((data) => {
    this.hospitalList = data;
    console.log(this.hospitalList);
  });
  timer(0,500).subscribe(
    (data)=>{
      this.hospitalService.fetchHospitalData();
    }
  )
 }

 ngOnDestroy() {
  if (this.hospitalsSubscription) {
    this.hospitalsSubscription.unsubscribe();
  }
}
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { timer, Observable, mergeMap, share, switchMap, Subscription, distinctUntilChanged, debounceTime, throttleTime, interval, map } from 'rxjs';
import { Car } from 'src/app/Models/car.model';
import { Hospital } from 'src/app/Models/hospital.model';
import { RequestModel } from 'src/app/Models/request.model';
import { User } from 'src/app/Models/user.model';
import { CarService } from 'src/app/Services/cars.service';
import { HospitalService } from 'src/app/Services/hospital.service';
import { RequestService } from 'src/app/Services/request.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit{
  mapOptions: google.maps.MapOptions = {
    mapTypeControl: false, 
    streetViewControl: false,
    styles: [
      {
        elementType: "geometry",
        stylers: [{ color: "#f5f5f5" }],
      },
      {
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
      {
        elementType: "labels.text.fill",
        stylers: [{ color: "#616161" }],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [{ color: "#f5f5f5" }],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [{ color: "#bdbdbd" }],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#eeeeee" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#757575" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#e5e5e5" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9e9e9e" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.text.fill",
        stylers: [{ color: "#757575" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#dadada" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#616161" }],
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9e9e9e" }],
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [{ color: "#e5e5e5" }],
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [{ color: "#eeeeee" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#c9c9c9" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9e9e9e" }],
      },
    ]
 }
 center: google.maps.LatLngLiteral = {
  lat: 29.96197758406346, lng: 31.270859053324683
};
@ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
 private hospitalsSubscription!: Subscription;
 private carsSubscription!: Subscription;
 private usersSubscription!: Subscription;
 private requestSubscription!: Subscription;
  infoContent= '';
  currentSelection?: any;
  selectionType = 0;
 hospitalList?: Hospital[];
 carMap!: Map<String, Car>;
 userMap!: Map<String, User>;
 requestMap!: Map<String, RequestModel>
 constructor(private hospitalService: HospitalService, private carService: CarService,
  private userService: UserService, private requestService: RequestService) {}

 ngOnInit(): void {
  this.hospitalsSubscription = this.hospitalService.hospitals$.subscribe((data) => {
    this.hospitalList = data;
  });
  this.carsSubscription = this.carService.cars$.subscribe((data) => {
    this.carMap = new Map();
    data.forEach((currentCar)=>{
      this.carMap.set(currentCar._id, new Car(currentCar._id, this.carService));
    });
  });
  this.usersSubscription = this.userService.users$.subscribe((data) => {
    this.userMap = new Map();
    data.forEach((currentUser)=>{
      this.userMap.set(currentUser._id, new User(currentUser._id, this.userService));
    })
  this.requestSubscription = this.requestService.requests$.subscribe((data)=>{
    this.requestMap = new Map();
    data.forEach((currentRequest)=>{
      let req = currentRequest;
      req.carLocation = this.carMap.get(currentRequest.carID)?.location;
      this.requestMap.set(currentRequest._id, req);
    })
  })

  });
  timer(0,500).subscribe(
    (data)=>{
      this.hospitalService.fetchHospitalData();
      this.carService.fetchCarsData();
      this.userService.fetchPatientsData();
      this.requestService.fetchRequestData();
      this.setWindow();
    }
  )
 }

 ngOnDestroy() {
    if (this.hospitalsSubscription) {
      this.hospitalsSubscription.unsubscribe();
    }
    if (this.carsSubscription) {
      this.carsSubscription.unsubscribe();
    }
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
    }
  }

  openInfoWindow(marker: MapMarker, selection: any, type: number) {
    if (this.infoWindow != undefined) {
      this.currentSelection = selection;
      this.selectionType = type;
      this.setWindow();
      this.infoWindow.open(marker);
      console.log(this.currentSelection);
    }
  }

  setWindow() {
    switch (this.selectionType) {
      case 0:
        this.infoContent = "<p><b>Name: </b> "+ this.currentSelection.name + "</p>";
      break;
      case 1:
        this.infoContent = "<p><b>Driver's name: </b>" + this.currentSelection.driverName + "</p>" +
        "<p><b>License plate: </b>" + this.currentSelection.licensePlate + "</p>";
      break;
      case 2:
        let userInfo = this.currentSelection.userData.userInfo;
        let patientReadings = this.currentSelection.userData.patientData.patientReadings;
        this.infoContent = "<p><b>Info:</b></p>" + "<p><b>Name: </b>" + userInfo.fullName + "</p>" +
        "<p><b>Gender: </b>" + userInfo.gender + "</p>" +
        "<p><b>Age: </b>" + userInfo.age + "</p>" + "<p><b>Readings:</b></p>" +
        "<p><b>Heart rate: </b>" + patientReadings.heartRate + "</p>" +
        "<p><b>Blood pressure: </b>" + patientReadings.bloodPressure.systolic +"/"+ patientReadings.bloodPressure.diastolic + "</p>"
      break;
    }
  }
}

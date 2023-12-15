import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { RequestModel } from 'src/app/Models/request.model';
import { User } from 'src/app/Models/user.model';
import { CarService } from 'src/app/Services/cars.service';
import { HospitalService } from 'src/app/Services/hospital.service';
import { RequestService } from 'src/app/Services/request.service';
import { UserService } from 'src/app/Services/user.service';

export interface AmbulanceRequestTable {
  patientName: string;
  timeOfRequest: string;
  viewCase: any;
}

export interface CaseData {
  name: string,
    age: number,
    gender: string,
    medicalHistory: string,
    location: {
      longitude: number,
      latitude: number
    },
    carLocation: {
      longitude: number,
      latitude: number
    },
    requestType: string,
    closestHospital: string,
    userIcon: string
}

@Component({
  selector: 'app-ambulance-main',
  templateUrl: './ambulance-main.component.html',
  styleUrls: ['./ambulance-main.component.css']
})
export class AmbulanceMainComponent implements OnInit{
  displayedColumns: string[] = ['patientName', 'timeOfRequest', 'viewCase'];
  dataSource?: any;
  showCase=false;
  currentCase?: string;

  currentUser?: User;
  caseData: CaseData = {
    name: "",
    age: 0,
    gender: "",
    medicalHistory: "",
    location: {
      longitude: 0,
      latitude: 0
    },
    carLocation: {
      longitude: 0,
      latitude: 0
    },
    requestType: "",
    closestHospital: "",
    userIcon: ""
  }

  center: google.maps.LatLngLiteral = {
    lat: 29.96197758406346, lng: 31.270859053324683
  };

  constructor(private requestService: RequestService, private userService: UserService, private hospitalService: HospitalService,
    private carService: CarService) {}

  ngOnInit(): void {
      this.fillGroup();
  }

  viewCase(caseID:any){
    this.showCase=true;
    this.currentCase = caseID;
    this.requestService.getOne(caseID).subscribe(
      (value)=>{
        this.currentUser = new User(value.userID, this.userService);
        this.currentUser.getData().subscribe(
          (val)=>{
            this.caseData.name = val.userInfo.fullName;
            this.caseData.age = val.userInfo.age;
            this.caseData.gender = val.userInfo.gender;
            this.caseData.requestType = value.requestType == 1 ? "Automated (Critical)" : "Manual (Warning)";
            this.caseData.medicalHistory = val.patientData.medicalHistory;
            this.caseData.location = val.patientData.patientReadings.location;
            this.caseData.userIcon = value.requestType == 1 ? '../../../../assets/Icons/userWarning.png' : '../../../../assets/Icons/userCritical.png'
            this.findClosestHospital();
            this.getCarLocation(value.carID);
          }
        )
      }
    )
  }

  getUserReport() {
    this.currentUser?.generateReport();
  }

  getCarLocation(carID: any) {
    this.carService.getCar(carID).subscribe(
      (val)=>{
        this.caseData.carLocation = val.currentLocation;
        this.center.lat = this.caseData.location.latitude //Math.abs((this.caseData.carLocation.latitude! + this.caseData.location.latitude) / 2);
        this.center.lng = this.caseData.location.longitude //Math.abs((this.caseData.carLocation.longitude! + this.caseData.location.longitude) / 2);
        console.log(this.center);
      }
    );
  }

  fillGroup() {
    timer(0, 500).subscribe(
      (val)=>{
        this.requestService.getAll().subscribe(
          (val)=>{
            if (this.dataSource == null || val.length !== this.dataSource.length) {
              let currentExists = false;
              let valueTable: AmbulanceRequestTable[] = [];
              val.forEach((value)=> {
                if (this.currentCase !== undefined) {
                  if (value._id == this.currentCase) {
                    currentExists = true;
                  }
                }
                valueTable.push({
                  patientName: value.userID,
                  timeOfRequest: value.createdAt.slice(0, 10) + " - " + value.createdAt.slice(11, 19),
                  viewCase: value._id
                });
              });
              //Hide case list if it doesn't exist;
              if (!currentExists) {
                this.showCase = false;
                this.currentCase = undefined;
                this.currentUser = undefined;
              }
              this.dataSource = valueTable;
            }
          }
        )
      }
    )
  }

  private findClosestHospital() {
    this.hospitalService.getAllHospitals().subscribe(
      (val)=>{
        let minDistance = Number.MAX_VALUE;
        val.forEach((hospital)=>{
          let dist = this.haversine(this.caseData.location.latitude, this.caseData.location.longitude, hospital.latitude!, hospital.longitude!);
          if (dist < minDistance) {
            minDistance = dist;
            this.caseData.closestHospital = hospital.name!;
          }
        })
      }
    )
  }

  private haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
    let R = 6372.8; // in kilometers
    let dLat = this.degToRad(lat2 - lat1);
    let dLon = this.degToRad(lon2 - lon1);
    lat1 = this.degToRad(lat1);
    lat2 = this.degToRad(lat2);

    let a = Math.pow(Math.sin(dLat / 2),2) + Math.pow(Math.sin(dLon / 2),2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.asin(Math.sqrt(a));
    return R * c;
  }

  private degToRad = (deg: number): number => {
    return deg * (Math.PI / 180.0);
  };
}

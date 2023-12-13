import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,FormControlName,Validators} from '@angular/forms';
import { CarService } from 'src/app/Services/cars.service';
import { HospitalService } from 'src/app/Services/hospital.service';
import { CarModel } from 'src/app/Models/car.model';
import { Hospital } from 'src/app/Models/hospital.model';

export interface CarsTable {
  driverName?: string;
  licensePlate?: string;
  remove: any;
}

@Component({
  selector: 'app-manage-cars',
  templateUrl: './manage-cars.component.html',
  styleUrls: ['./manage-cars.component.css']
})

export class ManageCarsComponent implements OnInit {
  displayedColumns: string[] = ['driverName', 'licensePlate', 'remove'];
  dataSource?: any;
  disabled=false;
  formgroup!:FormGroup;
  canCreate=true;
  creationError = '';

  constructor(private formbuilder:FormBuilder, private carService: CarService, 
    private hospitalService: HospitalService){}
  
  ngOnInit(){
    this.formgroup = this.formbuilder.group({
      driverName:['',Validators.required],
      licensePlate:['',Validators.required],
    });
    this.enableCreation();
    this.fillGroup();
  }

  enableCreation() {
    this.hospitalService.getAllHospitals().subscribe({
      next: (val) => {
        this.canCreate = (val.length !== 0);
      }
    });
  }

  fillGroup() {
    this.carService.getAllCars().subscribe({
      next: (val)=> {
        let valueTable: CarsTable[] = [];
        val.forEach((value)=> {
          valueTable.push({
            driverName: value.driverName,
            licensePlate: value.licensePlate,
            remove: value._id
          });
        });
        this.dataSource = valueTable;
      }
    });
  }

  onSubmit() {
    //Get all hospitals to compare
    this.carService.getAllCars().subscribe({
      next: (val)=>{
        if (val.length === 0 || this.uniqueCar(val, this.formgroup.value.licensePlate)) {
          this.hospitalService.getAllHospitals().subscribe({
            next: (val) => {
              this.carService.createCar({
                driverName: this.formgroup.value.driverName,
                licensePlate: this.formgroup.value.licensePlate,
                currentLocation: this.randomizeHospital(val)
              }).subscribe({
                next: (val) => {
                  this.formgroup.reset();
                  this.creationError = '';
                  this.disabled = false;
                  this.fillGroup();
                }
              })
            }
          })
        } else {
          this.creationError = "This license plate already exists";
        }
      }
    });
  }

  onRemove(carID: any) {
    this.carService.deleteCar(carID).subscribe();
    this.fillGroup();
  }

  uniqueCar(currentCars: CarModel[], licensePlate: string) {
    let result: boolean = true;
    currentCars.forEach((val)=>{
      if (val.licensePlate == licensePlate) {
        console.log("");
        result = false;
      }
    });
    return result;
  }

  randomizeHospital(hospitalList: Hospital[]) {
    console.log("get all hospitals");
    let index = Math.floor(Math.random() * hospitalList.length);
    return {
      longitude: hospitalList[index].longitude,
      latitude: hospitalList[index].latitude
    };
  }
}

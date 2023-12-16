import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,FormControlName,Validators} from '@angular/forms';
import { Hospital } from 'src/app/Models/hospital.model';
import { HospitalService } from 'src/app/Services/hospital.service';
export interface HospitalsTable {
  hospitalName?: string;
  locLatitude?: number;
  locLongitude?: number;
  remove?: any;
}

@Component({
  selector: 'app-manage-hospitals',
  templateUrl: './manage-hospitals.component.html',
  styleUrls: ['./manage-hospitals.component.css']
})
export class ManageHospitalsComponent implements OnInit{
  displayedColumns: string[] = ['hospitalName', 'locLatitude', 'locLongitude', 'remove'];
  dataSource?: any;
  disabled=false;
  formgroup!:FormGroup;
  creationError = '';

  constructor(private formbuilder:FormBuilder, private hospitalService: HospitalService){
  }
  ngOnInit(){
    this.formgroup = this.formbuilder.group({
      hospitalName:['',Validators.required],
      latitude:['',[Validators.required, Validators.pattern(/^\d+(?:\.\d+)*$/)]],
      longitude:['',[Validators.required, Validators.pattern(/^\d+(?:\.\d+)*$/)]],
    });
    this.fillGroup();
  }
  
  fillGroup() {
    this.hospitalService.getAllHospitals().subscribe({
      next: (val)=> {
        let valueTable: HospitalsTable[] = [];
        val.forEach((value)=> {
          valueTable.push({
            hospitalName: value.name,
            locLatitude: value.latitude,
            locLongitude: value.longitude,
            remove: value._id
          });
        });
        this.dataSource = valueTable;
      }
    });
  }

  onSubmit() {
    //Get all hospitals to compare
    this.hospitalService.getAllHospitals().subscribe({
      next: (val)=>{
        if (val.length === 0 || this.uniqueHospital(val, this.formgroup.value.longitude,this.formgroup.value.latitude)) {
          this.hospitalService.createHospital({
            name: this.formgroup.value.hospitalName,
            longitude: this.formgroup.value.longitude,
            latitude: this.formgroup.value.latitude
          }).subscribe({
            next: (val) => {
              this.formgroup.reset();
              this.creationError = '';
              this.disabled = false;
              this.fillGroup();
            }
          });
        } else {
          this.creationError = "This hospital's position already exists";
        }
      }
    });
  }

  onRemove(hospitalID: any) {
    this.hospitalService.deleteHospital(hospitalID).subscribe((val)=>{
      this.fillGroup();
    });
  }

  uniqueHospital(currentHospitals: Hospital[], longitude: number, latitude: number) {
    let result: boolean = true;
    currentHospitals.forEach((val)=>{
      if (val.latitude == latitude && val.longitude == longitude) {
        console.log("");
        result = false;
      }
    });
    return result;
  }
}

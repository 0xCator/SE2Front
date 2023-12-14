import { Injectable } from '@angular/core';
import { Observable, throttleTime } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../Models/hospital.model';
import { BehaviorSubject } from 'rxjs';

const BASEURL = 'http://localhost:3000/api/hospitals';
@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private hospitalsSubject: BehaviorSubject<Hospital[]> = new BehaviorSubject<Hospital[]>([]);
  public hospitals$: Observable<Hospital[]> = this.hospitalsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchHospitalData();
  }

  getAllHospitals(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(BASEURL);
  }
  findOneHospital(hospitalID: any): Observable<Hospital> {
    return this.http.get<Hospital>(BASEURL+"/"+hospitalID);
  }
  createHospital(hospitalData: any){
    //this.hospital.next(hospitalData);
   return this.http.post<Hospital>(BASEURL, hospitalData);
  }
  deleteHospital(hospitalID:any){
    return this.http.delete<Hospital>(BASEURL+"/"+hospitalID);
  }

  fetchHospitalData() {
    this.http.get<Hospital[]>(BASEURL).subscribe((data) => {
      if (this.hospitalsSubject.value.length !== data.length){
        this.hospitalsSubject.next(data);
      }
    });
  }
}

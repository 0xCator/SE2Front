import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../Models/hospital.model';

const BASEURL = 'http://localhost:3000/api/hospitals';
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  getAllHospitals(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(BASEURL);
  }
  findOneHospital(hospitalID: any): Observable<Hospital> {
    return this.http.get<Hospital>(BASEURL+"/"+hospitalID);
  }
  createHospital(hospitalData: any){
    return this.http.post<Hospital>(BASEURL, hospitalData);
  }
  deleteHospital(hospitalID:any){
    return this.http.delete<Hospital>(BASEURL+"/"+hospitalID);
  }
}

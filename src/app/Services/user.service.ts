import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userModel } from '../Models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  
  getUserData(userID: any): Observable<userModel> {
    return this.http.get<userModel>("http://localhost:3000/api/users/"+userID);
  }

  updateMedicalHistory(userID: any, newHistory: string) {
    return this.http.patch('http://localhost:3000/api/users/'+userID+'/medicalHistory', {'medicalHistory':newHistory});
  }

  unassignRelative(userID: any, relativeUsername: string) {
    return this.http.patch('http://localhost:3000/api/users/'+userID+'/Relatives/', {'relativeUsername': relativeUsername});
  }

  unassignPatient(relativeUsername: string, patientUsername: string) {
    return this.http.patch('http://localhost:3000/api/users/'+relativeUsername+'/Relatives/', {'patientUsername': patientUsername});
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userModel, readingModel } from '../Models/user.model';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  
  getUserData(userID: any): Observable<userModel> {
    return this.http.get<userModel>(BASEURL+userID);
  }

  getAllUsers(): Observable<userModel[]> {
    return this.http.get<userModel[]>(BASEURL)
  }

  getReadings(userID: any): Observable<readingModel[]> {
    return this.http.get<readingModel[]>('http://localhost:3000/api/readings/'+userID);
  }

  updateMedicalHistory(userID: any, newHistory: string) {
    return this.http.patch(BASEURL+userID+'/medicalHistory', {'medicalHistory':newHistory});
  }

  unassignRelative(userID: any, relativeUsername: string) {
    return this.http.patch(BASEURL+userID+'/Relatives/', {'relativeUsername': relativeUsername});
  }

  unassignPatient(relativeUsername: string, patientUsername: string) {
    return this.http.patch(BASEURL+relativeUsername+'/Relatives/', {'patientUsername': patientUsername});
  }

  deleteUser(userID: any) {
    return this.http.delete(BASEURL+userID);
  }
}

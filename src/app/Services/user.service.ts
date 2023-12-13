import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  
  getUserData(userID: any) {
    return this.http.get("http://localhost:3000/api/users/"+userID);
  }

}

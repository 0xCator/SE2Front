import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { loginResult } from '../Models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  login(username: any, password: any): Observable<loginResult> {
    return this.http.get('http://localhost:3000/api/functions/login/'+username+'/'+password);
  }

  userExists(username: any) {
    return this.http.get("http://localhost:3000/api/users/username/"+username);
  }

  register(data: any): Observable<any> {
    return this.http.post("http://localhost:3000/api/users", data);
  }
}

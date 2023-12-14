import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RequestModel } from '../Models/request.model';

const BASEURL = 'http://localhost:3000/api/requests/';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<RequestModel[]> {
    return this.http.get<RequestModel[]>(BASEURL);
  }

  getOne(reqID: any): Observable<RequestModel> {
    return this.http.get<RequestModel>(BASEURL+reqID);
  }

  create(data: any) {
    return this.http.post(BASEURL, data);
  }

  delete(reqID: any) {
    return this.http.delete(BASEURL+reqID);
  }
}

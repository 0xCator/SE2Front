import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RequestModel } from '../Models/request.model';

const BASEURL = 'http://localhost:3000/api/requests/';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private requestsSubject: BehaviorSubject<RequestModel[]> = new BehaviorSubject<RequestModel[]>([]);
  public requests$: Observable<RequestModel[]> = this.requestsSubject.asObservable();

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

  fetchRequestData() {
    this.http.get<RequestModel[]>(BASEURL).subscribe((data) => {
      if (this.requestsSubject.value.length !== data.length){
        this.requestsSubject.next(data);
      }
    });
  }
}

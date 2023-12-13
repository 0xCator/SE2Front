import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Car } from '../Models/car.model';

const BASEURL = 'http://localhost:3000/api/cars';
@Injectable({
  providedIn: 'root'
})
export class CarService {
  
  constructor(private http: HttpClient) { }

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(BASEURL);
  }

  getCar(carID: any): Observable<Car> {
    return this.http.get<Car>(BASEURL+"/"+carID);
  }

  createCar(data: any): Observable<Car> {
    return this.http.post<Car>(BASEURL, data);
  }

  updateCar(carID: any, data: any): Observable<Car> {
    return this.http.patch<Car>(BASEURL+"/"+carID, data);
  }

  deleteCar(carID: any) {
    return this.http.delete<Car>(BASEURL+"/"+carID);
  }
  
}

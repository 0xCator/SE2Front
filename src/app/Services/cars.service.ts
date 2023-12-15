import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CarModel } from '../Models/car.model';

const BASEURL = 'http://localhost:3000/api/cars';
@Injectable({
  providedIn: 'root'
})
export class CarService {
  private carsSubject: BehaviorSubject<CarModel[]> = new BehaviorSubject<CarModel[]>([]);
  public cars$: Observable<CarModel[]> = this.carsSubject.asObservable();
  
  constructor(private http: HttpClient) { }

  getAllCars(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>(BASEURL);
  }

  getCar(carID: any): Observable<CarModel> {
    return this.http.get<CarModel>(BASEURL+"/"+carID);
  }

  createCar(data: any): Observable<CarModel> {
    return this.http.post<CarModel>(BASEURL, data);
  }

  updateCar(carID: any, data: any): Observable<CarModel> {
    return this.http.patch<CarModel>(BASEURL+"/"+carID, data);
  }

  deleteCar(carID: any) {
    return this.http.delete<CarModel>(BASEURL+"/"+carID);
  }
  
  fetchCarsData() {
    this.http.get<CarModel[]>(BASEURL).subscribe((data) => {
      if (this.carsSubject.value.length !== data.length){
        this.carsSubject.next(data);
      }
    });
  }
}

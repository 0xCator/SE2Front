import { timer } from 'rxjs';
import { CarService } from 'src/app/Services/cars.service';
export interface CarModel {
    _id: any;
    driverName: string;
    licensePlate: string;
    carStatus: number;
    currentLocation: {
        longitude: number;
        latitude: number;
    };
    destination: {
        longitude: number;
        latitude: number;
    }
}

export class Car {
    carID: string;

    driverName: string = '';
    licensePlate: string = '';
    location?: {
        longitude: number
        latitude: number
    }
    state: number = 0;
    carIcon: string = '../../../../assets/Icons/ambcarIdle.png';
    constructor(ID: any, private carService: CarService) {
        this.carID = ID;
        timer(0, 500).subscribe((val)=>{
            this.carService.getCar(this.carID).subscribe((val)=>{
                this.driverName = val.driverName;
                this.licensePlate = val.licensePlate;
                this.location = val.currentLocation;
                this.state = val.carStatus;
                this.carIcon = (this.state == 0) ? '../../../../assets/Icons/ambcarIdle.png' : '../../../../assets/Icons/ambcarMoving.png';
            })
        })
    }
}
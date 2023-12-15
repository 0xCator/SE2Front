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

export interface RequestModel {
    _id: any;
    userID: string;
    carID: string;
    requestType: number;
    location?: {
        longitude: number;
        latitude: number;
    };
    hospital?: {
        name: string;
        location: {
            longitude: number;
            latitude: number;
        }
    }
    createdAt: string;
    carLocation?: {
        longitude: number;
        latitude: number;
    }
}
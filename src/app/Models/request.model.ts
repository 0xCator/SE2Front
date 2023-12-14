export interface RequestModel {
    _id: any;
    userID: string;
    carID: string;
    requestType: number;
    location?: {
        longitude: number;
        latitude: number;
    };
    createdAt: string;
}

import { UserService } from 'src/app/Services/user.service';

export interface userModel {
    id: string;
    username: string;
    password: string;
    userType: number;
    userInfo: {
        fullName: string;
        age: number;
        gender: string;
        email: string;
    };
    patientData: {
        state: number;
        token: string;
        pairedBracelet: string;
        medicalHistory: string;
        relatives: [];
        patientReadings: {
            heartRate: number;
            bloodPressure: {
                systolic: number;
                diastolic: number;
            };
            location: {
                longitude: number;
                latitude: number;
            }
        }
    };
    relativeData: {
        assignedPatients: [];
    }
}

export class User {
    userID: any;
    constructor(userID: any, private userService: UserService) {
        this.userID = userID;
    }
    
    getData() {
        return this.userService.getUserData(this.userID);
    }

    updateMedicalHistory(message: string) {
        return this.userService.updateMedicalHistory(this.userID, message);
    }

}

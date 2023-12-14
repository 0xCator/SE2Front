import { UserService } from 'src/app/Services/user.service';

export interface userModel {
    _id: string;
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

export interface readingModel {
    createdAt: string;
    heartRate: number;
    bloodPressure: {
        systolic: number;
        diastolic: number;
    };
}

import { jsPDF } from "jspdf";
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

    generateReport() {
        let doc = new jsPDF();
        this.userService.getUserData(this.userID).subscribe({
            next: (val) => {
                let fullName = val.userInfo.fullName;
                let age = val.userInfo.age;
                let gender = val.userInfo.gender;
                this.userService.getReadings(this.userID).subscribe({
                    next: (val) => {
                        //Info card
                        doc.rect(20, 20, 170, 20);
                        doc.text("Name: "+fullName+", Age: "+age+", Gender: "+gender, 25, 30);
                        let readingString = '';
                        let index = 0;
                        let page = 1;
                        val.forEach((val)=>{
                            index++;
                            if (index > 37) {
                                doc.text(readingString, 20, (page==1) ? 50 : 20);

                            }
                            readingString += val.createdAt.slice(0, 10) + " - HeartRate: " + val.heartRate + 
                            " - Blood Pressure: " + val.bloodPressure.systolic + "/" + val.bloodPressure.diastolic + "\n";
                        });
                        
                        doc.save("report.pdf");
                    }
                })
            }
        })
    }
}

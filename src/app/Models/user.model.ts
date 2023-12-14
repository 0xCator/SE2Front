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
import autoTable from 'jspdf-autotable';
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
        let doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
        this.userService.getUserData(this.userID).subscribe({
            next: (val) => {
                let fullName = val.userInfo.fullName;
                let age = val.userInfo.age;
                let gender = val.userInfo.gender;
                this.userService.getReadings(this.userID).subscribe({
                    next: (val) => {
                        //Info card
                        doc.text("Name: "+fullName+"\t\tAge: "+age+"\t\tGender: "+gender, 40, 30);
                        autoTable(doc, {
                            head: [['Day', 'Time', 'Heart rate', 'Blood pressure']],
                            body: this.generateTable(val),
                            startY: 45
                        });
                        doc.save("report.pdf");
                    }
                })
            }
        })
    }

    //Report-related helper functions
      private generateTable(val: readingModel[]) {
        var result: any[] = [];
        val.forEach((i)=>{
            let element = [i.createdAt.slice(0,10),i.createdAt.slice(11, 19),i.heartRate,i.bloodPressure.systolic+"/"+i.bloodPressure.diastolic]
            result.push(element)
        })
        return result;
      }
}

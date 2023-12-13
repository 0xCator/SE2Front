import { UserService } from 'src/app/Services/user.service';
export class User {
    userID: any;
    currentData: any;
    constructor(userID: any, private userService: UserService) {
        this.userID = userID;
    }
    
    getData() {
        this.userService.getUserData(this.userID).subscribe(
            (val)=> {
                this.currentData = val;
            }
        ) 
        return this.currentData;
    }

}

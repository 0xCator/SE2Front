import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-relative-block',
  templateUrl: './relative-block.component.html',
  styleUrls: ['./relative-block.component.css']
})
export class RelativeBlockComponent implements OnInit{
  @Input() relativeObject?: User;
  fullName: string = '';
  isPaired: boolean = false;
  status?: number;
  heartRate: string = '--';
  bloodPressure: string = '--/--';
  colorState: string = "primary";
  stateIcon: string = "check_circle";

  ngOnInit(): void {
      timer(0, 500).subscribe({
        next: (val)=>{
          this.relativeObject?.getData().subscribe({
            next: (val)=> {
              this.fullName = val.userInfo.fullName;
              this.isPaired = (val.patientData.pairedBracelet !== "-1") ? true : false;
              this.status = val.patientData.state;
              let bdPr = val.patientData.patientReadings.bloodPressure;
              this.bloodPressure = bdPr.systolic + "/" + bdPr.diastolic;
              this.heartRate = val.patientData.patientReadings.heartRate+'';

              switch(this.status) {
                case 0:
                  this.colorState = "primary";
                  this.stateIcon = "check_circle";
                break;
                case 1:
                  this.colorState = "accent";
                  this.stateIcon = "warning";
                break;
                case 2:
                  this.colorState = "warn";
                  this.stateIcon = "dangerous";
                break;
              }
            }
          });
        }
      })
  }
}

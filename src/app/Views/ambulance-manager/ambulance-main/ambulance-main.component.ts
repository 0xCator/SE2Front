import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { RequestModel } from 'src/app/Models/request.model';
import { RequestService } from 'src/app/Services/request.service';

export interface AmbulanceRequestTable {
  patientName: string;
  timeOfRequest: string;
  viewCase: any;
}

@Component({
  selector: 'app-ambulance-main',
  templateUrl: './ambulance-main.component.html',
  styleUrls: ['./ambulance-main.component.css']
})
export class AmbulanceMainComponent implements OnInit{
  displayedColumns: string[] = ['patientName', 'timeOfRequest', 'viewCase'];
  dataSource?: any;
  showCase=false;
  currentCase?: string;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
      this.fillGroup();
  }

  viewCase(caseID:any){
    this.showCase=true;
    this.currentCase = caseID;
    this.requestService.getOne(caseID).subscribe(
      (val)=>{
        
      }
    )
  }

  fillGroup() {
    timer(0, 500).subscribe(
      (val)=>{
        this.requestService.getAll().subscribe(
          (val)=>{
            if (this.dataSource == null || val.length !== this.dataSource.length) {
              let valueTable: AmbulanceRequestTable[] = [];
              val.forEach((value)=> {
                valueTable.push({
                  patientName: value.userID,
                  timeOfRequest: value.createdAt.slice(0, 10) + " - " + value.createdAt.slice(11, 19),
                  viewCase: value._id
                });
              });
              this.dataSource = valueTable;
            }
          }
        )
      }
    )
  }
}

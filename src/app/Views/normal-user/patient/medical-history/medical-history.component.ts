import { Component } from '@angular/core';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent {
  message: string = '';
  isSubmitted: boolean = false;

  onSubmit() {
    this.isSubmitted = true;
}
  onInput() {
    this.isSubmitted = false;
  }
}

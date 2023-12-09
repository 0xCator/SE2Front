import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHospitalsComponent } from './manage-hospitals.component';

describe('ManageHospitalsComponent', () => {
  let component: ManageHospitalsComponent;
  let fixture: ComponentFixture<ManageHospitalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageHospitalsComponent]
    });
    fixture = TestBed.createComponent(ManageHospitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

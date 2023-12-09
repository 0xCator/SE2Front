import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHospitalsComponent } from './view-hospitals.component';

describe('ViewHospitalsComponent', () => {
  let component: ViewHospitalsComponent;
  let fixture: ComponentFixture<ViewHospitalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewHospitalsComponent]
    });
    fixture = TestBed.createComponent(ViewHospitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

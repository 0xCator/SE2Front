import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceMainComponent } from './ambulance-main.component';

describe('AmbulanceMainComponent', () => {
  let component: AmbulanceMainComponent;
  let fixture: ComponentFixture<AmbulanceMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmbulanceMainComponent]
    });
    fixture = TestBed.createComponent(AmbulanceMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

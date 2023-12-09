import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceManagerComponent } from './ambulance-manager.component';

describe('AmbulanceManagerComponent', () => {
  let component: AmbulanceManagerComponent;
  let fixture: ComponentFixture<AmbulanceManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmbulanceManagerComponent]
    });
    fixture = TestBed.createComponent(AmbulanceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

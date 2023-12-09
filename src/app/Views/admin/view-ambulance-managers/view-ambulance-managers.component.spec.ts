import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAmbulanceManagersComponent } from './view-ambulance-managers.component';

describe('ViewAmbulanceManagersComponent', () => {
  let component: ViewAmbulanceManagersComponent;
  let fixture: ComponentFixture<ViewAmbulanceManagersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAmbulanceManagersComponent]
    });
    fixture = TestBed.createComponent(ViewAmbulanceManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

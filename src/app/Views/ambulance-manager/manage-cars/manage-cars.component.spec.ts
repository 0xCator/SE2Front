import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCarsComponent } from './manage-cars.component';

describe('ManageCarsComponent', () => {
  let component: ManageCarsComponent;
  let fixture: ComponentFixture<ManageCarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCarsComponent]
    });
    fixture = TestBed.createComponent(ManageCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

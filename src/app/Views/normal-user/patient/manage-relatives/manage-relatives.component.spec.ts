import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRelativesComponent } from './manage-relatives.component';

describe('ManageRelativesComponent', () => {
  let component: ManageRelativesComponent;
  let fixture: ComponentFixture<ManageRelativesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageRelativesComponent]
    });
    fixture = TestBed.createComponent(ManageRelativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

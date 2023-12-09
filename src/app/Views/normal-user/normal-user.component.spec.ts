import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalUserComponent } from './normal-user.component';

describe('NormalUserComponent', () => {
  let component: NormalUserComponent;
  let fixture: ComponentFixture<NormalUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NormalUserComponent]
    });
    fixture = TestBed.createComponent(NormalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

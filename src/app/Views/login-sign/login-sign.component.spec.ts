import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignComponent } from './login-sign.component';

describe('LoginSignComponent', () => {
  let component: LoginSignComponent;
  let fixture: ComponentFixture<LoginSignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginSignComponent]
    });
    fixture = TestBed.createComponent(LoginSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelativeBlockComponent } from './relative-block.component';

describe('RelativeBlockComponent', () => {
  let component: RelativeBlockComponent;
  let fixture: ComponentFixture<RelativeBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelativeBlockComponent]
    });
    fixture = TestBed.createComponent(RelativeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

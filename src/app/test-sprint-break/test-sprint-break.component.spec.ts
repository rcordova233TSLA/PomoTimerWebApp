import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSprintBreakComponent } from './test-sprint-break.component';

describe('TestSprintBreakComponent', () => {
  let component: TestSprintBreakComponent;
  let fixture: ComponentFixture<TestSprintBreakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSprintBreakComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSprintBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

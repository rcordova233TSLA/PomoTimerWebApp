import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintBreakViewComponent } from './sprint-break-view.component';

describe('SprintBreakViewComponent', () => {
  let component: SprintBreakViewComponent;
  let fixture: ComponentFixture<SprintBreakViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintBreakViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintBreakViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

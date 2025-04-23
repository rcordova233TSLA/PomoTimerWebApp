import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWordViewComponent } from './test-word-view.component';

describe('TestWordViewComponent', () => {
  let component: TestWordViewComponent;
  let fixture: ComponentFixture<TestWordViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestWordViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWordViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

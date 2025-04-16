import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCardGenComponent } from './test-card-gen.component';

describe('TestCardGenComponent', () => {
  let component: TestCardGenComponent;
  let fixture: ComponentFixture<TestCardGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCardGenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCardGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

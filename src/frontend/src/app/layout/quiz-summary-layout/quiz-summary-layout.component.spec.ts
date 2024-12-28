import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSummaryLayoutComponent } from './quiz-summary-layout.component';

describe('QuizSummaryLayoutComponent', () => {
  let component: QuizSummaryLayoutComponent;
  let fixture: ComponentFixture<QuizSummaryLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizSummaryLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizSummaryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

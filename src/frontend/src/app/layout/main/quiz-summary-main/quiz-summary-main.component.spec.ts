import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSummaryMainComponent } from './quiz-summary-main.component';

describe('QuizSummaryMainComponent', () => {
  let component: QuizSummaryMainComponent;
  let fixture: ComponentFixture<QuizSummaryMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizSummaryMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizSummaryMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

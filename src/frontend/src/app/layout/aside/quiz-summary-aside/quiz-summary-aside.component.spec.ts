import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSummaryAsideComponent } from './quiz-summary-aside.component';

describe('QuizSummaryAsideComponent', () => {
  let component: QuizSummaryAsideComponent;
  let fixture: ComponentFixture<QuizSummaryAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizSummaryAsideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizSummaryAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

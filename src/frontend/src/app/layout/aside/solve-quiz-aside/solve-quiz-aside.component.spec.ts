import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveQuizAsideComponent } from './solve-quiz-aside.component';

describe('SolveQuizAsideComponent', () => {
  let component: SolveQuizAsideComponent;
  let fixture: ComponentFixture<SolveQuizAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolveQuizAsideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolveQuizAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

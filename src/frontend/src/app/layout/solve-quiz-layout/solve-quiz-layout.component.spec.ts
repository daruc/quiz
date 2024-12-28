import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveQuizLayoutComponent } from './solve-quiz-layout.component';

describe('SolveQuizLayoutComponent', () => {
  let component: SolveQuizLayoutComponent;
  let fixture: ComponentFixture<SolveQuizLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolveQuizLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolveQuizLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

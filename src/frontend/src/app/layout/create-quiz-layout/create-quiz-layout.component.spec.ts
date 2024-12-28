import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuizLayoutComponent } from './create-quiz-layout.component';

describe('CreateQuizLayoutComponent', () => {
  let component: CreateQuizLayoutComponent;
  let fixture: ComponentFixture<CreateQuizLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateQuizLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateQuizLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuizAsideComponent } from './create-quiz-aside.component';

describe('CreateQuizAsideComponent', () => {
  let component: CreateQuizAsideComponent;
  let fixture: ComponentFixture<CreateQuizAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateQuizAsideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateQuizAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

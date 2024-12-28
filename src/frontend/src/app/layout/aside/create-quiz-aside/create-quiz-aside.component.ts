import { Component } from '@angular/core';
import { AsideComponent } from "../aside.component";
import { CreateQuizService } from '../../../create-quiz.service';

@Component({
  selector: 'app-create-quiz-aside',
  standalone: true,
  imports: [AsideComponent],
  templateUrl: './create-quiz-aside.component.html',
  styleUrl: './create-quiz-aside.component.css'
})
export class CreateQuizAsideComponent {
  constructor(private createQuizService: CreateQuizService) {
    
  }

  public saveNewQuiz() {
    this.createQuizService.saveQuiz();
  }
}

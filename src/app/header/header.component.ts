import { Component, inject } from '@angular/core';
import { QuestionsService, Quiz } from '../questions.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private questionsService: QuestionsService;

  constructor() {
    this.questionsService = inject(QuestionsService);
  }

  public getCurrentQuizTitle(): string {
    const currentQuiz: Quiz | undefined = this.questionsService.getCurrentQuiz();
    if (currentQuiz) {
      return currentQuiz.title;
    }
    return 'Select quiz';
  }
}

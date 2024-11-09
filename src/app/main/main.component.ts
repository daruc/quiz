import { Component, inject } from '@angular/core';
import { QuestionComponent } from './question/question.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [QuestionComponent, QuizComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  private questionsService: QuestionsService;

  constructor() {
    this.questionsService = inject(QuestionsService);
  }

  public isShowQuizSelection(): boolean {
    return this.questionsService.getCurrentQuiz() === undefined;
  }

  public isShowQuestion(): boolean {
    return !this.isShowQuizSelection();
  }
}

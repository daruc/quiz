import { Component, inject } from '@angular/core';
import { QuestionsService } from '../../questions.service';

interface QuizToShow {
  quizId: number;
  text: string;
}

@Component({
  selector: 'quiz-selection',
  standalone: true,
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  quizes: QuizToShow[];
  questionsService: QuestionsService;

  constructor() {
    this.quizes = [];
    this.questionsService = inject(QuestionsService);
    this.showQuizes();
  }

  private showQuizes(): void {
    this.quizes = this.questionsService.getQuizes()
      .map((q, i) => {
        return {
          quizId: i,
          text: q.title
        };
      });
  }

  public setQuiz(quizId: number): void {
    console.log('set quiz', quizId);
    this.questionsService.setCurrentQuiz(quizId);
  }
}

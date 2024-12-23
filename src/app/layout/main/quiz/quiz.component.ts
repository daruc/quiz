import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizListService } from '../../../quiz-list.service';


@Component({
  selector: 'quiz-selection',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  @Input() quizList: string[] = [];

  constructor(private quizListService: QuizListService) {

  }

  public removeQuiz(quizId: number): void {
    this.quizListService.removeQuiz(quizId);
  }
}

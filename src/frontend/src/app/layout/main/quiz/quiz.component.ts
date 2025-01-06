import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizListService } from '../../../quiz-list.service';
import { MainComponent } from "../main.component";


@Component({
  selector: 'quiz-selection',
  standalone: true,
  imports: [RouterLink, MainComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  @Input() quizList: {id: number, title: string}[] = [];

  constructor(private quizListService: QuizListService) {

  }

  public removeQuiz(quizId: number): void {
    this.quizListService.removeQuiz(quizId);
  }
}

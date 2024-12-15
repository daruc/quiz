import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'quiz-selection',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  @Input() quizList: string[] = [];
}

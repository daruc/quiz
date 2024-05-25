import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  question: string = "Question?";
  answers: string[] = [
    "Answer 1",
    "Answer 2",
    "Answer 3"
  ];
  answerType: "radio" | "checkbox" = "checkbox";
}

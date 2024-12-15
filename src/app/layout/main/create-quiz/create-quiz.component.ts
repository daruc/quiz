import { Component } from '@angular/core';
import { Question, Quiz } from '../../../quiz-list.service';

@Component({
  selector: 'create-quiz',
  standalone: true,
  imports: [],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css'
})
export class CreateQuizComponent {
  newQuiz: Quiz = {
    title: '',
    questions: [],
    randomOrder: false
  }

  public addQuestion(): void {
    const questionList = this.newQuiz.questions;
    const newQuestion: Question = {
      questionId: questionList.length,
      question: '',
      answers: [],
      correctIndex: [],
      multipleChoose: false,
      randomOrder: false
    };
    this.newQuiz.questions.push(newQuestion);
  }

  public addAnswer(questionId: number): void {
    this.newQuiz.questions[questionId].answers.push('');
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Answer, Question, Quiz } from '../../../quiz-list.service';
import { CreateQuizService } from '../../../create-quiz.service';

@Component({
  selector: 'create-quiz',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css'
})
export class CreateQuizComponent {
  newQuiz: Quiz;
  
  constructor(private createQuizService: CreateQuizService) {
    this.newQuiz = createQuizService.getQuiz();
  }

  public addQuestion(): void {
    const questionList = this.newQuiz.questions;
    const newQuestion: Question = {
      id: questionList.length,
      description: '',
      answers: [],
      multipleChoice: false,
      randomOrder: false
    };
    this.newQuiz.questions.push(newQuestion);
  }

  public removeQuestion(questionId: number) {
    const questions: Question[] = this.newQuiz.questions;
    questions.splice(questionId, 1);
  }

  public addAnswer(questionId: number): void {
    const emptyAnswer: Answer = {
      id: this.newQuiz.questions[questionId].answers.length,
      description: '',
      correct: false
    }
    this.newQuiz.questions[questionId].answers.push(emptyAnswer);
  }

  public removeAnswer(questionId: number, answerId: number): void {
    const answers: Answer[] = this.newQuiz.questions[questionId].answers;
    answers.splice(answerId, 1);
  }
}

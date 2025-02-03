import { Component, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Answer, Question, Quiz } from '../../../quiz-list.service';
import { CreateQuizService } from '../../../create-quiz.service';
import { MainComponent } from "../main.component";

@Component({
  selector: 'create-quiz',
  standalone: true,
  imports: [FormsModule, MainComponent],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css'
})
export class CreateQuizComponent {
  newQuiz: Quiz;
  timeLimitEnabled = signal<boolean>(false);
  timeLimitH = signal<number>(0);
  timeLimitMin = signal<number>(0);
  timeLimitSec = signal<number>(0);
  
  constructor(private createQuizService: CreateQuizService) {
    this.newQuiz = createQuizService.getQuiz();
      effect(() => {
        if (this.timeLimitEnabled()) {
          this.newQuiz.timeLimitSec = this.timeLimitH() * 60 * 60 + this.timeLimitMin() * 60 + +this.timeLimitSec();
        } else {
          this.newQuiz.timeLimitSec = 0;
        }
        console.log(this.newQuiz.timeLimitSec);
      });
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
    this.addAnswer(newQuestion.id);
    this.addAnswer(newQuestion.id);
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


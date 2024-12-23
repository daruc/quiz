import { Injectable } from '@angular/core';
import { Quiz, QuizListService } from './quiz-list.service';

@Injectable({
  providedIn: 'root'
})
export class CreateQuizService {
  private newQuiz?: Quiz = undefined;

  constructor(private quizListService: QuizListService) {
  }
  
  public startEditing(): void {
    this.newQuiz = {
      id: this.quizListService.getQuizes().length,
      title: '',
      questions: [],
      randomOrder: false,
    }
  }

  public getQuiz(): Quiz {
    return this.newQuiz!;
  }

  public saveQuiz(): void {
    this.quizListService.saveQuiz(this.newQuiz!);
  }

  public stopEditing(): void {
    this.newQuiz = undefined;
  }
}

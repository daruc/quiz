import { Injectable } from '@angular/core';
import { Quiz, QuizListService } from './quiz-list.service';

@Injectable({
  providedIn: 'root'
})
export class CreateQuizService {
  private newQuiz?: Quiz = undefined;

  constructor(private quizListService: QuizListService) {
    console.log('createQuizService constructor');
  }
  
  public startEditing(quizId?: number): void {
    if (quizId === undefined) {
      this.startEditingNew();
    } else {
      this.startEditingExisting(quizId);
    }
  }

  private startEditingNew(): void {
    console.log('start editing new');
    if (this.newQuiz === undefined) {
      this.newQuiz = {
        id: this.quizListService.getQuizes().length,
        title: '',
        randomOrder: false,
        questions: [
          {
            id: 0,
            description: '',
            randomOrder: false,
            multipleChoice: false,
            answers: [
              {
                id: 0,
                description: '',
                correct: false
              },
              {
                id: 1,
                description: '',
                correct: false
              }
            ]
          }
        ],
      }
    }
  }

  private startEditingExisting(quizId: number): void {
    this.newQuiz = this.quizListService.getQuiz(quizId);
  }

  public getQuiz(): Quiz {
    return this.newQuiz!;
  }

  public saveQuiz(): void {
    this.quizListService.saveQuiz(this.newQuiz!);
  }

  public stopEditing(): void {
    console.log('stop editing new');
    this.newQuiz = undefined;
  }
}

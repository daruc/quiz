import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Answer {
  id: number,
  description: string,
  correct: boolean
}

export interface Question {
  id: number;
  description: string;
  multipleChoice: boolean;
  randomOrder: boolean;
  answers: Answer[];
}

export interface Quiz {
  id: number;
  title: string;
  randomOrder: boolean;
  questions: Question[];
}

@Injectable({
  providedIn: 'root'
})
export class QuizListService {

  private quizes: Quiz[] = [];

  constructor(private httpClient: HttpClient) { 
    httpClient.get<Quiz[]>('/api/quiz').subscribe(response => {
      console.log('http client response:', response);
      this.quizes = response;
    });
  
  }

  public getQuizes(): Quiz[] {
    return this.quizes;
  }

  public getQuiz(quizId: number): Quiz {
    return this.quizes[quizId];
  }

  public saveQuiz(newQuiz: Quiz): void {
    if (newQuiz.id >= this.quizes.length) {
      this.quizes.push(newQuiz);
      this.httpClient.post('/api/quiz', newQuiz).subscribe(response => {
        console.log('http client saveQuiz() new response:', response);
      });
    }
    const indexToReplace: number = this.quizes.findIndex(quiz => quiz.id === newQuiz.id);
    this.quizes.splice(indexToReplace, 1, newQuiz);
    this.httpClient.put('/api/quiz', newQuiz).subscribe(response => {
      console.log('http client saveQuiz() edit response:', response);
    });
  }

  public removeQuiz(quizId: number): void {
    const indexToRemove: number = this.quizes.findIndex(quiz => quiz.id === quizId);
    this.quizes.splice(indexToRemove, 1);
    this.httpClient.delete('/api/quiz/' + (quizId + 1)).subscribe(response => {
      console.log('http client removeQuiz() response:', response);
    });
  }
}

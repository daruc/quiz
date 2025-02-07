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
  timeLimitSec: number;
  questions: Question[];
}

@Injectable({
  providedIn: 'root'
})
export class QuizListService {

  private quizes: Quiz[] = [];

  constructor(private httpClient: HttpClient) { 
    this.loadQuizesFromServer();
  }

  private loadQuizesFromServer(): void {
    /*this.httpClient.get<Quiz[]>('/api/quiz').subscribe(response => {
      console.log('http client response:', response);
      this.quizes = response;
    });*/
    
    const testAnswer: Answer = {
      id: 555,
      description: 'ans',
      correct: true
    }

    const testQuestion: Question = {
      id: 55,
      description: 'desc',
      randomOrder: true,
      multipleChoice: true,
      answers: [testAnswer]
    }

    const testQuiz: Quiz = {
      id: 5,
      title: 'test_quiz',
      randomOrder: true,
      timeLimitSec: 15,
      questions: [testQuestion]
    }
    this.quizes = [testQuiz]
  }

  public getQuizes(): Quiz[] {
    return this.quizes;
  }

  public getQuiz(quizId: number): Quiz {
    return this.quizes.find(quiz => quiz.id === quizId)!;
  }

  public saveQuiz(newQuiz: Quiz): void {
    this.fixBooleanStrings(newQuiz);
    if (newQuiz.id >= this.quizes.length) {
      this.quizes.push(newQuiz);
      this.httpClient.post('/api/quiz', newQuiz).subscribe(response => {
        console.log('http client saveQuiz() new response:', response);
        this.loadQuizesFromServer();
      });
    }
    this.httpClient.put('/api/quiz', newQuiz).subscribe(response => {
      console.log('http client saveQuiz() edit response:', response);
      this.loadQuizesFromServer();
    });
  }

  private fixBooleanStrings(newQuiz: Quiz): void {
    for (const question of newQuiz.questions) {
      for (const answer of question.answers) {
        if (typeof answer.correct === 'string') {
          console.log('fixBooleanStrings', answer.correct);
          answer.correct = (answer.correct as unknown as string).toLowerCase() === 'true';
        }
      }
    }
  }

  public removeQuiz(quizId: number): void {
    this.httpClient.delete('/api/quiz/' + quizId).subscribe(response => {
      console.log('http client removeQuiz() response:', response);
      this.loadQuizesFromServer();
    });
  }
}

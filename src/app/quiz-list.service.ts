import { Injectable } from '@angular/core';

export interface Answer {
  id: number,
  description: string,
  correct: boolean
}

export interface Question {
  id: number;
  description: string;
  answers: Answer[];
  multipleChoice: boolean;
  randomOrder: boolean;
}

export interface Quiz {
  id: number;
  title: string;
  questions: Question[];
  randomOrder: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class QuizListService {

  private quizes: Quiz[];

  constructor() { 
    let q1: Question = {
        description: 'Question 1?',
        id: 0,
        answers: [
          {
            id: 0,
            description: 'Answer 1 (correct)',
            correct: true
          },
          {
            id: 1,
            description: 'Answer 2',
            correct: false
          },
          {
            id: 2,
            description: 'Answer 3 (correct)',
            correct: true
          }
        ],
        multipleChoice: true,
        randomOrder: true
    }
    let q2: Question = {
      description: 'Question 2?',
      id: 1,
      answers: [
        {
          id: 0,
          description: 'Answer 2.1 (correct)',
          correct: true
        },
        {
          id: 1,
          description: 'Answer 2.2',
          correct: false
        },
        {
          id: 2,
          description: 'Answer 2.3',
          correct: false
        }
      ],
      multipleChoice: false,
      randomOrder: false
    }
    let quiz1: Quiz = {
      id: 0,
      title: 'Quiz 1?',
      questions: [
        q1,
        q2
      ],
      randomOrder: false
    }
    let q3: Question = {
      description: 'Question 2.1?',
      id: 0,
      answers: [
        {
          id: 0,
          description: 'Answer 1',
          correct: false
        },
        {
          id: 1,
          description: 'Answer 2 (correct)',
          correct: true
        }
      ],
      multipleChoice: false,
      randomOrder: false
    }
    let quiz2: Quiz = {
      id: 1,
      title: 'Quiz 2?',
      questions: [
        q3
      ],
      randomOrder: false
    }

    this.quizes = [
      quiz1, quiz2
    ]

  }

  public getQuizes(): Quiz[] {
    return this.quizes;
  }

  public getQuiz(quizId: number): Quiz {
    return this.quizes[quizId];
  }

  public saveQuiz(quiz: Quiz): void {
    this.quizes.push(quiz);
  }

}

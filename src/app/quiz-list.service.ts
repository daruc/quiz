import { Injectable } from '@angular/core';

export interface Question {
  questionId: number;
  question: string;
  answers: string[];
  correctIndex: number[];
  multipleChoose: boolean;
  randomOrder: boolean;
}

export interface Quiz {
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
      question: 'Question 1?',
        questionId: 0,
        answers: [
          'Answer 1 (correct)',
          'Answer 2',
          'Answer 3 (correct)'
        ],
        correctIndex: [
          0,
          2
        ],
        multipleChoose: true,
        randomOrder: true
    }
    let q2: Question = {
      question: 'Question 2?',
      questionId: 1,
      answers: [
        'Answer 2.1 (correct)',
        'Answer 2.2',
        'Answer 2.3'
      ],
      correctIndex: [
        0
      ],
      multipleChoose: false,
      randomOrder: false
    }
    let quiz1: Quiz = {
      title: 'Quiz 1?',
      questions: [
        q1,
        q2
      ],
      randomOrder: false
    }
    let q3: Question = {
      question: 'Question 2.1?',
      questionId: 0,
      answers: [
        'Answer 1',
        'Answer 2 (correct)'
      ],
      correctIndex: [
        1
      ],
      multipleChoose: false,
      randomOrder: false
    }
    let quiz2: Quiz = {
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

}

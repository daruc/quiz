import { Injectable } from '@angular/core';

export interface Answers {
  quizId: number;
  answers: Answer[];
}

export interface Answer {
  questionId: number;
  answerIds: number[];
}

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  private currentAnswers: Answers;

  constructor() { 
    this.currentAnswers = {
      quizId: 0,
      answers: []
    }
  }

  public setCurrentQuiz(quizId: number): void {
    this.currentAnswers = {
      quizId: quizId,
      answers: []
    }
  }

  public setAnswer(answer: Answer): void {
    console.log('questionId', answer.questionId);

    let existingAnswer : Answer | undefined =
       this.currentAnswers.answers.find(a => a.questionId === answer.questionId);
    console.log('existingAnswer=', existingAnswer);
    if (existingAnswer) {
      console.log('exists');
      existingAnswer.answerIds = answer.answerIds;
    } else {
      console.log('does not exists');
      this.currentAnswers.answers.push(answer);
    }

    console.log('setAnswer, answer=' + answer.answerIds);
    console.log('setAnswer, currentAnswers=' + JSON.stringify(this.currentAnswers));
  }

  public getAnswers(): Answers {
    return this.currentAnswers;
  }
}
